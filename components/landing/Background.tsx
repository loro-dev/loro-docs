import { useState, useEffect, useCallback } from "react";

export default function Background(): JSX.Element {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900" />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute w-[80vw] h-[80vw] rounded-full opacity-30 animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(115, 224, 169, 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "10%",
          right: "-20%",
          transform: `translate(${mousePosition.x * 0.02}px, ${scrollY * 0.05}px)`,
        }}
      />
      
      <div 
        className="absolute w-[70vw] h-[70vw] rounded-full opacity-25 animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(91, 104, 223, 0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
          top: "30%",
          left: "-15%",
          animationDelay: "2s",
          transform: `translate(${-mousePosition.x * 0.02}px, ${scrollY * 0.03}px)`,
        }}
      />

      <div 
        className="absolute w-[50vw] h-[50vw] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(152, 176, 255, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "60%",
          right: "10%",
          transform: `translate(${mousePosition.x * 0.01}px, ${-scrollY * 0.02}px)`,
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
