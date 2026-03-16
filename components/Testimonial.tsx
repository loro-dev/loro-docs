import { useState, useRef, useEffect } from "react";
import cn from "clsx";
import { Quote, X, Twitter } from "lucide-react";

// CSS animations
const ModalStyles = () => (
  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes modalSlideIn {
      from { 
        opacity: 0;
        transform: translateY(30px) scale(0.96);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }

    .animate-modalSlideIn {
      animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    body.modal-open {
      overflow: hidden;
      padding-right: var(--scrollbar-width, 0px);
    }

    .testimonial-quote {
      font-family: Georgia, serif;
      font-size: 1.1rem;
      line-height: 1.8;
      letter-spacing: 0.01em;
      color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 640px) {
      .testimonial-quote {
        font-size: 1rem;
        line-height: 1.7;
      }
    }
  `}</style>
);

interface TestimonialProps {
  id: string;
  author: string;
  company: string;
  avatarSrc: string;
  shortQuote: string;
  fullQuote: string;
  link?: string;
  avatarAlt?: string;
  tweetLink?: string;
}

export default function Testimonial({
  id,
  author,
  company,
  avatarSrc,
  shortQuote,
  fullQuote,
  link,
  avatarAlt,
  tweetLink,
}: TestimonialProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleContent = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    } else {
      if (isExpanded) {
        setIsExpanded(false);
      } else {
        setIsModalOpen(true);
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
        document.body.classList.add("modal-open");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      if (isModalOpen) document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  const processQuote = (quote: string): string => {
    return quote.replace(/\\n/g, "\n");
  };

  const showExpand = shortQuote !== fullQuote;

  return (
    <>
      <ModalStyles />
      <div
        className={cn(
          "group relative p-6 rounded-2xl cursor-pointer",
          "bg-gradient-to-br from-zinc-800/60 to-zinc-900/60",
          "border border-white/[0.06] hover:border-white/[0.12]",
          "backdrop-blur-sm",
          "transition-all duration-500 ease-out",
          "hover:shadow-2xl hover:shadow-blue-500/5",
          isExpanded && "from-zinc-800/80 to-zinc-900/80"
        )}
        style={{
          minHeight: isExpanded ? "auto" : "260px",
        }}
        onClick={toggleContent}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover glow */}
        <div 
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
            "bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5"
          )}
        />

        {/* Quote icon */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <Quote className="w-8 h-8 text-blue-400" />
        </div>

        <blockquote id={id} className="relative text-white/90 italic mb-6">
          {!isExpanded ? (
            <div>
              <p className="line-clamp-4 leading-relaxed">
                "{processQuote(shortQuote)}"
              </p>
              {showExpand && (
                <div className="mt-4 flex items-center text-sm text-blue-400/80 hover:text-blue-300 transition-colors">
                  <span>Read more</span>
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="testimonial-quote whitespace-pre-line">
                {processQuote(fullQuote)}
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-400/80 hover:text-blue-300 transition-colors">
                <span>Show less</span>
                <svg
                  className="w-4 h-4 ml-1 transform rotate-180 group-hover:-translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        </blockquote>

        {/* Author info */}
        <div className="mt-auto pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarSrc}
                alt={avatarAlt || author}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-blue-400/0 group-hover:ring-blue-400/20 transition-all duration-300 scale-110" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white truncate">{author}</div>
              <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {company}
                  </a>
                ) : (
                  company
                )}
              </div>
            </div>
            {tweetLink && (
              <a
                href={tweetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/40 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-300"
                aria-label="View on X"
                onClick={(e) => e.stopPropagation()}
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modal for desktop */}
      {isModalOpen && !isMobile && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={closeModal}
          />
          
          {/* Modal container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div
              ref={modalRef}
              className={cn(
                "relative w-full max-w-3xl max-h-[85vh] overflow-auto",
                "bg-gradient-to-br from-zinc-800 to-zinc-900",
                "rounded-2xl border border-white/[0.1]",
                "shadow-2xl shadow-black/50",
                "animate-modalSlideIn"
              )}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10">
                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-10 h-10 text-blue-500/10" />
                  <div className="testimonial-quote whitespace-pre-line pl-6 border-l-2 border-blue-500/30">
                    {processQuote(fullQuote)}
                  </div>
                </div>

                {/* Author */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center">
                  <img
                    src={avatarSrc}
                    alt={avatarAlt || author}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-semibold text-white text-lg">{author}</div>
                    <div className="text-white/60">
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors"
                        >
                          {company}
                        </a>
                      ) : (
                        company
                      )}
                    </div>
                  </div>
                  {tweetLink && (
                    <a
                      href={tweetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-white/50 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-300"
                      aria-label="View on X"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
