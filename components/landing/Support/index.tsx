import Card from "./Card";
import ToolboxIcon from "../../../public/images/icon-toolbox.svg";
import LineIcon from "../../../public/images/icon-line.svg";
import LettersIcon from "../../../public/images/icon-text.svg";
import SelectedText from "../../../public/images/icon-text-selection.svg";
import classes from "./index.module.css";

export default function AlgorithmSection(): JSX.Element {
  return (
    <section className="pt-25 px-5 md:px-15 flex flex-col space-y-5 md:space-y-12.5 relative z-10">
      <h2 className={classes.Caption}>Rich CRDTs Algorithm Support</h2>
      <Card
        icon={ToolboxIcon}
        caption="Basic Data Structures"
        text={
          <>
            Includes support for{" "}
            <code>
              <a href="/docs/tutorial/list">
                MovableList
              </a>
            </code>{" "}
            for ordered collections, LWW (Last Write Win){" "}
            <code>
              <a href="/docs/tutorial/map">Map</a>
            </code>{" "}
            for key-value pairs,{" "}
            <code>
              <a href="/docs/tutorial/tree">MovableTree</a>
            </code>{" "}
            for hierarchical data, and{" "}
            <code>
              <a href="/docs/tutorial/text">Text</a>
            </code>{" "}
            for rich text manipulation, enabling various of applications.
          </>
        }
      />
      <Card
        icon={SelectedText}
        caption="Text/List Editing with Fugue"
        text={
          <>
            Loro integrates{" "}
            <a
              href="https://arxiv.org/abs/2305.00583"
              target="_blank"
              rel="noreferrer"
            >
              Fugue
            </a>
            , a novel CRDT algorithm designed to minimize the interleaving
            anomalies when merging concurrent text/list edits.
          </>
        }
      />
      <Card
        icon={LettersIcon}
        caption="Rich Text CRDT"
        text={
          <>
            Loro manages rich text CRDTs that excel at merging concurrent rich
            text style edits, maintaining the original intent of each user's
            input as much as possible. Please read our blog,{"  "}
            <a
              href="/blog/loro-richtext"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Loro's Rich Text CRDT
            </a>
            , to learn more.
          </>
        }
      />
      <Card
        icon={LineIcon}
        caption="Hierarchical Data with Moveable Tree"
        text={
          <>
            For applications requiring directory-like data manipulation, Loro
            utilizes the algorithm from{" "}
            <a
              className="underline italic"
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
