import React from 'react';
import HomeHero from './HomeHero';
import HomeServicesPreview from './HomeServicesPreview';
import HomeProcessPreview from './HomeProcessPreview';
import HomeClientLogos from './HomeClientLogos';
import HomeCaseStudiesPreview from './HomeCaseStudiesPreview';
import HomeCTA from './HomeCTA';

// Future imports will slot in right here as you build them:


// import HomeClientLogos from './HomeClientLogos';

export default function Home() {
  return (
    // The <main> tag acts as the wrapper for the entire page's content
    <main className="flex flex-col w-full min-h-screen bg-[#021422] text-[#E8EFF5] overflow-x-hidden">
      
      {/* 01. Hero Section */}
      <HomeHero />
      <HomeServicesPreview /> 
      <HomeProcessPreview />
      <HomeClientLogos />
      <HomeCaseStudiesPreview />
      <HomeCTA />
      
      {/* 02. Services Preview (Uncomment when ready) */}
      {/* <HomeServicesPreview /> */}
      
      {/* 03. Process Preview (Uncomment when ready) */}
      {/* <HomeProcessPreview /> */}

    </main>
  );
}