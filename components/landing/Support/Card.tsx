import type { ReactNode } from "react";
import classes from "./Card.module.css";
import cn from "clsx";

export type CardProps = {
  iconSrc: string;
  caption: string;
  text: ReactNode;
  isVisible?: boolean;
  delay?: number;
};

export default function Card({
  iconSrc,
  caption,
  text,
  isVisible = true,
  delay = 0,
}: CardProps): JSX.Element {
  return (
    <article
      className={cn(
        classes.Container,
        "relative md:w-4/5 lg:w-3/4 even:self-start odd:self-end md:p-7.5",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      <main className={classes.Card}>
        <div className="relative w-10 h-10 md:w-14 md:h-14 group">
          <div className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            classes.IconBg
          )} />
          <img
            src={iconSrc}
            alt=""
            className="absolute inset-0 h-full w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-6 md:mt-10 text-xl md:text-2xl font-bold leading-tight bg-blue-green bg-clip-text text-fill-transparent">
          {caption}
        </h3>
        <p className={cn(classes.BodyText, "leading-relaxed")}>{text}</p>
      </main>
    </article>
  );
}
