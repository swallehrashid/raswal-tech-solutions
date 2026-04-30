import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES (Mapped to Raswal Brand Guide)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: 'Barlow', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Raswal Brand Variables */
  --bg-primary: #021422;
  --bg-surface: #0A2540;
  --text-main: #FFFFFF;
  --text-muted: #A8BACB;
  --accent-cyan: #3A95C2;
  --accent-orange: #D4970F;
  
  /* Glass Pill Theming */
  --pill-bg-1: rgba(10, 37, 64, 0.4);
  --pill-bg-2: rgba(4, 29, 48, 0.6);
  --pill-border: rgba(58, 149, 194, 0.2);
  --pill-border-hover: rgba(212, 151, 15, 0.5);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-shadow-hover: rgba(212, 151, 15, 0.2);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(58, 149, 194, 0.15) 0%, 
    rgba(212, 151, 15, 0.08) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  border-color: var(--pill-border-hover);
  box-shadow: 0 10px 40px -10px var(--pill-shadow-hover);
  color: var(--text-main);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.05);
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
const MagneticButton = React.forwardRef(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={`cursor-pointer ${className || ""}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Creative Design</span> <span className="text-[#3A95C2]">✦</span>
    <span>Clean Code</span> <span className="text-[#D4970F]">✦</span>
    <span>Cutting-Edge Technology</span> <span className="text-[#3A95C2]">✦</span>
    <span>Business Engines</span> <span className="text-[#D4970F]">✦</span>
    <span>Measurable Success</span> <span className="text-[#3A95C2]">✦</span>
  </div>
);

export default function Footer() {
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax Giant Text
      gsap.fromTo(
        giantTextRef.current,
        { y: "15vh", scale: 0.9, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Fade up content
      gsap.fromTo(
        contentRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* The Curtain Reveal Wrapper */}
      <div
        ref={wrapperRef}
        className="relative h-auto min-h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#021422] text-[#E8EFF5] cinematic-footer-wrapper border-t border-white/5">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            RASWAL
          </div>

          {/* 1. Diagonal Sleek Marquee */}
          <div className="absolute top-32 left-0 w-full overflow-hidden border-y border-white/10 bg-[#041D30]/80 backdrop-blur-md py-3 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-['Rajdhani'] font-bold tracking-[0.2em] text-[#A8BACB] uppercase">
              <MarqueeItem />
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Content Grid */}
          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 md:px-12 mt-48 w-full max-w-7xl mx-auto h-full overflow-y-auto">
            <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-start w-full">
              
              {/* Column 1: Brand & Contact */}
              <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
                <img
                  src="https://raswaltechsolutions.com/wp-content/uploads/2025/11/cropped-Raswal_logo_3by1-removebg-preview-155x47.png"
                  alt="Raswal Tech Solutions"
                  className="h-12 w-auto object-contain"
                />
                <p className="text-sm text-[#A8BACB] leading-relaxed">
                  Providing creative ideas for your business[cite: 1]. We specialize in helping small businesses and startups establish a strong digital identity through creative design, clean code, and cutting-edge technology[cite: 1].
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  <a href="tel:+254114129809" className="font-['Rajdhani'] text-[#3A95C2] hover:text-[#5DB4E1] transition-colors font-semibold text-lg">
                    +254 114 129 809
                  </a>
                  <a href="mailto:info@raswaltechsolutions.com" className="text-sm text-[#E8EFF5] hover:text-[#D4970F] transition-colors">
                    info@raswaltechsolutions.com
                  </a>
                </div>
              </div>

              {/* Column 2: Navigation Links */}
              <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
                <h3 className="font-['Rajdhani'] text-lg font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">Navigation</h3>
                <nav className="flex flex-col gap-3">
                  {['Home', 'What We Do', 'Our Packages', 'Case Studies', 'About Us', 'Contact'].map((link) => (
                    <Link 
                      key={link} 
                      to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-sm text-[#A8BACB] hover:text-[#D4970F] transition-colors w-fit"
                    >
                      {link === 'Home' ? link : link}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Column 3: SEO / Knowledge Base */}
              <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
                <h3 className="font-['Rajdhani'] text-lg font-bold uppercase tracking-wider text-[#FFFFFF] mb-2">Client Support & Ops</h3>
                
                <div className="footer-glass-pill p-5 rounded-xl border border-white/5">
                  <h4 className="font-['Rajdhani'] font-semibold text-[#D4970F] mb-2 text-sm uppercase tracking-wide">
                    What are the ongoing costs of a website?
                  </h4>
                  <p className="text-xs text-[#A8BACB] leading-relaxed">
                    Transparency is key[cite: 1, 3]. Beyond the initial build, ongoing costs typically involve hosting, domain renewals, and our optional monthly maintenance support plans[cite: 3].
                  </p>
                </div>

                <div className="footer-glass-pill p-5 rounded-xl border border-white/5">
                  <h4 className="font-['Rajdhani'] font-semibold text-[#3A95C2] mb-2 text-sm uppercase tracking-wide">
                    What if my website crashes or needs updates?
                  </h4>
                  <p className="text-xs text-[#A8BACB] leading-relaxed">
                    We don't stop at launch[cite: 1]. Our maintenance plans provide continuous site monitoring, regular security checks, and robust backup and data recovery plans to ensure your business stays online seamlessly[cite: 1, 3].
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6 bg-[#021422]/50 mt-auto">
            
            <div className="text-[#A8BACB] text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              Copyright © 2026 Raswal Tech Solutions.
            </div>

            {/* Social Pills */}
            <div className="flex gap-3 order-1 md:order-2">
              {['Facebook', 'LinkedIn', 'Twitter', 'Whatsapp'].map((social) => (
                <MagneticButton as="a" href="#" key={social} className="footer-glass-pill px-4 py-2 rounded-full text-[#A8BACB] font-medium text-xs hover:text-[#FFFFFF]">
                  {social}
                </MagneticButton>
              ))}
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full footer-glass-pill flex items-center justify-center text-[#3A95C2] hover:text-[#D4970F] group order-3"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}