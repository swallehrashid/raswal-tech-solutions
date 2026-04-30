/**
 * Raswal Tech Solutions - Core Services Data
 * Location: src/data/services.js
 * Description: Single source of truth for service offerings, featuring premium 
 * conversion-focused copywriting and built-in SEO question integration.
 */

export const servicesData = [
  {
    id: "web-design",
    title: "Web Design",
    subtitle: "SLEEK, MODERN, AND USER-FOCUSED WEBSITE DESIGNS",
    icon: "LayoutTemplate", // Maps to lucide-react or similar icon library
    description: "Create a lasting first impression with modern, visually appealing, and user-focused website designs that represent your brand and engage your audience[cite: 1]. While web development handles the technical engine, web design focuses on the brand-focused visuals, intuitive user flows, and conversion-driven layouts that encourage visitors to take action[cite: 1, 3].",
    features: [
      "Conduct user research and experience mapping[cite: 1]",
      "Align visual themes with your brand strategy[cite: 1]",
      "Strategically place calls-to-action (CTAs)[cite: 1]"
    ],
    accentColor: "cyan" // References --color-cyan: #3A95C2
  },
  {
    id: "web-development",
    title: "Web Development",
    subtitle: "HIGH-PERFORMANCE, SECURE, AND SCALABLE WEBSITES",
    icon: "CodeXml", 
    description: "We build high-performance websites using the latest technologies—fast, secure, and responsive across all devices[cite: 1]. To understand the difference between web design and web development, think of development as the robust server-side systems and fast front-end code that bring the visual design to life[cite: 1, 3]. These advanced systems act as automated business engines, specifically designed to help you get more customers and generate leads seamlessly[cite: 1, 3].",
    features: [
      "Optimize for speed and browser compatibility[cite: 1]",
      "Develop scalable APIs and server logic[cite: 1]",
      "Implement authentication and data protection[cite: 1]"
    ],
    accentColor: "orange" // References --color-orange: #D4970F
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    subtitle: "POWERFUL, SCALABLE, AND USER-FRIENDLY MOBILE APPLICATIONS",
    icon: "Smartphone",
    description: "Bring your business to your customers' fingertips. We design and develop powerful Android and iOS applications tailored to your goals[cite: 1]. Clients frequently ask how long it takes to build and launch a mobile application; by streamlining our process through thorough requirement analysis, responsive interface design, and rigorous load testing, we deliver secure, high-performance apps rapidly without sacrificing world-class quality[cite: 1, 3].",
    features: [
      "Develop for both Android and iOS platforms[cite: 1]",
      "Optimize app architecture for performance[cite: 1]",
      "Assist with app store submission and optimization[cite: 1]"
    ],
    accentColor: "cyan"
  }
];