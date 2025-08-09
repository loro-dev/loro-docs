import React from 'react';

/**
 * Indent component that wraps content in a div with indentation styling
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to be indented
 * @param {number} [props.level=1] - Indentation level (multiplier)
 * @param {string} [props.className] - Additional CSS classes
 */
export default function Indent({ children, level = 1, className = '' }) {
  const indentStyle = {
    paddingLeft: `${level * 1.5}rem`,
    paddingBottom: "0.75rem",
  };

  return (
    <div style={indentStyle} className={className}>
      {children}
    </div>
  );
}
