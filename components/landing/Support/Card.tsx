import type { FC, ReactNode, SVGAttributes } from "react";
import classes from "./Card.module.css";
import cn from "clsx";

export type CardProps = {
  icon: FC<SVGAttributes<SVGSVGElement>>;
  caption: string;
  text: ReactNode;
};

export default function Card({
  icon: Icon,
  caption,
  text,
}: CardProps): JSX.Element {
  return (
    <article
      className={cn(
        classes.Container,
        "relative md:w-4/5 lg:w-3/4 even:self-start odd:self-end md:p-7.5 md:after:content-[''] md:before:content-['']"
      )}
    >
      <main className={classes.Card}>
        <div className="relative w-10 h-10 md:w-15 md:h-15">
          <Icon className="absolute inset-0" />
        </div>
        <h3 className="mt-7.5 md:mt-12.5 text-1.5xl font-bold leading-0 bg-blue-green bg-clip-text text-fill-transparent">
          {caption}
        </h3>
        <p className={classes.BodyText}>{text}</p>
      </main>
    </article>
  );
}
