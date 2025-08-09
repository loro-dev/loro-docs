import { walk } from "jsr:@std/fs";
import { CodeBlock, extractCodeBlocks } from "./extract_code_blocks.ts";
import { resolve } from "https://deno.land/std@0.139.0/path/mod.ts";

const LORO_VERSION = "1.5.10";

async function scanMarkdownFiles(
  dir: string,
  callback: (blocks: CodeBlock) => void
): Promise<void> {
  // Walking through the directory to find markdown files
  const entries: { path: string; name: string }[] = [];
  for await (const entry of walk(dir, {
    exts: ["md", "mdx"],
    includeDirs: false,
    skip: [/node_modules/],
  })) {
    entries.push(entry);
  }

  // Process files in parallel
  await Promise.all(
    entries.map(async (entry) => {
      const { path, name } = entry;
      const absPath = resolve(Deno.cwd(), path);
      const fileContent = await Deno.readTextFile(absPath);
      const codeBlocks: CodeBlock[] = [];
      extractCodeBlocks(fileContent, codeBlocks, name, absPath);
      for (const block of codeBlocks) {
        callback(block);
      }
    })
  );
}

function replaceImportVersion(input: string, targetVersion: string): string {
  const regex = /from "loro-crdt"/g;
  const replacement = `from "npm:loro-crdt@${targetVersion}"`;
  return input.replace(regex, replacement);
}

// Parsing command-line arguments
const targetDir = Deno.args[0] || "."; // Use the first argument as the directory path or default to the current directory

const IMPORTS = `import { Loro, LoroDoc, LoroMap, LoroText, LoroList, Delta, UndoManager, EphemeralStore } from "npm:loro-crdt@${LORO_VERSION}";
import { expect } from "npm:expect@29.7.0";
`;

let testCases = 0;
let passed = 0;
let failed = 0;
// Create a log queue to store messages
const logQueue: string[] = [];
let isLogging = false;

// Function to process the log queue
async function processLogQueue() {
  if (isLogging) return;
  isLogging = true;

  while (logQueue.length > 0) {
    const message = logQueue.shift();
    if (message) {
      await globalThis.Deno.stdout.write(new TextEncoder().encode(message));
    }
  }

  isLogging = false;
}

// Function to add a message to the log queue
function queueLog(message: string) {
  logQueue.push(message);
  setTimeout(processLogQueue, 0);
}

scanMarkdownFiles(targetDir, async (block) => {
  let codeBlock = block.content;
  codeBlock = replaceImportVersion(codeBlock, LORO_VERSION);
  if (codeBlock.includes("Loro") && !codeBlock.includes("import {")) {
    codeBlock = IMPORTS + codeBlock;
  }

  try {
    const command = new globalThis.Deno.Command("deno", {
      args: ["eval", "--ext=ts", codeBlock],
      stdout: "null",
      stderr: "piped", // Capture stderr instead of inheriting
    });
    const process = command.spawn();

    // Handle stderr output
    const stderrReader = process.stderr.getReader();
    const decoder = new TextDecoder();

    // Read stderr in a separate task
    (async () => {
      try {
        while (true) {
          const { done, value } = await stderrReader.read();
          if (done) break;
          if (value) {
            queueLog(decoder.decode(value));
          }
        }
      } catch (error) {
        queueLog(`Error reading stderr: ${error}\n`);
      }
    })();

    const status = await process.status;
    testCases += 1;
    if (status.success) {
      passed += 1;
    } else {
      queueLog(
        `\x1b[31;1mError in \x1b[4m${block.filePath}:${block.lineNumber}\x1b[0m\n\n`
      );
      failed += 1;
    }
  } catch (error) {
    queueLog(`Error: ${error}\n`);
  }

  queueLog(`\r🧪 ${testCases} tests, ✅ ${passed} passed, ❌ ${failed} failed`);
});
