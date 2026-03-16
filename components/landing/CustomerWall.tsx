import { useEffect, useRef, useState } from "react";
import cn from "clsx";

const customers = [
  { name: "Latch.bio", logo: "/images/latchbio.svg", link: "https://latch.bio" },
  { name: "Marimo", logo: "/images/marimo.svg", link: "https://marimo.io" },
  { name: "Dora", logo: "/images/dora.png", link: "https://dora.run" },
  { name: "Subset", logo: "/images/subset.png", link: "https://subset.so" },
  { name: "Roomy", logo: "/images/roomy.png", link: "https://roomy.chat/", hasText: true },
  { name: "Nema", logo: "/images/nema.svg", link: "https://nemastudio.app/" },
  { name: "AX Semantics", logo: "/images/ax-semantics.svg", link: "https://ax-semantics.com" },
  { name: "Macro", logo: "/images/macro.png", link: "https://macro.com" },
];

export default function CustomerWall() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-5 md:px-15 mt-24 md:mt-32 z-10 relative">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text bg-blue-green text-fill-transparent mb-4",
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          Trusted by Innovative Teams
        </h2>
        <p className={cn(
          "text-white/50 text-base md:text-lg max-w-xl mx-auto",
          "transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Powering collaboration across industries
        </p>
      </div>

      {/* Logo Grid */}
      <div className={cn(
        "relative max-w-5xl mx-auto",
        "transition-all duration-1000 delay-200",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-3xl blur-3xl" />
        
        {/* Grid container */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-2">
          {customers.map((customer, index) => (
            <a
              key={customer.name}
              href={customer.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-center justify-center",
                "h-20 md:h-24 rounded-2xl",
                "bg-white/[0.02] hover:bg-white/[0.06]",
                "border border-white/[0.06] hover:border-white/[0.15]",
                "transition-all duration-500 ease-out",
                "overflow-hidden"
              )}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover glow effect */}
              <div 
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  "bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10"
                )}
              />
              
              {/* Logo container */}
              <div className="relative z-10 flex items-center justify-center w-full h-full px-6">
                {customer.hasText ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={customer.logo}
                      alt={customer.name}
                      className="h-7 md:h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                    />
                    <span className="text-white/70 group-hover:text-white/90 font-medium text-lg transition-colors duration-300">
                      {customer.name}
                    </span>
                  </div>
                ) : (
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    className={cn(
                      "max-w-[110px] md:max-w-[130px] max-h-8 md:max-h-9 w-auto h-auto object-contain",
                      "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0",
                      "transition-all duration-500 ease-out",
                      "group-hover:scale-105"
                    )}
                  />
                )}
              </div>

              {/* Corner accent on hover */}
              <div className={cn(
                "absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-bl from-blue-500/20 to-transparent"
              )} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
