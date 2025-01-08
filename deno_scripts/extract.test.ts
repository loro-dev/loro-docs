import { expect } from "npm:expect";
import { CodeBlock, extractCodeBlocks } from "./extract_code_blocks.ts";

Deno.test("extractCodeBlocks", () => {
  const codeBlocks: CodeBlock[] = [];
  const fileContent = `# Heading

This is a markdown file.

## Subheading

### Sub-subheading

This is a code block:

\`\`\`ts
  console.log("Hello, world!");
  console.log("ABC");
\`\`\`

This is another code block:

\`\`\`javascript
  console.log("Hello, world!");
\`\`\`
`;
  extractCodeBlocks(fileContent, codeBlocks, "test.md", "./test.md");
  console.log(codeBlocks);
  expect(codeBlocks).toEqual([
    {
      filename: "test.md",
      filePath: "./test.md",
      lineNumber: 11,
      content: '  console.log("Hello, world!");\n' +
        '  console.log("ABC");',
      lang: "ts",
    },
    {
      filename: "test.md",
      filePath: "./test.md",
      lineNumber: 18,
      content: '  console.log("Hello, world!");',
      lang: "javascript",
    },
  ]);
});
