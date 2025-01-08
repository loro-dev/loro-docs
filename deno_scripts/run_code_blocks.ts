import { walk } from "jsr:@std/fs";
import { CodeBlock, extractCodeBlocks } from "./extract_code_blocks.ts";
import { resolve } from "https://deno.land/std@0.139.0/path/mod.ts";

const LORO_VERSION = "1.2.5";

async function* scanMarkdownFiles(dir: string): AsyncGenerator<CodeBlock[]> {
  // Walking through the directory to find markdown files
  for await (
    const entry of walk(dir, {
      exts: ["md", "mdx"],
      includeDirs: false,
      skip: [/node_modules/],
    })
  ) {
    const { path, name } = entry;
    const absPath = resolve(Deno.cwd(), path);
    const fileContent = await Deno.readTextFile(absPath);
    const codeBlocks: CodeBlock[] = [];
    extractCodeBlocks(fileContent, codeBlocks, name, absPath);
    if (codeBlocks.length > 0) {
      yield codeBlocks;
    }
  }
}

function replaceImportVersion(input: string, targetVersion: string): string {
  const regex = /from "loro-crdt"/g;
  const replacement = `from "npm:loro-crdt@${targetVersion}"`;
  return input.replace(regex, replacement);
}

// Parsing command-line arguments
const targetDir = Deno.args[0] || "."; // Use the first argument as the directory path or default to the current directory

const IMPORTS =
  `import { Loro, LoroDoc, LoroMap, LoroText, LoroList, Delta, UndoManager } from "npm:loro-crdt@${LORO_VERSION}";
import { expect } from "npm:expect@29.7.0";
`;

let testCases = 0;
let passed = 0;
let failed = 0;
for await (const blocks of scanMarkdownFiles(targetDir)) {
  await Promise.all(blocks.map(async (block) => {
    let codeBlock = block.content;
    codeBlock = replaceImportVersion(codeBlock, LORO_VERSION);
    if (codeBlock.includes("Loro") && !codeBlock.includes("import {")) {
      codeBlock = IMPORTS + codeBlock;
    }

    try {
      const command = new Deno.Command("deno", {
        args: ["eval", "--ext=ts", codeBlock],
        stdout: "null",
        stderr: "inherit",
      });
      const process = command.spawn();
      const status = await process.status;
      testCases += 1;
      if (status.success) {
        passed += 1;
      } else {
        console.error(
          `\x1b[31;1mError in \x1b[4m${block.filePath}:${block.lineNumber}\x1b[0m\n\n`,
        );
        failed += 1;
      }
    } catch (error) {
      console.error("Error:", error);
    }
    await Deno.stdout.write(
      new TextEncoder().encode(
          `\r🧪 ${testCases} tests, ✅ ${passed} passed, ❌ ${failed} failed`,
      ),
    );
  }));
}
console.log("\n");
