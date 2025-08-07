"use client";

import { useEffect, useRef, useState } from "react";

const MaxHeight = 300;

export const ExpendableContent = ({ children }: React.PropsWithChildren) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      console.log(contentHeight);
      if (contentHeight < 300) {
        setIsExpanded(true);
      }
    }
  }, []);

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          maxHeight: !isExpanded ? "none" : `${MaxHeight}px`,
          overflow: "hidden",
          transition: "max-height 0.3s ease-out",
        }}
      >
        {children}
      </div>
      <div className="flex text-gray-400">
        {!isExpanded && (
          <button onClick={toggleExpand} className="expand-button">
            See More ↓
          </button>
        )}
        {/* <button
          className={isExpanded ? "hidden" : "mt-4 hover:text-cyan-700"}
          onClick={toggleExpand}
        ></button> */}
      </div>
    </div>
  );
};
