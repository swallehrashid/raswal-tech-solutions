"use client";

import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- Helper Functions ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

const placeholderImage = (text, bg = "0A2540", color = "3A95C2") =>
  `https://placehold.co/600x400/${bg}/${color}?text=${encodeURIComponent(text)}`;

// --- Content & SEO Integration ---
const TOTAL_STEPS = 4;

const steps = [
  {
    id: "1",
    name: "01 · Discover",
    title: "Gain Digital Advantage",
    description: "What do you need to prepare before starting a web design project? Absolutely nothing. We begin by analyzing your business, studying your competitors, and defining a clear roadmap for your success.",
  },
  {
    id: "2",
    name: "02 · Design",
    title: "Results-Oriented Visuals",
    description: "Our design team transforms your core ideas into stunning, user-centered layouts. We blend creative aesthetics with intuitive functionality to ensure your brand stands out.",
  },
  {
    id: "3",
    name: "03 · Develop",
    title: "From Art to Science",
    description: "Once approved, our developers bring the design to life. Utilizing modern tech stacks, we write clean, optimized code to ensure blazing-fast speed, high security, and scalability.",
  },
  {
    id: "4",
    name: "04 · Deliver",
    title: "On-Time Delivery",
    description: "How long does it take to design and launch? We establish strict timelines upfront. After rigorous testing, we launch with confidence and provide ongoing maintenance support.",
  },
];

// --- Animation Presets ---
const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
};

// --- Hooks ---
function useNumberCycler(totalSteps = TOTAL_STEPS, interval = 6000) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);
    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval]);

  const setStep = useCallback((stepIndex) => {
    setCurrentNumber(stepIndex % totalSteps);
  }, [totalSteps]);

  return { currentNumber, setStep };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);
  return isMobile;
}

