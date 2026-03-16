import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Gamepad2,
  Gauge,
  GitCommitHorizontal,
  MessageCircle,
  Network,
  Palette,
  ScrollText,
  Smartphone,
  Zap,
  Code2,
  Users,
  Sparkles,
} from "lucide-react";
import Testimonial from "../../components/Testimonial";
import Demo from "../../components/richtextDemo";
import { InlineCode } from "./CodeBlock";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { useEffect, useRef, useState } from "react";
import cn from "clsx";

const customerLogos = [
  { name: "Latch.bio", href: "https://latch.bio", src: "/images/latchbio.svg", className: "max-w-[112px]" },
  { name: "Marimo", href: "https://marimo.io", src: "/images/marimo.svg", className: "max-w-[96px] invert brightness-[1.5]" },
  { name: "Dora", href: "https://dora.run", src: "/images/dora.png", className: "max-w-[96px] invert brightness-[1.35]" },
  { name: "Subset", href: "https://subset.so", src: "/images/subset.png", className: "max-w-[112px]" },
  { name: "Roomy", href: "https://roomy.chat/", src: "/images/roomy.png", className: "max-w-[112px]" },
  { name: "Nema", href: "https://nemastudio.app/", src: "/images/nema.svg", className: "max-w-[96px] invert brightness-[1.3]" },
  { name: "AX Semantics", href: "https://ax-semantics.com", src: "/images/ax-semantics.svg", className: "max-w-[120px]" },
  { name: "Macro", href: "https://macro.com", src: "/images/macro.png", className: "max-w-[112px]" },
] as const;

const proofItems = [
  {
    icon: Gauge,
    label: "Performance-first",
    text: "Optimized for memory, CPU, load time, and long-lived document history.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: ScrollText,
    label: "Rich CRDT types",
    text: "Text, map, movable list, tree, snapshots, version vectors, and replayable history.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: GitCommitHorizontal,
    label: "Real-time + version control",
    text: "Build multiplayer software without giving up inspectable history or time travel.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Network,
    label: "Transport-agnostic",
    text: "Use client-server sync, peer-to-peer sync, or your own protocol layer.",
    gradient: "from-violet-500 to-purple-500",
  },
] as const;

const buildCases = [
  {
    icon: FileText,
    title: "Collaborative Documents",
    text: "Docs-style editors with presence, history, and conflict-free merges.",
    links: [{ href: "/docs/tutorial/text", label: "Text tutorial" }],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Design Tools",
    text: "Figma-style canvases with trees, lists, undo/redo, and timeline playback.",
    links: [
      { href: "/docs/tutorial/tree", label: "Tree" },
      { href: "/docs/tutorial/list", label: "Movable List" },
    ],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: BarChart3,
    title: "Data Dashboards",
    text: "Airtable-like data models with shared JSON state, snapshots, and history.",
    links: [{ href: "/docs/tutorial/persistence", label: "Persistence" }],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Gamepad2,
    title: "Multiplayer Games",
    text: "Shared state with deterministic merges and synchronized timeline review.",
    links: [],
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: MessageCircle,
    title: "Chat + Knowledge Systems",
    text: "Message streams, notes, forums, and hybrid collaborative surfaces with offline sync.",
    links: [{ href: "/docs/tutorial/list", label: "List tutorial" }],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Smartphone,
    title: "Offline-First Apps",
    text: "Local-first state that syncs when available and still preserves causality.",
    links: [{ href: "/docs/tutorial/sync", label: "Sync tutorial" }],
    gradient: "from-amber-500 to-yellow-500",
  },
] as const;

const supportCards = [
  {
    iconSrc: "/images/icon-toolbox.svg",
    title: "Basic Data Structures",
    body: "MovableList, LWW map, MovableTree, and rich text give you a broad collaborative state toolkit without inventing your own merge model.",
    links: [
      { href: "/docs/tutorial/list", label: "MovableList" },
      { href: "/docs/tutorial/map", label: "Map" },
      { href: "/docs/tutorial/tree", label: "MovableTree" },
      { href: "/docs/tutorial/text", label: "Text" },
    ],
  },
  {
    iconSrc: "/images/icon-text-selection.svg",
    title: "Text/List Editing with Fugue",
    body: "Loro integrates Fugue to minimize interleaving anomalies when merging concurrent text and list edits.",
    links: [
      { href: "https://arxiv.org/abs/2305.00583", label: "Fugue paper", external: true },
    ],
  },
  {
    iconSrc: "/images/icon-text.svg",
    title: "Rich Text CRDT",
    body: "Concurrent style edits preserve user intent more faithfully, which matters when collaboration is not just plain text.",
    links: [{ href: "/blog/loro-richtext", label: "Rich text deep dive" }],
  },
  {
    iconSrc: "/images/icon-line.svg",
    title: "Hierarchical Data with Movable Tree",
    body: "Directory-like structures stay collaborative and movable without falling back to centralized conflict resolution.",
    links: [
      { href: "https://ieeexplore.ieee.org/document/9563274", label: "Research paper", external: true },
    ],
  },
] as const;

