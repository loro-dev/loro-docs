export default function CustomerWall() {
    return (
        <section className="px-5 md:px-15 mt-32 z-10 relative">
            {/* Section Header */}
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl not-italic font-bold bg-clip-text mb-8 bg-blue-green text-fill-transparent" style={{ lineHeight: 1.5 }}>
                    Who's Using Loro
                </h2>
            </div>

            {/* Main Container */}
            <div className="relative max-w-6xl mx-auto">
                {/* Customer logos container */}
                <div className="relative bg-zinc-900/40 backdrop-blur-sm p-8 md:p-12">
                    {/* Grid container */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">

                        {/* Latch.bio */}
                        <div className="group">
                            <a
                                href="https://latch.bio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-6 h-24 bg-zinc-800/30 border border-zinc-700/30 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <img
                                    src="/images/latchbio.svg"
                                    alt="Latch.bio"
                                    className="max-w-[120px] max-h-12 w-auto h-auto brightness-[0.9] contrast-[1.1] group-hover:brightness-110 transition-all duration-300"
                                />
                            </a>
                        </div>

                        {/* Marimo */}
                        <div className="group">
                            <a
                                href="https://marimo.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-6 h-24 bg-zinc-800/30 border border-zinc-700/30 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <img
                                    src="/images/marimo.svg"
                                    alt="Marimo.io"
                                    className="max-w-[100px] max-h-10 w-auto h-auto invert hue-rotate-180 brightness-[1.5] grayscale-[50%] group-hover:brightness-[1.8] group-hover:grayscale-[30%] transition-all duration-300"
                                />
                            </a>
                        </div>

                        {/* Dora */}
                        <div className="group">
                            <a
                                href="https://dora.run"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-6 h-24 bg-zinc-800/30 border border-zinc-700/30 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <img
                                    src="/images/dora.png"
                                    alt="Dora.run"
                                    className="max-w-[100px] max-h-10 w-auto h-auto invert hue-rotate-180 brightness-[1.5] grayscale-[50%] group-hover:brightness-[1.8] group-hover:grayscale-[30%] transition-all duration-300"
                                />
                            </a>
                        </div>

                        {/* Subset */}
                        <div className="group">
                            <a
                                href="https://subset.so"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-6 h-24 bg-zinc-800/30 border border-zinc-700/30 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <img
                                    src="/images/subset.png"
                                    alt="Subset"
                                    className="max-w-[120px] max-h-12 w-auto h-auto brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                                />
                            </a>
                        </div>

                        {/* Roomy */}
                        <div className="group">
                            <a
                                href="https://roomy.chat/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-6 h-24 bg-zinc-800/30 border border-zinc-700/30 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <div className="flex items-center">
                                    <img
                                        src="/images/roomy.png"
                                        alt="Roomy"
                                        className="h-8 grayscale-[40%] brightness-[1.1] mr-2 group-hover:grayscale-[20%] group-hover:brightness-[1.3] transition-all duration-300"
                                    />
                                    <span className="text-zinc-300 text-xl font-medium group-hover:text-zinc-100 transition-colors duration-300">Roomy</span>
                                </div>
                            </a>
                        </div>

                        {/* Nema */}
                        <div className="group">
                            <a
                                href="https://nemastudio.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-6 h-24 bg-zinc-800/30 border border-zinc-700/30 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <img
                                    src="/images/nema.svg"
                                    alt="Nema"
                                    className="max-w-[100px] max-h-10 w-auto h-auto invert grayscale-[80%] group-hover:grayscale-[60%] group-hover:brightness-110 transition-all duration-300"
                                />
                            </a>
                        </div>

                        {/* AX Semantics */}
                        <div className="group md:col-span-2 lg:col-span-1">
                            <a
                                href="https://ax-semantics.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-6 h-24 bg-zinc-800/30 border border-zinc-700/30 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <img
                                    src="/images/ax-semantics.svg"
                                    alt="ax-semantics"
                                    className="max-w-[120px] max-h-12 w-auto h-auto brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                                />
                            </a>
                        </div>

                        {/* Macro */}
                        <div className="group md:col-span-2 lg:col-span-1">
                            <a
                                href="https://macro.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-6 h-24 bg-zinc-800/30 border border-zinc-700/30 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all duration-300 group"
                            >
                                <img
                                    src="/images/macro.png"
                                    alt="Macro"
                                    className="max-w-[120px] max-h-12 w-auto h-auto brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 
