import { useState, useRef, useEffect } from "react";

// Define CSS animations with styled component approach
const ModalStyles = () => (
    <style jsx global>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes expandContent {
      from {
        max-height: 200px;
        opacity: 0.8;
      }
      to {
        max-height: 2000px;
        opacity: 1;
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.25s ease-out forwards;
    }

    .animate-modalSlideIn {
      animation: modalSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .animate-expand {
      animation: expandContent 0.5s ease-out forwards;
    }
    
    .modal-content {
      position: relative;
      z-index: 1;
    }
    
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      z-index: 50;
      width: 100vw;
      height: 100vh;
    }
    
    .modal-container {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      z-index: 51;
      width: 100vw;
      height: 100vh;
      max-width: 90vw;
      max-height: 90vh;
    }
    
    .modal-quote-mark {
      position: absolute;
      font-size: 140px;
      opacity: 0.07;
      font-family: Georgia, serif;
      top: 8px;
      left: 8px;
      line-height: 0.8;
      color: #3b82f6;
    }
    
    .modal-quote-mark-end {
      position: absolute;
      font-size: 140px;
      opacity: 0.07;
      font-family: Georgia, serif;
      bottom: 60px;
      right: 8px;
      line-height: 0.8;
      color: #3b82f6;
      transform: rotate(180deg);
    }
    
    .testimonial-quote {
      font-family: Georgia, serif;
      font-size: 1.2rem;
      line-height: 1.7;
      letter-spacing: 0.01em;
      color: rgba(255, 255, 255, 0.95);
      border-left: 3px solid #3b82f6;
      border-left-width: 3px;
      padding-left: 1.5rem;
      margin: 0;
      white-space: pre-line;
    }
    
    .testimonial-quote p {
      margin-bottom: 1rem;
    }
    
    .testimonial-quote p:last-child {
      margin-bottom: 0;
    }

    .expanded-content {
      overflow: hidden;
    }

    body.modal-open {
      overflow: hidden;
      padding-right: var(--scrollbar-width, 0px);
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .testimonial-quote {
            font-size: 1.1rem;
        }

        .modal-quote-mark, .modal-quote-mark-end {
            font-size: 120px;
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
    const modalRef = useRef<HTMLDivElement>(null);

    // Check screen size on mount and on resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024); // Consider mobile if width is less than 1024px
        };

        // Initialize
        checkScreenSize();

        // Add resize listener
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const toggleContent = () => {
        if (isMobile) {
            setIsExpanded(!isExpanded);
        } else {
            if (isExpanded) {
                setIsExpanded(false);
            } else {
                setIsModalOpen(true);
                // Calculate scrollbar width to prevent page shift
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
                document.body.classList.add('modal-open');
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove('modal-open');
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);

            // Clean up in case component unmounts while modal is open
            if (isModalOpen) {
                document.body.classList.remove('modal-open');
            }
        };
    }, [isModalOpen]);

    // Process a quote string to clean up HTML entities
    const processQuote = (quote: string): string => {
        return quote
            .replace(/\\n/g, '\n')
    }

    return (
        <>
            <ModalStyles />
            <div
                className={`p-6 bg-zinc-800 rounded-lg hover:bg-zinc-700/50 transition-all duration-300 flex flex-col justify-between cursor-pointer ${isExpanded ? 'animate-expand' : ''}`}
                style={{
                    minHeight: isExpanded ? 'auto' : '250px',
                    height: isExpanded ? 'auto' : undefined,
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                }}
                onClick={toggleContent}
            >
                <blockquote id={id} data-expanded={isExpanded || isModalOpen} className="text-white/95 italic relative">
                    {!isExpanded ? (
                        <div className="block">
                            <div>"{processQuote(shortQuote)}"</div>
                            {shortQuote !== fullQuote && (
                                <div
                                    className="text-sm text-gray-400 hover:text-blue-300 mt-2 flex items-center transition-colors duration-200"
                                >
                                    <span className="inline-flex items-center group">
                                        <span>Read more</span>
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="expanded-content animate-expand">
                            <div className="testimonial-quote">
                                {fullQuote && processQuote(fullQuote)}
                            </div>
                            <div
                                className="text-sm text-gray-400 hover:text-blue-300 mt-4 flex items-center transition-colors duration-200"
                            >
                                <span className="inline-flex items-center group">
                                    <span>Show less</span>
                                    <svg className="w-4 h-4 ml-1 transform rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    )}
                </blockquote>
                <div className="mt-4 font-medium text-white/95">
                    <div className="flex flex-row gap-4 items-center">
                        <img src={avatarSrc} alt={avatarAlt || author} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                            <div>{author}</div>
                            <div className="text-sm">
                                {link ? (
                                    <a href={link} target="_blank" rel="noopener noreferrer">{company}</a>
                                ) : (<>{company}</>)}
                            </div>
                        </div>
                        {tweetLink && (
                            <a
                                href={tweetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-zinc-700/50 rounded-full"
                                aria-label="View original tweet"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal (only for larger screens) */}
            {isModalOpen && !isMobile && (
                <>
                    <div className="modal-backdrop animate-fadeIn" onClick={closeModal}></div>
                    <div className="modal-container animate-fadeIn">
                        <div
                            ref={modalRef}
                            className="relative bg-zinc-800 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-auto shadow-2xl animate-modalSlideIn border border-zinc-700"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeModal();
                                }}
                                className="absolute right-4 top-4 text-gray-400 hover:text-white z-10 transition-colors p-1 hover:bg-zinc-700/50 rounded-full"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="p-10 pt-12 relative">
                                <div className="prose prose-invert max-w-none relative z-10">
                                    <div className="testimonial-quote">
                                        {(fullQuote && processQuote(fullQuote)) || shortQuote}
                                    </div>
                                </div>

                                <div className="flex items-center mt-10 pt-6 border-t border-zinc-700">
                                    <img src={avatarSrc} alt={avatarAlt || author} className="w-14 h-14 rounded-full object-cover mr-5 ring-2 ring-blue-500/30" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-white text-lg">{author}</div>
                                        <div className="text-gray-400">{link ? (<a href={link} target="_blank" rel="noopener noreferrer">{company}</a>) : (<>{company}</>)}</div>
                                    </div>
                                    {tweetLink && (
                                        <a
                                            href={tweetLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-zinc-700/50 rounded-full ml-4"
                                            aria-label="View original tweet"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
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
