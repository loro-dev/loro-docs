import React from "react";

interface Token {
  type: string;
  content: string;
}

// Simple tokenizer for TypeScript/JavaScript
function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const keywords = [
    "import", "from", "const", "let", "var", "new", "export", "default",
    "function", "return", "if", "else", "for", "while", "async", "await",
    "type", "interface", "class", "extends", "implements", "public", "private",
  ];
  const types = ["Uint8Array", "string", "number", "boolean", "any", "void", "null", "undefined"];

  const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*\b)|([{}()[\];,.])|([=!<>+\-*/%&|^~?:])/gm;

  let match;
  let lastIndex = 0;

  while ((match = regex.exec(code)) !== null) {
    // Add any text before the match
    if (match.index > lastIndex) {
      tokens.push({ type: "text", content: code.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // String
      tokens.push({ type: "string", content: match[1] });
    } else if (match[2]) {
      // Single line comment
      tokens.push({ type: "comment", content: match[2] });
    } else if (match[3]) {
      // Multi line comment
      tokens.push({ type: "comment", content: match[3] });
    } else if (match[4]) {
      // Number
      tokens.push({ type: "number", content: match[4] });
    } else if (match[5]) {
      // Identifier/keyword
      const word = match[5];
      if (keywords.includes(word)) {
        tokens.push({ type: "keyword", content: word });
      } else if (types.includes(word)) {
        tokens.push({ type: "type", content: word });
      } else if (word[0] === word[0].toUpperCase()) {
        tokens.push({ type: "class", content: word });
      } else {
        tokens.push({ type: "identifier", content: word });
      }
    } else if (match[6]) {
      // Punctuation
      tokens.push({ type: "punctuation", content: match[6] });
    } else if (match[7]) {
      // Operator
      tokens.push({ type: "operator", content: match[7] });
    }

    lastIndex = regex.lastIndex;
  }

  // Add any remaining text
  if (lastIndex < code.length) {
    tokens.push({ type: "text", content: code.slice(lastIndex) });
  }

  return tokens;
}

function getTokenClass(type: string): string {
  switch (type) {
    case "keyword":
      return "text-purple-400";
    case "type":
      return "text-cyan-400";
    case "class":
      return "text-yellow-400";
    case "string":
      return "text-green-400";
    case "number":
      return "text-orange-400";
    case "comment":
      return "text-zinc-500 italic";
    case "punctuation":
      return "text-zinc-400";
    case "operator":
      return "text-blue-400";
    case "identifier":
      return "text-blue-300";
    default:
      return "text-white/80";
  }
}

interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock({ code, className = "" }: CodeBlockProps) {
  const tokens = tokenize(code);
  const lines = code.split("\n");
  
  // Reconstruct lines with tokens
  const lineElements: React.ReactNode[] = [];
  let currentLine: React.ReactNode[] = [];
  let tokenIndex = 0;
  let charCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLength = line.length;
    let lineCharCount = 0;

    while (lineCharCount < lineLength && tokenIndex < tokens.length) {
      const token = tokens[tokenIndex];
      const tokenContent = token.content;
      
      // Check if this token belongs to this line
      if (charCount + tokenContent.length <= charCount + lineLength - lineCharCount + (i > 0 ? 1 : 0)) {
        currentLine.push(
          <span key={`${i}-${lineCharCount}`} className={getTokenClass(token.type)}>
            {tokenContent}
          </span>
        );
        charCount += tokenContent.length;
        lineCharCount += tokenContent.length;
        tokenIndex++;
      } else {
        break;
      }
    }

    // Add line
    lineElements.push(
      <div key={i} className="table-row">
        <span className="table-cell text-zinc-600 select-none pr-4 text-right w-8">
          {i + 1}
        </span>
        <span className="table-cell">
          {currentLine.length > 0 ? currentLine : <span>&nbsp;</span>}
        </span>
      </div>
    );
    
    currentLine = [];
    charCount += 1; // For newline
  }

  return (
    <pre className={`font-mono text-sm leading-relaxed overflow-x-auto ${className}`}>
      <code className="table">{lineElements}</code>
    </pre>
  );
}

// Simpler inline version for the hero
export function InlineCode({ code }: { code: string }) {
  const tokens = tokenize(code);
  
  return (
    <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
      <code>
        {tokens.map((token, i) => (
          <span key={i} className={getTokenClass(token.type)}>
            {token.content}
          </span>
        ))}
      </code>
    </pre>
  );
}
