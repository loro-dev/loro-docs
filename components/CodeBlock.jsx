import { useState } from 'react';

export function CodeBlock({ 
  children, 
  language = 'ts',
  className = '',
  ...props 
}) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <pre className={`language-${language} ${className}`} {...props}>
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}