import Card from "./Card";
import classes from "./index.module.css";
import { useEffect, useRef, useState } from "react";
import cn from "clsx";

export default function AlgorithmSection(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-20 md:pt-28 px-5 md:px-15 flex flex-col space-y-6 md:space-y-10 relative z-10">
      <h2 className={cn(
        classes.Caption,
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        Rich CRDTs Algorithm Support
      </h2>
      
      <Card
        iconSrc="/images/icon-toolbox.svg"
        caption="Basic Data Structures"
        isVisible={isVisible}
        delay={0.1}
        text={
          <>
            Includes support for{" "}
            <code className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-sm">
              <a href="/docs/tutorial/list">MovableList</a>
            </code>{" "}
            for ordered collections, LWW{" "}
            <code className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-sm">
              <a href="/docs/tutorial/map">Map</a>
            </code>{" "}
            for key-value pairs,{" "}
            <code className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-sm">
              <a href="/docs/tutorial/tree">MovableTree</a>
            </code>{" "}
            for hierarchical data, and{" "}
            <code className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-sm">
              <a href="/docs/tutorial/text">Text</a>
            </code>{" "}
            for rich text manipulation, enabling various of applications.
          </>
        }
      />
      <Card
        iconSrc="/images/icon-text-selection.svg"
        caption="Text/List Editing with Fugue"
        isVisible={isVisible}
        delay={0.2}
        text={
          <>
            Loro integrates{" "}
            <a
              href="https://arxiv.org/abs/2305.00583"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-400 transition-all"
            >
              Fugue
            </a>
            , a novel CRDT algorithm designed to minimize the interleaving
            anomalies when merging concurrent text/list edits.
          </>
        }
      />
      <Card
        iconSrc="/images/icon-text.svg"
        caption="Rich Text CRDT"
        isVisible={isVisible}
        delay={0.3}
        text={
          <>
            Loro manages rich text CRDTs that excel at merging concurrent rich
            text style edits, maintaining the original intent of each user's
            input as much as possible. Please read our blog,{" "}
            <a
              href="/blog/loro-richtext"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-400 transition-all"
            >
              Loro's Rich Text CRDT
            </a>
            , to learn more.
          </>
        }
      />
      <Card
        iconSrc="/images/icon-line.svg"
        caption="Hierarchical Data with Moveable Tree"
        isVisible={isVisible}
        delay={0.4}
        text={
          <>
            For applications requiring directory-like data manipulation, Loro
            utilizes the algorithm from{" "}
            <a
              className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-400 transition-all italic"
              href="https://ieeexplore.ieee.org/document/9563274"
              target="_blank"
              rel="noreferrer"
            >
              A Highly-Available Move Operation for Replicated Trees
            </a>
            , simplifying moving and reorganizing hierarchical data structures.
          </>
        }
      />
    </section>
  );
}
