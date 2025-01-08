import { PropsWithChildren } from "react";
import classes from "./Hero.module.css";
import cn from "clsx";

export type HeroProps = {};

export default function Hero({ }: HeroProps): JSX.Element {
  return (
    <section className="w-full px-5 md:px-15">
      <div className="pt-10 flex md:justify-center items-center">
        <div className="w-full md:w-auto flex flex-col-reverse md:flex-row md:items-start gap-7.5 md:gap-5">
          <div>
            <p
              className={cn(
                classes.DescriptionText,
                "self-end md:self-start text-base text-[13px]"
              )}
            >
              Implement collaboration effortlessly.
              Powered by CRDTs. <br />
              Built for local-first software.
            </p>
          </div>
          <a href="/blog/loro-now-open-source"><h1 className="py-1.5 flex flex-col gap-y-3.5 md:gap-y-7.5 leading-none">
            <GradientText>Reimagine</GradientText>
            <GradientText>State</GradientText>
            <GradientText>Management</GradientText>
            <span className="flex items-center gap-x-7.5">
              <GradientText>with</GradientText>
              <span
                className={cn(
                  classes.HairlineText,
                  "before:w-[5px] before:h-[5px] md:before:w-[7px] md:before:h-[7px]",
                  "after:w-[5px] after:h-[5px] md:after:w-[7px] md:after:h-[7px]",
                  "font-thin text-[50px] leading-[35px] md:text-[80px] md:leading-[56px]"
                )}
              >
                CRDTs
              </span>
            </span>
          </h1>
          </a>
        </div>
      </div>
    </section>
  );
}

function GradientText({ children }: PropsWithChildren) {
  return (
    <span
      className={cn(
        classes.GradientText,
        "leading-[28px] md:leading-[50px] text-hero-small md:text-hero-large"
      )}
    >
      {children}
    </span>
  );
}
