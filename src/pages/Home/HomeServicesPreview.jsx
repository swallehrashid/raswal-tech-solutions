"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code, Paintbrush, Smartphone } from "lucide-react";

const services = [
  {
    id: "service-design",
    title: "Web Design",
    tagline: "Sleek, Modern, & User-Focused",
    summary:
      "Create a lasting first impression. We craft modern, visually appealing, and user-focused layouts that represent your brand identity and intuitively guide visitors toward conversion.",
    icon: <Paintbrush className="w-6 h-6 text-[#E8A820]" />,
    image: "https://placehold.co/600x400/0A2540/E8A820?text=Premium+Web+Design",
    link: "/what-we-do#web-design",
  },
  {
    id: "service-dev",
    title: "Web Development",
    tagline: "Secure, Fast, & Scalable",
    summary:
      "We build the robust backbone of your digital presence. Utilizing high-performance technologies, we deliver secure, blazing-fast, and responsive platforms across all devices.",
    icon: <Code className="w-6 h-6 text-[#5DB4E1]" />,
    image: "https://placehold.co/600x400/0A2540/3A95C2?text=Robust+Web+Development",
    link: "/what-we-do#web-development",
  },
  {
    id: "service-app",
    title: "Mobile App Development",
    tagline: "Powerful & User-Friendly",
    summary:
      "Bring your business directly to your customers' fingertips. We engineer powerful, custom Android and iOS applications tailored specifically to scale your unique goals.",
    icon: <Smartphone className="w-6 h-6 text-[#E8A820]" />,
    image: "https://placehold.co/600x400/0A2540/FFFFFF?text=Custom+Mobile+Apps",
    link: "/what-we-do#mobile-app",
  },
];

export default function HomeServicesPreview() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-[#041D30] border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Section Header & SEO Copy */}
        <div className="mb-12 md:mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="max-w-3xl">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-['Rajdhani'] text-xs font-bold tracking-[0.2em] text-[#3A95C2] uppercase">
                01
              </span>
              <span className="w-8 h-[1px] bg-[#3A95C2] opacity-50"></span>
              <span className="font-['Rajdhani'] text-xs font-bold tracking-[0.2em] text-[#3A95C2] uppercase">
                What We Do
              </span>
            </div>

            <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-[-0.02em] mb-6">
              Digital Solutions That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A820] to-[#D4970F]">
                Drive Real Growth
              </span>
            </h2>

            {/* SEO Integrated Copy */}
            <p className="font-['Barlow'] text-base md:text-lg text-[#A8BACB] leading-relaxed">
              Why does your small business need a website if you already use social media? Because while social channels build awareness, a dedicated, highly-optimized website is the engine that truly captures leads and automates your sales. <br className="hidden md:block mb-2" />
              But what is the difference between web design and web development? We bridge that gap seamlessly: our <strong>designers</strong> craft the stunning, brand-focused visual experience, while our <strong>developers</strong> architect the secure, high-performance systems that keep it running flawlessly.
            </p>
          </div>

          <a
            href="/our-packages"
            className="group inline-flex items-center gap-2 font-['Rajdhani'] text-sm md:text-base font-bold tracking-wider text-white uppercase border-b-2 border-[#3A95C2] pb-1 hover:text-[#5DB4E1] transition-colors"
          >
            View Our Packages
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 text-[#3A95C2]" />
          </a>
        </div>

        {/* Services Grid / Mobile Carousel */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          // Mobile: Horizontal scrolling snap container | Desktop: 3-column grid
          className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 gap-6 lg:gap-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center group"
            >
              <div className="h-full flex flex-col bg-[#0A2540] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#3A95C2]/35 hover:shadow-[0_8px_40px_rgba(58,149,194,0.15)] hover:-translate-y-1">
                
                {/* Image Container with Zoom Effect */}
                <div className="relative aspect-[3/2] overflow-hidden bg-[#021422]">
                  <div className="absolute top-4 left-4 z-10 w-12 h-12 rounded-full bg-[#041D30]/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {/* Luxurious gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] to-transparent opacity-90"></div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="font-['Rajdhani'] text-xs font-semibold tracking-widest uppercase text-[#D4970F] mb-3">
                    {service.tagline}
                  </div>
                  
                  <h3 className="font-['Rajdhani'] text-2xl font-bold text-white mb-4 group-hover:text-[#5DB4E1] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="font-['Barlow'] text-sm md:text-base text-[#E8EFF5] leading-relaxed mb-8 flex-grow">
                    {service.summary}
                  </p>

                  <a
                    href={service.link}
                    className="inline-flex items-center font-['Rajdhani'] text-sm font-bold tracking-widest text-[#A8BACB] uppercase group-hover:text-white transition-colors mt-auto"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#3A95C2]" />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}