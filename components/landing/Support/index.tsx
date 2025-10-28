import { Fragment } from "react";
import Card from "./Card";
import ToolboxIcon from "../../../public/images/icon-toolbox.svg";
import LineIcon from "../../../public/images/icon-line.svg";
import LettersIcon from "../../../public/images/icon-text.svg";
import SelectedText from "../../../public/images/icon-text-selection.svg";
import classes from "./index.module.css";
import { useHomeTranslations } from "@/lib/useHomeTranslations";
import { RichTextSegment } from "@/lib/home-translations";

const cardIcons = [ToolboxIcon, SelectedText, LettersIcon, LineIcon];

function renderSegments(segments: RichTextSegment[]) {
  return segments.map((segment, index) => {
    if (typeof segment === "string") {
      return <Fragment key={index}>{segment}</Fragment>;
    }

    if (segment.type === "codeLink") {
      return (
        <code key={index}>
          <a href={segment.href}>{segment.label}</a>
        </code>
      );
    }

    return (
      <a
        key={index}
        href={segment.href}
        target={segment.isExternal ? "_blank" : undefined}
        rel={segment.isExternal ? "noopener noreferrer" : undefined}
        className={segment.className}
      >
        {segment.label}
      </a>
    );
  });
}

export default function AlgorithmSection(): JSX.Element {
  const { support } = useHomeTranslations();

  return (
    <section className="pt-25 px-5 md:px-15 flex flex-col space-y-5 md:space-y-12.5 relative z-10">
      <h2 className={classes.Caption}>{support.heading}</h2>
      {support.cards.map((card, index) => (
        <Card
          key={card.title}
          icon={cardIcons[index] ?? ToolboxIcon}
          caption={card.title}
          text={<>{renderSegments(card.description)}</>}
        />
      ))}
    </section>
  );
}