// --- Sub-Components ---
function IconCheck({ className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={cn("h-4 w-4", className)} {...props}>
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

const stepVariants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
};

const StepImage = forwardRef(({ src, alt, className, style, ...props }, ref) => {
  return (
    <img
      ref={ref}
      alt={alt}
      className={className}
      src={src}
      style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
      onError={(e) => (e.currentTarget.src = placeholderImage(alt))}
      {...props}
    />
  );
});
StepImage.displayName = "StepImage";

const MotionStepImage = motion(StepImage);

const AnimatedStepImage = ({ preset = "fadeInScale", delay = 0, ...props }) => {
  const presetConfig = ANIMATION_PRESETS[preset];
  return <MotionStepImage {...props} {...presetConfig} transition={{ ...presetConfig.transition, delay }} />;
};

function FeatureCard({ children, step }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={{ "--x": useMotionTemplate`${mouseX}px`, "--y": useMotionTemplate`${mouseY}px` }}
    >
      <div className="relative w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#0A2540] transition-colors duration-300 shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:border-[#3A95C2]/35">
        
        {/* Glow effect tracking mouse */}
        <motion.div 
            className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block"
            style={{
                background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(58,149,194,0.1), transparent 40%)`,
            }}
        />

        <div className="m-6 md:m-10 min-h-[450px] w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-4 md:w-[55%] z-20 relative pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="font-['Rajdhani'] text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#E8A820]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3 }}
              >
                {steps[step].name}
              </motion.div>
              <motion.h2
                className="font-['Barlow_Condensed'] text-3xl md:text-5xl font-bold tracking-tight text-white uppercase"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {steps[step].title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <p className="font-['Barlow'] text-base md:text-lg leading-relaxed text-[#A8BACB] max-w-sm">
                  {steps[step].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function StepsNav({ steps: stepItems, current, onChange }) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-2 mt-6">
      <ol className="flex w-full flex-wrap items-center justify-center gap-2 md:gap-4" role="list">
        {stepItems.map((step, stepIdx) => {
          const isCompleted = current > stepIdx;
          const isCurrent = current === stepIdx;
          return (
            <motion.li key={step.name} initial="inactive" animate={isCurrent ? "active" : "inactive"} variants={stepVariants} transition={{ duration: 0.3 }} className="relative">
              <button
                type="button"
                className={cn(
                  "group flex items-center gap-2.5 rounded-full px-3 py-1.5 md:px-4 md:py-2 font-['Rajdhani'] text-sm md:text-base font-bold tracking-wider uppercase transition-all duration-300 focus:outline-none border",
                  isCurrent
                    ? "bg-[#3A95C2]/10 border-[#3A95C2] text-white shadow-[0_0_20px_rgba(58,149,194,0.3)]"
                    : "bg-[#041D30] border-white/5 text-[#A8BACB] hover:border-[#3A95C2]/50 hover:text-white"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isCompleted
                    ? "bg-[#3A95C2] text-white"
                    : isCurrent
                      ? "bg-[#E8A820] text-[#021422]"
                      : "bg-[#0A2540] text-[#A8BACB] group-hover:bg-[#3A95C2]/30 group-hover:text-white"
                )}>
                  {isCompleted ? <IconCheck className="h-4 w-4" /> : <span>{stepIdx + 1}</span>}
                </span>
                <span className="hidden sm:inline-block">{step.name.split('· ')[1]}</span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

const defaultClasses = {
  img: "rounded-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)] object-cover",
  step1img1: "w-[45%] md:w-[35%] right-[5%] md:right-[10%] top-[10%] md:top-[15%]",
  step1img2: "w-[50%] md:w-[40%] right-[2%] md:right-[5%] top-[45%] md:top-[35%]",
  step2img1: "w-[45%] md:w-[35%] right-[5%] md:right-[10%] top-[15%] md:top-[20%]",
  step2img2: "w-[40%] md:w-[30%] right-[2%] md:right-[5%] top-[55%] md:top-[45%]",
  step3img: "w-[80%] md:w-[50%] right-[5%] top-[30%] md:top-[25%]",
  step4img: "w-[80%] md:w-[50%] right-[5%] top-[30%] md:top-[25%]",
};

// --- Main Export Component ---
export default function HomeProcessPreview() {
  const { currentNumber: step, setStep } = useNumberCycler();

  // Generated Placeholders simulating UI, Dashboards, Code, and Launch Graphics
  const imageAssets = {
    alt: "Raswal Tech Solutions Process",
    step1img1: placeholderImage("Competitor Analysis", "021422", "3A95C2"),
    step1img2: placeholderImage("Roadmap Strategy", "0A2540", "E8A820"),
    step2img1: placeholderImage("Wireframing", "041D30", "5DB4E1"),
    step2img2: placeholderImage("UI/UX Design", "0A2540", "3A95C2"),
    step3img: placeholderImage("Full Stack Architecture", "021422", "D4970F"),
    step4img: placeholderImage("Launch & Analytics", "0A2540", "3A95C2"),
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="absolute inset-0 w-full h-full">
            <AnimatedStepImage alt={imageAssets.alt} className={cn(defaultClasses.img, defaultClasses.step1img1)} src={imageAssets.step1img1} preset="slideInRight" />
            <AnimatedStepImage alt={imageAssets.alt} className={cn(defaultClasses.img, defaultClasses.step1img2)} src={imageAssets.step1img2} preset="slideInRight" delay={0.15} />
          </div>
        );
      case 1:
        return (
          <div className="absolute inset-0 w-full h-full">
            <AnimatedStepImage alt={imageAssets.alt} className={cn(defaultClasses.img, defaultClasses.step2img1)} src={imageAssets.step2img1} preset="fadeInScale" />
            <AnimatedStepImage alt={imageAssets.alt} className={cn(defaultClasses.img, defaultClasses.step2img2)} src={imageAssets.step2img2} preset="fadeInScale" delay={0.15} />
          </div>
        );
      case 2:
        return <AnimatedStepImage alt={imageAssets.alt} className={cn(defaultClasses.img, defaultClasses.step3img)} src={imageAssets.step3img} preset="slideInRight" />;
      case 3:
        return <AnimatedStepImage alt={imageAssets.alt} className={cn(defaultClasses.img, defaultClasses.step4img)} src={imageAssets.step4img} preset="fadeInScale" />;
      default: return null;
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#021422] relative overflow-hidden">
        
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Header Area */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
            <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="font-['Rajdhani'] text-xs font-bold tracking-[0.2em] text-[#3A95C2] uppercase">
                    02
                    </span>
                    <span className="w-8 h-[1px] bg-[#3A95C2] opacity-50"></span>
                    <span className="font-['Rajdhani'] text-xs font-bold tracking-[0.2em] text-[#3A95C2] uppercase">
                    How We Do It
                    </span>
                </div>
                <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl font-black text-white uppercase tracking-[-0.02em]">
                    From Concept To Launch <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A820] to-[#D4970F]">
                        We Make It Simple
                    </span>
                </h2>
            </div>
            <a href="/what-we-do" className="group inline-flex items-center gap-2 font-['Rajdhani'] text-sm font-bold tracking-wider text-white uppercase border-b-2 border-white/20 hover:border-[#E8A820] pb-1 transition-colors">
                Our Full Process
                <ArrowRight className="w-5 h-5 text-[#E8A820] transition-transform duration-300 group-hover:translate-x-2" />
            </a>
        </div>

        {/* Carousel Area */}
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
          <FeatureCard step={step}>
            <AnimatePresence mode="wait">
              <motion.div key={step} {...ANIMATION_PRESETS.fadeInScale} className="w-full h-full absolute inset-0 z-0">
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </FeatureCard>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <StepsNav current={step} onChange={setStep} steps={steps} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}