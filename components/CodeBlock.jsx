'use client';

import { useState, useEffect } from 'react';
import { Pre } from 'nextra/components';

// Dynamic import for Shiki to use it at runtime
let codeToHtml;
let bundledLanguages;

export function CodeBlock({ 
  children, 
  language = 'ts',
  filename,
  showLineNumbers = false,
  className = '',
  ...props 
}) {
  const [highlightedCode, setHighlightedCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If we receive pre-highlighted content (from MDX), pass it through
  if (typeof children !== 'string') {
    return <Pre {...props}>{children}</Pre>;
  }

  useEffect(() => {
    const loadShikiAndHighlight = async () => {
      try {
        // Dynamically import Shiki
        const shiki = await import('shiki');
        
        // Create highlighter with the same config as Nextra
        const highlighter = await shiki.createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: [language]
        });

        // Generate highlighted HTML
        const html = highlighter.codeToHtml(children, {
          lang: language,
          themes: {
            light: 'github-light',
            dark: 'github-dark'
          },
          defaultColor: false
        });
        
        setHighlightedCode(html);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        setIsLoading(false);
      }
    };

    loadShikiAndHighlight();
  }, [children, language]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Show loading state or plain code while Shiki loads
  if (isLoading || !highlightedCode) {
    return (
      <div className="nextra-code-block relative mt-6 first:mt-0">
        {filename && (
          <div className="absolute top-0 z-[1] w-full truncate rounded-t-xl bg-primary-700/5 py-2 px-4 text-xs text-gray-700 dark:bg-primary-300/10 dark:text-gray-200">
            {filename}
          </div>
        )}
        <pre 
          className={`overflow-x-auto rounded-xl bg-primary-700/5 text-sm ${filename ? 'pt-12' : 'py-4'} ${className}`}
          data-language={language}
          data-theme="default"
          {...props}
        >
          <code className="grid min-w-full px-4" style={{ wordBreak: 'break-word' }}>
            {children}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    );
  }

  // Render highlighted code
  return (
    <div className="nextra-code-block relative mt-6 first:mt-0">
      {filename && (
        <div className="absolute top-0 z-[1] w-full truncate rounded-t-xl bg-primary-700/5 py-2 px-4 text-xs text-gray-700 dark:bg-primary-300/10 dark:text-gray-200">
          {filename}
        </div>
      )}
      <div 
        className={`${filename ? 'pt-6' : ''} ${className}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Copy code"
      >
        {copied ? (
          <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}