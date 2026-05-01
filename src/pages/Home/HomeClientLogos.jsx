"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Data Preparation ---
const clientData = [
  {
    id: 1,
    imgUrl: "https://placehold.co/600x400/0A2540/3A95C2?text=APEX+CONSTRUCTION",
    clientName: "Apex Construction",
    content: "Apex Construction scaled their enterprise inquiries by 150% after we deployed their high-performance, automated lead-capture platform.",
  },
  {
    id: 2,
    imgUrl: "https://placehold.co/600x400/041D30/E8A820?text=SKYPORT+TRAVEL",
    clientName: "Skyport Travel",
    content: "We eliminated their booking bottlenecks with a lightning-fast custom web application, ensuring zero downtime during peak holiday seasons.",
  },
  {
    id: 3,
    imgUrl: "https://placehold.co/600x400/0A2540/5DB4E1?text=RAWA+ESTATE",
    clientName: "Rawa Estate",
    content: "Rawa Estate's custom CRM and real estate portal integration streamlined their property showings, converting passive browsers into active buyers.",
  },
  {
    id: 4,
    imgUrl: "https://placehold.co/600x400/0F2D4A/D4970F?text=SHOPEASE+FASHION",
    clientName: "ShopEase Fashion",
    content: "By optimizing their e-commerce architecture, we decreased cart abandonment and secured their payment gateways for flawless transactions.",
  },
  {
    id: 5,
    imgUrl: "https://placehold.co/600x400/021422/A7D5F6?text=DRIVE-LINK",
    clientName: "Drive-Link",
    content: "We engineered a peer-to-peer car lending platform from scratch, focusing on mobile-first responsiveness and secure user authentication.",
  },
];

// --- Carousel Component ---
const ClientCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [direction, setDirection] = useState(0);

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet
      } else {
        setCardsPerView(3); // Desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return data.length - 1;
      if (nextIndex >= data.length) return 0;
      return nextIndex;
    });
  };

  // Calculate visible cards for infinite loop effect
  const getVisibleCards = () => {
    let visible = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % data.length;
      visible.push(data[index]);
    }
    return visible;
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden px-4 md:px-12 py-8">
      {/* Controls */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-[#0A2540]/80 backdrop-blur-md text-[#3A95C2] hover:bg-[#3A95C2] hover:text-white transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-[#0A2540]/80 backdrop-blur-md text-[#3A95C2] hover:bg-[#3A95C2] hover:text-white transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Cards Track */}
      <div className="flex gap-4 md:gap-6 w-full justify-center">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="flex w-full gap-4 md:gap-6"
          >
            {getVisibleCards().map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                className="flex-1 min-w-[280px]"
              >
                <div className="relative overflow-hidden rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.5)] group h-full border border-white/5 bg-[#0A2540]">
                  {/* Image Container */}
                  <div className="w-full h-64 md:h-80 bg-[#021422]">
                    <img
                      src={card.imgUrl}
                      alt={`${card.clientName} Project`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-40"
                    />
                  </div>

                  {/* Luxurious Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021422] via-[#041D30]/90 to-transparent p-6 md:p-8 flex flex-col justify-end transition-all duration-500 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <span className="font-['Rajdhani'] text-xs font-bold tracking-[0.2em] uppercase text-[#E8A820] mb-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      Partner Success
                    </span>
                    <h3 className="font-['Barlow_Condensed'] text-3xl font-bold text-white uppercase tracking-tight mb-3 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                      {card.clientName}
                    </h3>
                    <p className="font-['Barlow'] text-sm md:text-base text-[#E8EFF5] leading-relaxed transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                      {card.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main Export Component ---
export default function HomeClientLogos() {
  return (
    <section className="py-24 md:py-32 bg-[#021422] overflow-hidden border-t border-[#041D30]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* SEO & Copy Header */}
        <div className="mb-16 md:mb-20 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#3A95C2] opacity-50"></span>
            <span className="font-['Rajdhani'] text-xs font-bold tracking-[0.2em] text-[#3A95C2] uppercase">
              Proven Excellence
            </span>
            <span className="w-8 h-[1px] bg-[#3A95C2] opacity-50"></span>
          </div>
          
          <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-[-0.02em] mb-8">
            Trusted By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DB4E1] to-[#3A95C2]">Industry Leaders</span>
          </h2>
          
          <p className="font-['Barlow'] text-base md:text-lg text-[#A8BACB] leading-relaxed">
            When scaling your business, you might ask: <strong>What happens if my website crashes, gets hacked, or needs updates?</strong> Our partners never have to worry about that. We engineer bulletproof, secure digital engines backed by continuous monitoring. Furthermore, we believe in total transparency regarding <strong>what the ongoing or hidden costs of maintaining a website are</strong>—providing clear, upfront maintenance packages so you can focus entirely on your growth.
          </p>
        </div>

        {/* Interactive Carousel */}
        <div className="w-full">
          <ClientCarousel data={clientData} />
        </div>

      </div>
    </section>
  );
}