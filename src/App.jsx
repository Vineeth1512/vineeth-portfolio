import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Layout Components
import Navbar from './components/Navbar';
import AnimatedCursor from './components/AnimatedCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import GithubShowcase from './components/GithubShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { resumeData } from './data/resumeData';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Theme Management (4-palette dynamic theme engine)
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'nebula';
  });

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('portfolio_theme', themeId);
  };

  // Sync theme on initial load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Preloader progress count
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600); // Hold at 100% briefly before fading out
          return 100;
        }
        // Increment randomly for natural feel
        const increment = Math.floor(Math.random() * 12) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <>
      {/* Animated Custom Cursor */}
      <AnimatedCursor />

      {/* Dynamic Ambient Glow Mesh */}
      <div className="ambient-mesh">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          /* Premium Preloading Screen */
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-full bg-[var(--bg-main)] z-50 flex flex-col items-center justify-center font-mono select-none"
          >
            <div className="space-y-6 text-center max-w-xs w-full px-6">
              {/* Logo / Brand reveal */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold font-display text-gradient-primary"
              >
                &lt;{resumeData.personalInfo.fullName.split(' ')[0]}.{resumeData.personalInfo.fullName.split(' ').slice(-1)[0][0]} /&gt;
              </motion.div>

              {/* Progress Count */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5 text-[var(--accent)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                    INITIALIZING STACK
                  </span>
                  <span className="font-mono">{loadingProgress}%</span>
                </div>
                {/* Progress bar */}
                <div className="h-[2px] w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] transition-all duration-100 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>

              {/* Scanning status sub-text */}
              <div className="text-[10px] text-slate-500 h-4 uppercase tracking-widest">
                {loadingProgress < 30 && 'Connecting databases...'}
                {loadingProgress >= 30 && loadingProgress < 60 && 'Bundling React components...'}
                {loadingProgress >= 60 && loadingProgress < 90 && 'Compiling API routes...'}
                {loadingProgress >= 90 && 'Ready to showcase.'}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Main Application Page */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen text-slate-100 selection:bg-[var(--primary)]/30 selection:text-white"
          >
            {/* Header / Nav with integrated theme switcher */}
            <Navbar currentTheme={currentTheme} setTheme={handleThemeChange} />

            {/* Core Sections */}
            <main>
              {/* Hero */}
              <Hero />

              {/* About & Education */}
              <About />

              {/* Technical Skills */}
              <Skills />

              {/* Experience Timeline */}
              <Experience />

              {/* Certifications */}
              <Certifications />

              {/* Projects Filter Showcase */}
              <Projects />

              {/* GitHub API Info */}
              <GithubShowcase />

              {/* Glassmorphic Contact Form */}
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
