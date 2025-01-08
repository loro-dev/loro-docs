import { useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

export default function Background(): JSX.Element {
  const [pageHeight, setPageHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0); // [px
  const [viewportHeight, setViewportHeight] = useState(0);
  useIsomorphicLayoutEffect(() => {
    const onResize = () => {
      setPageHeight(document.body.clientHeight);
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const elements: JSX.Element[] = [];
  if (pageHeight > 0 && viewportHeight > 0) {
    const limit = Math.floor((pageHeight / viewportWidth) * 100); // number of vw
    // Place circles
    for (let i = 1; 50 + 100 * (i + 1) + 15 * (i + 1) < limit; i++) {
      elements.push(
        <div
          key={`left-${i}`}
          className="absolute -right-1/4 top-[10vw] w-[85vw] h-[85vw] rounded-full bg-[#73E0A9] blur-[24vw]"
          style={{ top: `${10 + 85 * i + 50 * i}vw` }}
        />
      );
      elements.push(
        <div
          key={`right-${i}`}
          className="absolute -left-1/4 top-[50vw] w-[100vw] h-[100vw] rounded-full bg-[#5B68DF] blur-[24vw]"
          style={{ top: `${50 + 100 * i + 50 * i}vw` }}
        />
      );
      break;
    }
  }
  return (
    <div
      className="absolute inset-0 overflow-clip"
      aria-hidden
      role="none"
    >
      <div className="absolute -right-1/4 top-[10vw] w-[85vw] h-[85vw] rounded-full bg-[#73E0A9] blur-[25vw]" />
      <div className="absolute -left-1/4 top-[50vw] w-[100vw] h-[100vw] rounded-full bg-[#5B68DF] blur-[25vw]" />
      {elements}
    </div>
  );
}
