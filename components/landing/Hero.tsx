import { PropsWithChildren, useEffect, useRef, useState } from "react";
import classes from "./Hero.module.css";
import cn from "clsx";

export type HeroProps = {};

export default function Hero({ }: HeroProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={heroRef} className="w-full px-5 md:px-15 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-[60vw] h-[60vw] rounded-full bg-[#73E0A9]/20 blur-[100px] animate-glow-pulse" />
        <div className="absolute -left-1/4 top-1/4 w-[50vw] h-[50vw] rounded-full bg-[#5B68DF]/20 blur-[100px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="pt-16 md:pt-24 flex md:justify-center items-center relative z-10">
        <div className="w-full md:w-auto flex flex-col-reverse md:flex-row md:items-start gap-7.5 md:gap-8">
          <div className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: '0.4s' }}>
            <p
              className={cn(
                classes.DescriptionText,
                "self-end md:self-start text-base text-[13px] md:text-sm"
              )}
            >
              Implement collaboration effortlessly.
              <br />
              <span className="text-white/60">Powered by CRDTs. Built for local-first software.</span>
            </p>
          </div>
          
          <a href="/blog/loro-now-open-source" className="group">
            <h1 className="py-1.5 flex flex-col gap-y-3 md:gap-y-6 leading-none">
              <div className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )} style={{ transitionDelay: '0.1s' }}>
                <GradientText>Reimagine</GradientText>
              </div>
              <div className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )} style={{ transitionDelay: '0.2s' }}>
                <GradientText>State</GradientText>
              </div>
              <div className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )} style={{ transitionDelay: '0.3s' }}>
                <GradientText>Management</GradientText>
              </div>
              <span className="flex items-center gap-x-4 md:gap-x-6 mt-1">
                <span className={cn(
                  "transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )} style={{ transitionDelay: '0.4s' }}>
                  <GradientText>with</GradientText>
                </span>
                <span
                  className={cn(
                    classes.HairlineText,
                    "before:w-[5px] before:h-[5px] md:before:w-[6px] md:before:h-[6px]",
                    "after:w-[5px] after:h-[5px] md:after:w-[6px] md:after:h-[6px]",
                    "font-thin text-[45px] leading-[32px] md:text-[72px] md:leading-[50px]",
                    "transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: '0.5s' }}
                >
                  CRDTs
                </span>
              </span>
            </h1>
          </a>
        </div>
      </div>

      {/* Subtitle badge */}
      <div className={cn(
        "mt-8 md:mt-12 flex justify-center",
        "transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )} style={{ transitionDelay: '0.6s' }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Now open source
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
        "leading-[28px] md:leading-[46px] text-[42px] md:text-[72px]",
        "animate-gradient"
      )}
    >
      {children}
    </span>
  );
}
