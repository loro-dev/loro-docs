// Importing necessary modules from Deno standard library

export interface CodeBlock {
  filename: string;
  filePath: string;
  lineNumber: number;
  lang: string;
  content: string;
}


export function extractCodeBlocks(fileContent: string, codeBlocks: CodeBlock[], name: string, path: string) {
  // Regular expression to detect TypeScript code blocks
  const codeBlockRegex = /```(typescript|ts twoslash|typescript twoslash|ts|js|javascript)\n([\s\S]*?)\n```/g;
  let match;
  while ((match = codeBlockRegex.exec(fileContent)) !== null) {
    const startLine = fileContent.substring(0, match.index).split("\n").length;
    codeBlocks.push({
      filename: name,
      filePath: path,
      lineNumber: startLine,
      content: match[2],
      lang: match[1]
    });
  }
}
