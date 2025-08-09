import styles from './api-reference.module.css';
import React from 'react';

/**
 * Indent component that wraps content in a div with indentation styling
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to be indented
 * @param {number} [props.level=1] - Indentation level (multiplier)
 * @param {string} [props.className] - Additional CSS classes
 */
export default function Method({ children, className = '', ...props }) {
  return (
    <div 
        className={className ? `${styles.method} ${className}` : styles.method}
        // style={{ paddingTop: "0.5rem" }}
        {...props}
    >
      {children}
    </div>
  );
}
