import React, { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Nav Items Data - Expanded Architecture
const NAV_ITEMS = [
  { value: "home", label: "Home", href: "/" },
  { value: "what-we-do", label: "What We Do", href: "/what-we-do" },
  { value: "packages", label: "Our Packages", href: "/our-packages" },
  { value: "about", label: "About Us", href: "/about-us" },
  { value: "case-studies", label: "Case Studies", href: "/case-studies" },
];

/**
 * Desktop Notch Navigation 
 */
function NotchNav({ items }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Radar: Dynamically determine the active item by reading the current URL
  const currentActiveValue = useMemo(() => {
    // Find which item matches our current URL path
    const currentItem = items.find(item => item.href === location.pathname);
    // Default to the first item (home) if no match is found
    return currentItem ? currentItem.value : items[0].value;
  }, [location.pathname, items]);

  const [active, setActive] = useState(currentActiveValue);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [notchRect, setNotchRect] = useState(null);

  // 2. Sync State: If the URL changes (like hitting the back button), update the active highlight
  useEffect(() => {
    setActive(currentActiveValue);
  }, [currentActiveValue]);

  const activeIndex = useMemo(
    () => Math.max(0, items.findIndex((i) => i.value === active)),
    [items, active]
  );

  const updateNotch = useCallback(() => {
    const c = containerRef.current;
    const el = itemRefs.current[activeIndex];
    if (!c || !el) return;
    const cRect = c.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    const left = eRect.left - cRect.left;
    const width = eRect.width;
    setNotchRect({ left, width });
    setReady(true);
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateNotch();
    const onResize = () => updateNotch();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateNotch]);

  // 3. Engine: Handle the click using React Router's navigate, preventing full page reloads
  const commitChange = (next, href) => {
    setActive(next);
    navigate(href); // This is the secret to a seamless SPA
  };

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return (
    <nav aria-label="Primary" className="hidden lg:block w-fit mx-auto">
      <div
        ref={containerRef}
        className="relative rounded-lg border border-white/10 bg-[#0A2540]/80 backdrop-blur-md text-[#E8EFF5] shadow-[0_4px_24px_rgba(58,149,194,0.15)]"
      >
        <ul role="menubar" className="flex items-center justify-center gap-1 p-1">
          {items.map((item, idx) => {
            const isActive = item.value === active;
            return (
              <li key={item.value} role="none">
                <button
                  ref={(el) => (itemRefs.current[idx] = el)}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => commitChange(item.value, item.href)}
                  className={[
                    "relative rounded-md px-4 py-2 text-sm font-['Rajdhani'] font-bold tracking-widest uppercase outline-none transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-[#3A95C2]",
                    isActive
                      ? "text-[#3A95C2]"
                      : "text-[#A8BACB] hover:text-[#FFFFFF]",
                  ].join(" ")}
                >
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {notchRect && (
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute overflow-hidden rounded-sm transition-all ease-[cubic-bezier(0.22,1,0.36,1)]",
              reducedMotion ? "duration-0" : "duration-300",
              ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              transform: `translate3d(${notchRect.left}px, 0, 0)`,
              width: notchRect.width,
              bottom: -4,
              height: 10,
              willChange: "transform, width, opacity",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none" className="block text-[#3A95C2]">
              <path
                d="M 2 1 H 98 Q 99 1 99 2 V 10 H 88 Q 87.2 10 86.6 11.4 L 84.8 18 H 15.2 L 13.4 11.4 Q 12.8 10 12 10 H 2 Q 1 10 1 9 V 2 Q 1 1 2 1 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
      </div>
    </nav>
  );
}

/**
 * Main Universal Navbar Component
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[#021422]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          <a href="/" className="flex-shrink-0 group relative z-50">
            <img
              src="https://raswaltechsolutions.com/wp-content/uploads/2025/11/cropped-Raswal_logo_3by1-removebg-preview-155x47.png"
              alt="Raswal Tech Solutions Logo"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Notice we removed the hardcoded activePath here! */}
          <NotchNav items={NAV_ITEMS} />

          <div className="flex items-center gap-4 z-50">
            <a
              href="/contact"
              className="hidden md:inline-flex items-center justify-center font-['Rajdhani'] font-bold text-sm tracking-wider uppercase text-[#021422] bg-gradient-to-br from-[#E8A820] to-[#B07A0A] px-6 py-3 rounded-md shadow-[0_4px_24px_rgba(212,151,15,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_30px_rgba(212,151,15,0.45)]"
            >
              Start Project →
            </a>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#E8EFF5] hover:text-[#D4970F] transition-colors focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#021422]/98 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex flex-col justify-center pt-20 pb-10 overflow-y-auto">
          
          <nav className="flex flex-col gap-6 mb-12">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.value}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                className="font-['Barlow_Condensed'] text-4xl font-bold text-[#FFFFFF] uppercase tracking-tight transition-all duration-300 hover:text-[#3A95C2] hover:translate-x-2"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}