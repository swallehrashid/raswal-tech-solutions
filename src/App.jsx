import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Import your premium global components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
 

export default function App() {
  return (
    // UPGRADE: Added 'flex' and 'flex-col' to turn the app into a vertical flex container
    <div className="flex flex-col min-h-screen bg-[#021422] font-['Barlow']">
      <Router>
        {/* 2. Global Navbar */}
        <Navbar />
        
        {/* 3. UPGRADE: Added 'flex-grow' to push the footer to the bottom of the screen */}
        <main className="flex-grow w-full relative z-10 bg-[#021422] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add your other routes here */}
          </Routes>
        </main>

        {/* 4. Global Footer - Now perfectly anchored to the bottom */}
        <Footer />

      </Router>
    </div>
  );
}