const testimonials = [
  {
    id: "latch-quote",
    author: "Max",
    company: "Latch.bio",
    avatarSrc: "/images/max.jpg",
    shortQuote: "We use Loro as the document representation for our web-based computational notebook software... This library is a great step forward toward making 'multiplayer' apps the norm.",
    fullQuote: "We use Loro as the document representation for our web-based computational notebook software, Latch Plots, via web-assembly. With a CRDT, we can support multiple simultaneous users without having to reinvent the wheel building custom error-prone state management systems. Multi-user interactions 'just work' in a lot of cases and, for ironing out the kinks in the rest, Loro provides state-of-the-art building blocks.\n\nCompared to other CRDT implementations, Loro better matches user expectations and feels more production-ready—the extensive documentation and blogs go into the gory technical details. When the docs are not enough, the Loro team has been fantastic in direct communication—supporting us in designing the state data model and with general issues, and taking our needs and wants into account in planning the project roadmap.\n\nThis library is a great step forward toward making 'multiplayer' apps the norm, in a world where the best most users see is still the relatively primitive operational systems like in Google Docs.",
    link: "https://latch.bio",
  },
  {
    id: "marimo-quote",
    author: "Myles",
    company: "Marimo.io",
    avatarSrc: "/images/myles.jpg",
    shortQuote: "if you are looking for a real-time collaboration library (based on CRDTs), I highly recommend @loro_dev. it's performant, type-safe, and actively maintained and I've tried them all",
    fullQuote: "if you are looking for a real-time collaboration library (based on CRDTs), I highly recommend @loro_dev. it's performant, type-safe, and actively maintained and I've tried them all",
    link: "https://marimo.io",
    tweetLink: "https://x.com/themylesfiles/status/1925221425838797226",
  },
  {
    id: "cole-quote",
    author: "Cole Lawrence",
    company: "ColeLawrence.com",
    avatarSrc: "/images/cole.jpg",
    shortQuote: "... Loro has become my top choice due to its comprehensive API for managing versions and changesets, and its thoughtful (yet simple) TypeScript declarations.",
    fullQuote: "I predominantly work on rich-text and collaborative editing contracts, deciding between adopting a CRDT implementation or rolling our own OT with LWW. Loro has become my top choice due to its comprehensive API for managing versions and changesets, and its thoughtful (yet simple) TypeScript declarations.",
    link: "https://colelawrence.com",
  },
  {
    id: "aj-quote",
    author: "AJ Nandi",
    company: "Subset.so",
    avatarSrc: "/images/aj_nandi.jpeg",
    shortQuote: "Powerful, performant, and well-designed. The best CRDT for anyone building serious collaborative software.",
    fullQuote: "Powerful, performant, and well-designed. The best CRDT for anyone building serious collaborative software.",
    link: "https://subset.so",
  },
  {
    id: "stealth-quote",
    author: "Oliver Beavers",
    company: "Stealth Startup",
    avatarSrc: "/images/oliver.jpg",
    shortQuote: "After extensive research, we made a big early technology bet on Loro... 10/10 experience to date.",
    fullQuote: "After extensive research, we made a big early technology bet on Loro, which we've found to have one of the most thoughtfully designed APIs that we've seen for the otherwise complex world of CRDT-related work. Our team has extensive experience in end-user computing product development, and we've found Loro to be strongly capable at solving many of the shortcomings experienced with other CRDT libraries. While the community is small, the manager of the repo has been remarkably responsive, often submitting same-day bug fixes/feature implementations to ensure that technology choice was not a bottleneck for whatever we decided to build at the product level. 10/10 experience to date.",
  },
  {
    id: "zicklag-quote",
    author: "Zicklag",
    company: "roomy.chat",
    avatarSrc: "/images/zicklag.jpg",
    shortQuote: "Loro's API is really nice to use, has excellent performance and features, and the dev team has been extremely helpful and responsive. I highly recommend!",
    fullQuote: "We're using Loro to make a group chat application that blurs the lines between a chat, forum, wiki, and personal notes app.\n\nWe switched to Loro after doing some benchmarking and finding that Loro could load a large document storing many IDs faster than alternatives. Loro stores the latest state of the document and then lazily loads the history if you need it, which was a perfect fit for our CRDT-to-webpage rendering needs.\n\nLoro also has some useful features like movable lists and trees which we'll need in Roomy.\n\nLoro's API is really nice to use, has excellent performance and features, and the dev team has been extremely helpful and responsive. I highly recommend!",
    link: "https://roomy.chat",
  },
] as const;

