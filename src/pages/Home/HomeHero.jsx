"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * FloatingPaths Component
 * Generates the luxurious, animated SVG background lines.
 * Customized to use Raswal's subtle Cyan/Steel brand colors.
 */
function FloatingPaths({ position }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        // Utilizing a subtle opacity of the brand's Cyan (#3A95C2) for luxury depth
        color: `rgba(58,149,194,${0.03 + i * 0.01})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Raswal Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={path.color}
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.1, 0.4, 0.1],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

/**
 * HomeHero Component
 * The paramount entry section combining the brand gradient, typography, and SEO copy.
 */
export default function HomeHero() {
    const mainTitle = "EMPOWERING BUSINESSES";
    const subTitle = "WITH MODERN SOLUTIONS";
    const words1 = mainTitle.split(" ");
    const words2 = subTitle.split(" ");

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#021422] via-[#041D30] to-[#0A2540]">
            {/* Animated Background SVG Layer */}
            <div className="absolute inset-0 z-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Radial Glow Overlay for Depth */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
                background: `radial-gradient(ellipse 800px 500px at 50% 50%, rgba(58,149,194,0.08) 0%, transparent 70%)`
            }}></div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 md:px-8 text-center mt-16 md:mt-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="max-w-5xl mx-auto flex flex-col items-center"
                >
                    {/* Eyebrow Label */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-6 inline-block bg-[#D4970F]/10 border border-[#D4970F]/30 px-5 py-1.5 rounded-full"
                    >
                        <span className="font-['Rajdhani'] text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#E8A820]">
                            Kenya's Premier Digital Agency
                        </span>
                    </motion.div>

                    {/* Primary Animated Headline */}
                    <h1 className="font-['Barlow_Condensed'] text-[3.5rem] leading-[1.1] sm:text-7xl md:text-[5rem] lg:text-[6rem] font-black mb-2 tracking-[-0.02em] uppercase">
                        {words1.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block mr-3 md:mr-5 last:mr-0">
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: wordIndex * 0.1 + letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-white"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    {/* Secondary Animated Headline (Orange Accent) */}
                    <h2 className="font-['Barlow_Condensed'] text-[2.5rem] leading-[1.1] sm:text-5xl md:text-[4rem] lg:text-[5rem] font-black mb-8 tracking-[-0.02em] uppercase">
                        {words2.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block mr-3 md:mr-5 last:mr-0">
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`sub-${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: 0.5 + (wordIndex * 0.1 + letterIndex * 0.03),
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#E8A820] to-[#D4970F]"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h2>

                    {/* SEO Optimized Tagline / Body Copy */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="font-['Barlow'] text-base md:text-lg lg:text-xl text-[#E8EFF5] max-w-3xl mx-auto leading-relaxed mb-10"
                    >
                        Building digital experiences that drive growth. We transform your online presence into a 24/7 automated engine designed to <strong className="text-white font-medium">capture more customers and generate high-quality leads.</strong> Whether you need a starter site or a custom system, we guarantee a flawless, mobile-first design that <strong className="text-white font-medium">functions perfectly and looks stunning on every device.</strong>
                    </motion.p>

                    {/* Call To Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
                    >
                        {/* Primary CTA */}
                        <div className="group relative p-[1px] rounded-xl overflow-hidden w-full sm:w-auto shadow-[0_4px_24px_rgba(212,151,15,0.3)] hover:shadow-[0_6px_30px_rgba(212,151,15,0.45)] transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#E8A820] to-[#B07A0A] opacity-100"></div>
                            <button className="relative w-full sm:w-auto rounded-[11px] px-8 py-4 font-['Rajdhani'] text-base md:text-lg font-bold tracking-[0.1em] uppercase bg-gradient-to-r from-[#E8A820] to-[#B07A0A] text-[#021422] transition-transform duration-300 group-hover:-translate-y-[1px] flex items-center justify-center">
                                View Packages
                                <span className="ml-3 transform transition-transform duration-300 group-hover:translate-x-1.5">
                                    →
                                </span>
                            </button>
                        </div>

                        {/* Secondary CTA */}
                        <div className="group relative p-[1px] rounded-xl overflow-hidden w-full sm:w-auto">
                            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                            <button className="relative w-full sm:w-auto rounded-[11px] px-8 py-4 font-['Rajdhani'] text-base md:text-lg font-bold tracking-[0.1em] uppercase bg-transparent text-[#A8BACB] hover:text-white border border-white/10 transition-all duration-300 flex items-center justify-center">
                                Our Process
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}