/**
 * Raswal Tech Solutions - Pricing & Packages Data
 * Location: src/data/packages.js
 * Description: Premium data structure defining the 6 core service tiers.
 * Includes embedded SEO copywriting designed to target high-intent pricing queries.
 */

export const packagesData = [
  {
    id: "landing-page",
    title: "Landing Page",
    subtitle: "SIMPLE. PROFESSIONAL. READY TO GROW.",
    priceRange: "KSH 15,000 – KSH 25,000",
    accentColor: "#3A95C2", // Raswal Cyan
    isPopular: false,
    description: "An essential online identity and visibility engine for new businesses[cite: 1]. Startups often ask us: *Can I upgrade my website later if I start with a simple landing page?*[cite: 3]. The answer is absolutely. We build every landing page on a scalable architecture, meaning it can easily evolve into a full e-commerce or custom system as your business expands[cite: 1, 3].",
    features: [
      "1-page responsive website[cite: 1]",
      "Contact form integration[cite: 1]",
      "Free SSL installation & Hosting setup[cite: 1]",
      "Basic on-page SEO & Mobile-friendly checks[cite: 1]"
    ]
  },
  {
    id: "starter-business",
    title: "Starter Business Website",
    subtitle: "WHERE STRATEGY MEETS REAL BUSINESS RESULTS.",
    priceRange: "KSH 25,000 – KSH 60,000",
    accentColor: "#D4970F", // Raswal Orange
    isPopular: false,
    description: "A clean, responsive website built to establish credibility and make it easy for customers to learn about your business[cite: 1]. Designed to give you an immediate digital advantage with essential communication tools and integrated analytics[cite: 1].",
    features: [
      "4–6 page responsive website[cite: 1]",
      "1 business email setup[cite: 1]",
      "Google Analytics 4 & Search Console setup[cite: 1]",
      "One month free support & Sitemap submission[cite: 1]"
    ]
  },
  {
    id: "professional-company",
    title: "Professional Company Website",
    subtitle: "ACCELERATE YOUR REACH WITH OPTIMIZED CONTENT.",
    priceRange: "KSH 60,000 – KSH 120,000+",
    accentColor: "#3A95C2",
    isPopular: true, // Flagged for UI highlighting
    description: "A full business website built for ranking, credibility, and conversions—perfect for growing brands that need more pages, better structure, and lightning-fast speeds[cite: 1]. We integrate smart marketing tools to accelerate your digital reach[cite: 1].",
    features: [
      "7–13+ page high-performance website[cite: 1]",
      "Speed optimization (image compression, caching, CDN)[cite: 1]",
      "Advanced on-page SEO + keyword mapping[cite: 1]",
      "Blog setup + 1 optimized blog post[cite: 1]"
    ]
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Store",
    subtitle: "CONVERT MORE WEBSITE VISITORS INTO LEADS.",
    priceRange: "KSH 60,000 – KSH 150,000+",
    accentColor: "#D4970F",
    isPopular: false,
    description: "A complete digital storefront optimized for seamless transactions and maximum conversion rates[cite: 1]. This package helps you stay top-of-mind with your audience through integrated CRM features, an AI website chatbot, and social media marketing frameworks[cite: 1].",
    features: [
      "Complete e-commerce platform integration[cite: 1]",
      "AI website chatbot for lead capture[cite: 1]",
      "CRM or email integration for form & bot leads[cite: 1]",
      "8 branded social media posts per month[cite: 1]"
    ]
  },
  {
    id: "custom-web-systems",
    title: "Custom Web Systems",
    subtitle: "SMART AUTOMATION FOR SERIOUS GROWTH.",
    priceRange: "KSH 80,000 – KSH 250,000+",
    accentColor: "#3A95C2",
    isPopular: false,
    description: "End-to-end business automation for seamless lead conversion. Perfect for real estate firms, clinics, hotels, and growing service businesses[cite: 1]. Clients scaling operations frequently ask: *How do automated sales systems and lead pipelines work?*[cite: 3]. We engineer custom CRM dashboards that automatically capture leads, tag them based on intent, and route them through multi-channel automations—like WhatsApp Virtual Receptionists—closing deals while you sleep[cite: 1, 3].",
    features: [
      "Custom CRM / Admin Dashboard[cite: 1]",
      "Lead pipelines, scoring, tagging, assignment[cite: 1]",
      "WhatsApp automation + Virtual Receptionist integration[cite: 1]",
      "Multi-channel analytics reporting[cite: 1]"
    ]
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    subtitle: "POWERFUL, SCALABLE, AND USER-FRIENDLY.",
    priceRange: "KSH 90,000 – KSH 250,000+",
    accentColor: "#D4970F",
    isPopular: false,
    description: "Bring your business directly to your customers' fingertips. We design and develop powerful Android and iOS applications specifically tailored to your aggressive growth goals, completely supported by ad campaign management and continuous performance monitoring[cite: 1].",
    features: [
      "Develop for both Android and iOS platforms[cite: 1]",
      "Integrate essential business features and APIs[cite: 1]",
      "Ad campaign management (Google + Meta)[cite: 1]",
      "Release regular updates and improvements[cite: 1]"
    ]
  }
];