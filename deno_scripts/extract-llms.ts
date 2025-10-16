import { walk } from "https://deno.land/std@0.220.1/fs/walk.ts";
import { parse } from "https://deno.land/std@0.220.1/flags/mod.ts";
import { join, relative } from "https://deno.land/std@0.220.1/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.220.1/fs/exists.ts";

// Parse command line arguments
const args = parse(Deno.args);
const workspaceDir = args.dir || Deno.cwd();
const outputFile = join(workspaceDir, "public", "llms-full.txt");
const toIgnore = [
    "/README.md",
    "/AGENTS.md",
    "pages/changelog.mdx",
    "pages/blog.mdx",
    "pages/index.mdx"
]

async function getGitignorePatterns(dir: string): Promise<string[]> {
    const gitignorePath = join(dir, ".gitignore");

    if (existsSync(gitignorePath)) {
        const content = await Deno.readTextFile(gitignorePath);
        const ans = content
            .split("\n")
            .map(line => line.trim())
            .filter(line => line && !line.startsWith("#"));
        ans.push(...toIgnore)
        return ans;
    }

    return [];
}

function shouldIgnore(path: string, ignorePatterns: string[]): boolean {
    const relativePath = relative(workspaceDir, path);

    for (const pattern of ignorePatterns) {
        // Simple pattern matching for common .gitignore patterns
        if (pattern.startsWith("/") && relativePath.startsWith(pattern.slice(1))) {
            return true;
        } else if (pattern.endsWith("/") && relativePath.includes(pattern)) {
            return true;
        } else if (relativePath === pattern || relativePath.includes(`/${pattern}`)) {
            return true;
        } else if (pattern.includes("*")) {
            // Handle glob patterns (simple version)
            const regexPattern = pattern
                .replace(/\./g, "\\.")
                .replace(/\*/g, ".*");
            if (new RegExp(`^${regexPattern}$`).test(relativePath)) {
                return true;
            }
        }
    }

    return false;
}

async function main() {
    console.log(`Scanning workspace: ${workspaceDir}`);
    console.log(`Output will be saved to: ${outputFile}`);

    // Get gitignore patterns
    const ignorePatterns = await getGitignorePatterns(workspaceDir);
    console.log(`Found ${ignorePatterns.length} patterns in .gitignore`);

    // Add default patterns to always ignore
    ignorePatterns.push("node_modules");
    ignorePatterns.push(".git");

    // Create a string to store the concatenated content
    let concatenatedContent = "";
    let fileCount = 0;
    const paths: string[] = []

    // Walk through the directory to find all markdown files
    for await (const entry of walk(workspaceDir, {
        exts: ["md", "mdx"],
        includeDirs: false,
        skip: [
            (path) => shouldIgnore(path, ignorePatterns),
        ],
    })) {
        const { path } = entry;

        // Skip if in ignored directory
        if (shouldIgnore(path, ignorePatterns)) {
            continue;
        }

        paths.push(path)
    }

    paths.push(join(workspaceDir, "/node_modules/loro-crdt/nodejs/loro_wasm.d.ts"));
    for (const path of paths) {
        try {
            const relativePath = relative(workspaceDir, path);
            // Read the file content
            const fileContent = await Deno.readTextFile(path);

            // Add file path as section header followed by the content
            concatenatedContent += `\n\n# FILE: ${relativePath}\n\n`;
            concatenatedContent += fileContent;

            fileCount++;
            if (fileCount % 10 === 0) {
                console.log(`Processed ${fileCount} files...`);
            }
        } catch (error) {
            console.error(`Error reading file ${path}:`, error);
        }
    }

    // Ensure the output directory exists
    const outputDir = join(workspaceDir, "public");
    try {
        await Deno.mkdir(outputDir, { recursive: true });
    } catch (error) {
        if (!(error instanceof Deno.errors.AlreadyExists)) {
            throw error;
        }
    }

    // Write the concatenated content to the output file
    await Deno.writeTextFile(outputFile, concatenatedContent);

    console.log(`\nCompleted: ${fileCount} markdown files have been concatenated into ${outputFile}`);
}

// Run the main function
await main();
