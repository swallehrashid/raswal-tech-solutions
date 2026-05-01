"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// --- Utility Functions ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- Physics Configuration ---
const BASE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const TAP_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 18,
  mass: 1,
};

// --- Portfolio Data ---
const caseStudies = [
  {
    id: "apex",
    title: "Apex Construction",
    meta: "Innovative Strategies",
    description: "A robust, high-performance corporate platform designed to establish industry authority and streamline project inquiries.",
    imageSrc: "https://placehold.co/600x800/0A2540/3A95C2?text=Apex+Construction",
    href: "/case-studies",
  },
  {
    id: "skyport",
    title: "Skyport Travel",
    meta: "Strategic Insights",
    description: "An immersive booking and discovery experience optimized for lightning-fast load speeds and seamless user journeys.",
    imageSrc: "https://placehold.co/600x800/021422/E8A820?text=Skyport+Travel",
    href: "/case-studies",
  },
  {
    id: "rawa",
    title: "Rawa Estate Agent",
    meta: "Automated Pipelines",
    description: "A custom real estate system featuring advanced property filtering and an automated lead-capture pipeline.",
    imageSrc: "https://placehold.co/600x800/0A2540/5DB4E1?text=Rawa+Estate",
    href: "/case-studies",
  },
  {
    id: "shopease",
    title: "ShopEase Fashion",
    meta: "E-Commerce Growth",
    description: "A high-converting digital storefront engineered with smart AI upselling and secure payment gateway integrations.",
    imageSrc: "https://placehold.co/600x800/041D30/D4970F?text=ShopEase+Fashion",
    href: "/case-studies",
  },
];

export default function HomeCaseStudiesPreview({
  initialIndex = 0,
  loop = true,
  autoPlay = true, // Set to true by default
  interval = 4000, // Changed to 2 seconds
}) {
  const [active, setActive] = useState(initialIndex);
  const [isHovering, setIsHovering] = useState(false);

  const count = caseStudies.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = caseStudies[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- AUTOPLAY LOGIC ---
  useEffect(() => {
    // Pauses if the user hovers over the cards to read them
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // --- KEYBOARD NAVIGATION ---
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC (Retained for Mobile UX) ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <section className="py-24 md:py-32 bg-[#021422] border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-16 md:mb-24">
        {/* SEO & Intro Copy */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#3A95C2] opacity-50"></span>
            <span className="font-['Rajdhani'] text-xs font-bold tracking-[0.2em] text-[#3A95C2] uppercase">
              03 · Case Studies
            </span>
            <span className="w-8 h-[1px] bg-[#3A95C2] opacity-50"></span>
          </div>

          <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-[-0.02em] mb-8">
            Digital Experiences That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DB4E1] to-[#3A95C2]">
              Inspire Growth
            </span>
          </h2>

          <p className="font-['Barlow'] text-base md:text-lg text-[#A8BACB] leading-relaxed max-w-3xl mx-auto">
            <strong>How can a website help me get more customers and generate leads?</strong> By transitioning from a static digital brochure into an active, 24/7 business engine. The projects below showcase exactly that. If you are wondering <strong>how automated sales systems and lead pipelines work</strong>, we architect these custom workflows behind the scenes—ensuring that every visitor is guided effortlessly toward a conversion.
          </p>
        </div>
      </div>

      {/* 3D Focus Rail Interactive Component */}
      <div
        className="group relative flex h-[500px] md:h-[600px] w-full flex-col overflow-hidden outline-none select-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        // Removed the onWheel listener entirely to prevent scroll-jacking
      >
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`bg-${activeItem.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={activeItem.imageSrc}
                alt=""
                className="h-full w-full object-cover blur-3xl saturate-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021422] via-[#021422]/70 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Stage */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-0 md:px-8">
          
          {/* DRAGGABLE RAIL CONTAINER */}
          <motion.div
            className="relative mx-auto flex h-[320px] md:h-[380px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            {visibleIndices.map((offset) => {
              const absIndex = active + offset;
              const index = wrap(0, count, absIndex);
              const item = caseStudies[index];

              if (!loop && (absIndex < 0 || absIndex >= count)) return null;

              const isCenter = offset === 0;
              const dist = Math.abs(offset);

              // Mobile responsive transforms
              const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
              const xSpread = isMobile ? 220 : 320;
              const zDepth = isMobile ? 120 : 180;

              const xOffset = offset * xSpread;
              const zOffset = -dist * zDepth;
              const scale = isCenter ? 1 : 0.85;
              const rotateY = offset * -20;

              const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
              const blur = isCenter ? 0 : dist * 6;
              const brightness = isCenter ? 1 : 0.4;

              return (
                <motion.div
                  key={absIndex}
                  className={cn(
                    "absolute aspect-[3/4] w-[220px] md:w-[300px] rounded-2xl border-t border-white/10 bg-[#0A2540] shadow-2xl transition-shadow duration-300",
                    isCenter ? "z-20 shadow-[0_8px_40px_rgba(58,149,194,0.25)]" : "z-10"
                  )}
                  initial={false}
                  animate={{
                    x: xOffset,
                    z: zOffset,
                    scale: scale,
                    rotateY: rotateY,
                    opacity: opacity,
                    filter: `blur(${blur}px) brightness(${brightness})`,
                  }}
                  transition={(val) => {
                    if (val === "scale") return TAP_SPRING;
                    return BASE_SPRING;
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => {
                    if (offset !== 0) setActive((p) => p + offset);
                  }}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full rounded-2xl object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-[#0A2540]/80 pointer-events-none" />
                  
                  {/* Subtle Brand Border on Active */}
                  {isCenter && (
                      <div className="absolute inset-0 rounded-2xl border border-[#3A95C2]/30 pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Info & Controls */}
          <div className="mx-auto mt-8 md:mt-12 flex w-full max-w-4xl flex-col items-center justify-between gap-6 md:flex-row pointer-events-auto px-4">
            
            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left h-28 md:h-32 justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {activeItem.meta && (
                    <span className="font-['Rajdhani'] text-xs font-bold uppercase tracking-widest text-[#E8A820]">
                      {activeItem.meta}
                    </span>
                  )}
                  <h3 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
                    {activeItem.title}
                  </h3>
                  {activeItem.description && (
                    <p className="max-w-md font-['Barlow'] text-sm md:text-base text-[#A8BACB] leading-relaxed">
                      {activeItem.description}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-full bg-[#041D30]/80 p-1 ring-1 ring-white/10 backdrop-blur-md">
                <button
                  onClick={handlePrev}
                  className="rounded-full p-3 text-[#A8BACB] transition hover:bg-[#3A95C2]/20 hover:text-white active:scale-95"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="min-w-[40px] text-center font-['Rajdhani'] text-xs font-bold tracking-widest text-[#5DB4E1]">
                  {activeIndex + 1} / {count}
                </span>
                <button
                  onClick={handleNext}
                  className="rounded-full p-3 text-[#A8BACB] transition hover:bg-[#3A95C2]/20 hover:text-white active:scale-95"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {activeItem.href && (
                <a
                  href={activeItem.href}
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A820] to-[#D4970F] px-5 md:px-6 py-3 font-['Rajdhani'] text-sm font-bold uppercase tracking-wider text-[#021422] transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(212,151,15,0.3)]"
                >
                  View Case Study
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}