const syncSnippet = `import { LoroDoc } from "loro-crdt";

const docA = new LoroDoc();
const docB = new LoroDoc();

docA.getText("text").update("Hello!");
docB.getText("text").update("Hi!");

const bytesA: Uint8Array = docA.export({ mode: "update" });
const bytesB: Uint8Array = docB.export({ mode: "update" });

// Exchange bytes however you like
docB.import(bytesA);
docA.import(bytesB);`;

// Animation hooks
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Default to true for SSR and initial render

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function ActionLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="landing-inline-link"
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className="landing-inline-link">
      {label}
    </Link>
  );
}

// Animated background component
function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900" />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute w-[80vw] h-[80vw] rounded-full opacity-30 animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(115, 224, 169, 0.4) 0%, transparent 70%)",
          filter: "blur(100px)",
          top: "10%",
          right: "-20%",
          transform: `translate(${mousePosition.x * 0.02}px, 0px)`,
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
          transform: `translate(${-mousePosition.x * 0.02}px, 0px)`,
        }}
      />

      {/* Grid pattern */}
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
    </div>
  );
}

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-root relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />
      <main id="content" className="landing-shell relative z-10">
        {/* Hero Section */}
        <section className="landing-hero px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 md:pt-24">
          <div className="max-w-7xl mx-auto">
            <div className="landing-hero-grid grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Hero Copy */}
              <div className="landing-hero-copy space-y-6">
                <div 
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
                    "bg-white/[0.03] border border-white/[0.08] text-blue-400/80",
                    "transition-all duration-700",
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Now open source
                </div>

                <h1 
                  className={cn(
                    "landing-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight",
                    "bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent",
                    "transition-all duration-700 delay-100",
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                >
                  Reimagine state management with CRDTs that are fast enough to ship.
                </h1>

                <p 
                  className={cn(
                    "landing-lead text-lg md:text-xl text-white/60 max-w-xl leading-relaxed",
                    "transition-all duration-700 delay-200",
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  Loro is a high-performance CRDT toolkit for local-first software,
                  real-time collaboration, rich text, version history, and offline-first
                  application state.
                </p>

                <div 
                  className={cn(
                    "landing-hero-actions space-y-4",
                    "transition-all duration-700 delay-300",
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                >
                  <div className="landing-cta-row flex flex-wrap gap-3">
                    <Link 
                      to="/docs/tutorial/get_started" 
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
                        bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
                        shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
                        hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Zap className="w-4 h-4" />
                      Get Started
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                    <a
                      href="https://github.com/loro-dev/loro"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                        text-white/80 border border-white/10 hover:border-white/20 hover:bg-white/[0.03]
                        hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                  <p className="landing-hero-note text-sm text-white/40">
                    Rust core, JS bindings, WASM delivery, and collaboration primitives
                    that fit document editors, canvases, data tools, and local-first apps.
                  </p>
                </div>

                <div 
                  className={cn(
                    "landing-proof-row flex flex-wrap gap-2",
                    "transition-all duration-700 delay-400",
                    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  {["Local-first", "Rich text", "Version control", "P2P-friendly"].map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/50 
                        bg-white/[0.03] border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero Stack */}
              <div 
                className={cn(
                  "landing-hero-stack space-y-4",
                  "transition-all duration-1000 delay-300",
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
              >
                {/* Signal Card */}
                <div className="landing-signal-card relative overflow-hidden rounded-2xl 
                  bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 
                  border border-white/[0.08] backdrop-blur-sm
                  hover:border-white/[0.12] transition-all duration-500 group">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-6">
                    <div className="landing-signal-head mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">What ships with Loro</span>
                      </div>
                      <p className="landing-signal-copy text-sm text-white/60">
                        Shared state primitives for multiplayer software without surrendering
                        version history, offline workflows, or transport control.
                      </p>
                    </div>
                    
                    <div className="landing-signal-grid grid grid-cols-2 gap-3">
                      {[
                        { label: "JSON-like state", desc: "Map, list, tree, text, history", icon: Code2 },
                        { label: "Offline first", desc: "Sync later without losing intent", icon: Zap },
                        { label: "Rich history", desc: "Snapshots, diffs, replay, version vectors", icon: GitCommitHorizontal },
                        { label: "Portable transport", desc: "Server-based or peer-to-peer", icon: Network },
                      ].map((item) => (
                        <div 
                          key={item.label}
                          className="landing-signal-item p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]
                            hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 group/item"
                        >
                          <item.icon className="w-4 h-4 text-blue-400/60 mb-2 group-hover/item:text-blue-400 transition-colors" />
                          <div className="landing-stat-value text-sm font-semibold text-white/90">{item.label}</div>
                          <div className="landing-stat-label text-xs text-white/40">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Code Card */}
                <div className="landing-code-card relative overflow-hidden rounded-2xl 
                  bg-zinc-950 border border-white/[0.08] backdrop-blur-sm">
                  
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-white/30" />
                      <span className="text-xs text-white/40 font-mono">example.ts</span>
                    </div>
                  </div>
                  
                  <div className="p-4 overflow-x-auto">
                    <div className="landing-code-title text-sm font-medium text-white/70 mb-3">
                      Effortless document synchronization
                    </div>
                    <InlineCode code={syncSnippet} />
                  </div>
                  
                  <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.01]">
                    <p className="landing-code-footer text-xs text-white/40">
                      Exchange updates with any transport and converge on the same state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeatureSection />

        {/* Customer Logos */}
        <CustomerSection />

        {/* Demo Section */}
        <DemoSection />

        {/* Use Cases */}
        <UseCasesSection />

        {/* Algorithm Support */}
        <AlgorithmSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Final CTA */}
        <FinalCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}

function FeatureSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="landing-section px-4 sm:px-6 lg:px-8 xl:px-12 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div 
          className={cn(
            "landing-section-head flex flex-col items-center text-center mb-12 md:mb-16",
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-blue-400/80 bg-blue-500/10 border border-blue-500/20 mb-4">
            <Users className="w-3.5 h-3.5" />
            Why teams pick Loro
          </span>
          <h2 className="landing-section-title text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 max-w-4xl">
            Built for collaboration that still feels like{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              software engineering
            </span>.
          </h2>
        </div>

        <div className="landing-card-grid landing-card-grid--4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <article 
                key={item.label} 
                className={cn(
                  "landing-panel landing-panel--feature relative p-6 rounded-2xl",
                  "bg-gradient-to-br from-zinc-800/40 to-zinc-900/40",
                  "border border-white/[0.06] hover:border-white/[0.12]",
                  "backdrop-blur-sm transition-all duration-500",
                  "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className={`landing-feature-icon w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{item.label}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CustomerSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="landing-section px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div 
          className={cn(
            "landing-section-head text-center mb-10 md:mb-12",
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 block">Trusted by</span>
          <h2 className="landing-section-title text-2xl md:text-3xl font-bold text-white/80">
            Teams already using Loro in production
          </h2>
        </div>

        <div className="landing-logo-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {customerLogos.map((customer, index) => (
            <a
              key={customer.name}
              href={customer.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "landing-logo-card group relative flex items-center justify-center",
                "h-20 md:h-24 rounded-xl p-4",
                "bg-white/[0.02] hover:bg-white/[0.06]",
                "border border-white/[0.04] hover:border-white/[0.10]",
                "transition-all duration-500 overflow-hidden",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <img
                src={customer.src}
                alt={customer.name}
                className={`relative z-10 max-h-8 w-auto opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500 ${customer.className}`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="landing-section px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div 
          className={cn(
            "landing-section-head mb-8 md:mb-10",
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Interactive demo</span>
          </div>
          <h2 className="landing-section-title text-2xl md:text-3xl font-bold text-white/90">
            A rich text editor demo, running on the same primitives exposed by the docs.
          </h2>
        </div>

        <div 
          className={cn(
            "landing-demo-shell relative rounded-2xl overflow-hidden",
            "border border-white/[0.08] bg-zinc-900/30 backdrop-blur-sm",
            "transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <Demo />
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="landing-section px-4 sm:px-6 lg:px-8 xl:px-12 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div 
          className={cn(
            "landing-section-head flex flex-col items-center text-center mb-12 md:mb-16",
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Palette className="w-3.5 h-3.5" />
            Use cases
          </span>
          <h2 className="landing-section-title text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 mb-4 max-w-4xl">
            The collaborative state layer,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              without forcing a product shape
            </span>{" "}
            on you.
          </h2>
          <p className="landing-section-copy text-lg md:text-xl text-white/50 max-w-2xl">
            Loro handles the CRDT state model. You still control UI, auth, storage,
            transport, and deployment architecture.
          </p>
        </div>

        <div className="landing-card-grid landing-card-grid--3 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {buildCases.map((item, index) => {
            const Icon = item.icon;
            return (
              <article 
                key={item.title} 
                className={cn(
                  "landing-panel landing-panel--usecase relative p-6 rounded-2xl group",
                  "bg-gradient-to-br from-zinc-800/40 to-zinc-900/40",
                  "border border-white/[0.06] hover:border-white/[0.12]",
                  "backdrop-blur-sm transition-all duration-500",
                  "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className={`landing-usecase-head flex items-center gap-3 mb-4`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white/90">{item.title}</h3>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{item.text}</p>
                  {item.links.length ? (
                    <div className="landing-link-row flex flex-wrap gap-2">
                      {item.links.map((link) => (
                        <ActionLink key={link.href} href={link.href} label={link.label} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AlgorithmSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="landing-section px-4 sm:px-6 lg:px-8 xl:px-12 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div 
          className={cn(
            "landing-section-head flex flex-col items-center text-center mb-12 md:mb-16",
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-violet-400/80 bg-violet-500/10 border border-violet-500/20 mb-4">
            <Code2 className="w-3.5 h-3.5" />
            Algorithm support
          </span>
          <h2 className="landing-section-title text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 max-w-4xl">
            Rich CRDT primitives for{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              product teams
            </span>, not just research demos.
          </h2>
        </div>

        <div className="landing-card-grid landing-card-grid--2 grid md:grid-cols-2 gap-4 md:gap-6">
          {supportCards.map((card, index) => (
            <article 
              key={card.title} 
              className={cn(
                "landing-panel landing-panel--support relative p-6 md:p-8 rounded-2xl group",
                "bg-gradient-to-br from-zinc-800/40 to-zinc-900/40",
                "border border-white/[0.06] hover:border-white/[0.12]",
                "backdrop-blur-sm transition-all duration-500",
                "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20",
                index % 2 === 0 ? "md:translate-x-0" : "md:translate-x-0",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <div className="landing-support-icon w-12 h-12 mb-5 relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img src={card.iconSrc} alt="" aria-hidden="true" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold text-white/90 mb-3 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{card.title}</h3>
                <p className="text-white/50 leading-relaxed mb-4">{card.body}</p>
                <div className="landing-link-row flex flex-wrap gap-2">
                  {card.links.map((link) => (
                    <ActionLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      external={link.external}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="landing-section px-4 sm:px-6 lg:px-8 xl:px-12 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div 
          className={cn(
            "landing-section-head flex flex-col items-center text-center mb-12 md:mb-16",
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-amber-400/80 bg-amber-500/10 border border-amber-500/20 mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            Testimonials
          </span>
          <h2 className="landing-section-title text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 max-w-4xl">
            The strongest signal is{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              who decides to build on it
            </span>.
          </h2>
        </div>

        <div className="landing-testimonial-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Testimonial {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="landing-section px-4 sm:px-6 lg:px-8 xl:px-12 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <div 
          className={cn(
            "landing-final-cta relative overflow-hidden rounded-3xl p-8 md:p-12 text-center",
            "bg-gradient-to-br from-zinc-800/60 to-zinc-900/60",
            "border border-white/[0.08]",
            "backdrop-blur-sm",
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full" />
          
          <div className="relative">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-blue-400/80 bg-blue-500/10 border border-blue-500/20 mb-6">
              <Zap className="w-3.5 h-3.5" />
              Get started
            </span>
            
            <h2 className="landing-section-title text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 mb-4 text-center mx-auto max-w-3xl">
              Ready to build{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                collaborative software
              </span>?
            </h2>
            
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Read the docs, inspect the examples, or go straight to the repo.
            </p>

            <div className="landing-cta-row flex flex-wrap justify-center gap-3">
              <Link 
                to="/docs/tutorial/get_started" 
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
                  shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
                  hover:-translate-y-0.5 transition-all duration-300"
              >
                Start with the tutorial
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              
              <Link 
                to="/blog" 
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                  text-white/80 border border-white/10 hover:border-white/20 hover:bg-white/[0.03]
                  hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore the blog
              </Link>
              
              <a
                href="https://github.com/loro-dev/loro"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                  text-white/80 border border-white/10 hover:border-white/20 hover:bg-white/[0.03]
                  hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
