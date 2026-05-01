"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

// --- Utility Functions ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Interactive Background Grid Sub-Component ---
const BoxesCore = ({ className, ...rest }) => {
  // Optimized for mobile performance: 50x50 grid
  const rows = new Array(50).fill(1);
  const cols = new Array(50).fill(1);

  // Strictly enforcing Raswal Tech Solutions Brand Colors
  const colors = [
    "#E8A820", // Orange Bright
    "#D4970F", // Orange Primary
    "#3A95C2", // Cyan Primary
    "#5DB4E1", // Cyan Bright
    "#A7D5F6", // Ice Blue
    "#0A2540", // Surface Navy
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8 border-l border-white/[0.05] relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-16 h-8 border-r border-t border-white/[0.05] relative cursor-crosshair"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-[#3A95C2]/30 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBoxes = memo(BoxesCore);

// --- Main CTA Component ---
export default function HomeCTA() {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] bg-[#021422] overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      
      {/* 3D Interactive Background Layer */}
      {/* Ensure pointer events reach this layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
        <AnimatedBoxes />
      </div>

      {/* Adjusted Vignette & Fade Overlays to let the grid shine through the center */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#021422] via-[#021422]/50 to-transparent"></div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#021422_90%)] opacity-80"></div>

      {/* Foreground Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 max-w-4xl flex flex-col items-center text-center pointer-events-none">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // THE FIX: pointer-events-none allows the mouse to "pass through" to the grid behind it
          // Reduced bg opacity and fine-tuned backdrop-blur for the glass effect
          className="flex flex-col items-center pointer-events-none backdrop-blur-[4px] bg-[#041D30]/15 p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Eyebrow Label */}
          <div className="mb-6 inline-flex items-center gap-2 bg-[#3A95C2]/10 border border-[#3A95C2]/30 px-4 py-1.5 rounded-full drop-shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A820] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8A820]"></span>
            </span>
            <span className="font-['Rajdhani'] text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#3A95C2]">
              Ready to Scale?
            </span>
          </div>

          {/* Main Headline */}
          {/* Added drop-shadow for legibility over the active grid */}
          <h2 className="font-['Barlow_Condensed'] text-5xl md:text-7xl font-black text-white uppercase tracking-[-0.02em] mb-6 drop-shadow-xl">
            Let's Talk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A820] to-[#D4970F] drop-shadow-md">
              Business
            </span>
          </h2>

          {/* SEO Optimized Body Copy */}
          <p className="font-['Barlow'] text-base md:text-lg text-[#E8EFF5] leading-relaxed max-w-2xl mb-10 drop-shadow-md font-medium">
            <strong>How much does it cost to build a professional website in Kenya?</strong> We believe in total transparency. Explore our tiered packages to find a solution tailored precisely to your growth stage—no hidden fees, just measurable ROI. <br className="hidden md:block mb-3" />
            Ready to convert traffic into real conversations? Our custom setups ensure your <strong>website connects directly to WhatsApp for instant customer inquiries</strong>. Hover over the grid to explore, then click below to launch your next phase of growth.
          </p>

          {/* CTA Buttons */}
          {/* THE FIX: Reactivating pointer-events-auto ONLY for the interactive buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pointer-events-auto">
            {/* Primary Button */}
            <a
              href="/contact"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#E8A820] to-[#B07A0A] px-8 py-4 rounded-xl font-['Rajdhani'] text-base md:text-lg font-bold tracking-[0.1em] text-[#021422] uppercase overflow-hidden shadow-[0_4px_24px_rgba(212,151,15,0.3)] transition-all hover:shadow-[0_6px_30px_rgba(212,151,15,0.45)] hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10">Get Your Free Quote</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Secondary Button */}
            <a
              href="https://wa.me/254114129809"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#021422]/60 backdrop-blur-md px-8 py-4 rounded-xl font-['Rajdhani'] text-base md:text-lg font-bold tracking-[0.1em] text-white uppercase border border-white/20 transition-all hover:bg-[#3A95C2]/20 hover:border-[#3A95C2]/50"
            >
              <MessageCircle className="w-5 h-5 text-[#5DB4E1]" />
              WhatsApp Us
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}