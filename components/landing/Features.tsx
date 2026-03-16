import { useEffect, useRef, useState } from "react";
import classes from "./Features.module.css";
import FollowOnGitHub from "./FollowOnGitHub";
import { Zap, Layers, GitBranch, Code2 } from "lucide-react";
import cn from "clsx";

const features = [
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized for memory, CPU, and loading speed with advanced performance primitives.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Layers,
    title: "Rich CRDT Types",
    description: "Turn JSON-like data into collaborative types effortlessly with Map, List, Tree, and Text.",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Preserve full version history like Git, even during real-time collaboration.",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    icon: Code2,
    title: "Intuitive API",
    description: "Designed with developer experience in mind. Simple, type-safe, and well-documented.",
    gradient: "from-violet-400 to-purple-500",
  },
];

export default function Features() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger animation for cards
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-5 md:px-15 pt-8 pb-16 md:pt-12 md:pb-12 relative z-10">
      <FollowOnGitHub className="visible md:hidden mb-8 mt-6" />
      
      {/* Section header */}
      <div className="text-center mb-10 md:mb-12">
        <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Loro is a high‑performance CRDT library for local‑first, real‑time collaboration.
        </p>
      </div>

      {/* Features grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            isVisible={visibleCards[index]}
          />
        ))}
      </main>
    </section>
  );
}

interface FeatureCardProps {
  feature: typeof features[0];
  isVisible: boolean;
}

function FeatureCard({ feature, isVisible }: FeatureCardProps) {
  const Icon = feature.icon;
  
  return (
    <article 
      className={cn(
        classes.Card,
        "group relative overflow-hidden",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Spotlight effect */}
      <div className={cn(classes.Spotlight, "spotlight")} />
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Icon container with gradient background */}
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
        "bg-gradient-to-br",
        feature.gradient,
        "shadow-lg group-hover:shadow-xl group-hover:scale-110",
        "transition-all duration-300 ease-out"
      )}>
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>

      {/* Title with gradient text */}
      <h3 className="text-lg md:text-xl font-bold mb-3 bg-blue-green bg-clip-text text-fill-transparent">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-white/60 text-sm md:text-base font-normal leading-relaxed group-hover:text-white/70 transition-colors duration-300">
        {feature.description}
      </p>

      {/* Hover glow effect */}
      <div className={cn(
        "absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
        classes.GlowBorder
      )} />
    </article>
  );
}
