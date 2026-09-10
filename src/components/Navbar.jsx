import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar({ currentTheme, setTheme }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { personalInfo } = resumeData;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projects', label: 'Projects' },
    { id: 'github', label: 'GitHub' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (totalScroll > 0) {
        setScrollProgress(currentScrollY / totalScroll);
      }

      setIsScrolled(currentScrollY > 20);

      if (mobileMenuOpen) {
        setIsVisible(true);
      } else if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Section observer
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-25% 0px -60% 0px',
      threshold: 0,
    });

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at the top */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-black/40 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]"
          style={{ scaleX: scrollProgress, transformOrigin: '0%' }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 theme-nav shadow-xl shadow-black/40 backdrop-blur-xl'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] p-[1.5px] shadow-lg shadow-[var(--primary-glow)]">
              <div className="w-full h-full bg-[#0b0c1b] rounded-[10px] flex items-center justify-center font-mono font-bold text-sm text-[var(--accent)] group-hover:scale-105 transition-transform">
                {personalInfo.fullName
                  .split(' ')
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join('')}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight font-display text-white group-hover:text-[var(--primary)] transition-colors">
                {personalInfo.fullName.split(' ')[0]}
                <span className="text-[var(--accent)]">.dev</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
                Full Stack
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Header Section: Theme Switcher, Socials & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Integrated Theme Switcher */}
            <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />

            {/* GitHub & LinkedIn Icons */}
            <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <FiGithub className="text-base" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <FiLinkedin className="text-base" />
              </a>
            </div>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="relative px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-90 transition-all shadow-md shadow-[var(--primary-glow)] hover:scale-105 cursor-pointer flex items-center gap-1.5"
            >
              <span>Connect</span>
              <FiSend className="text-xs" />
            </button>
          </div>

          {/* Mobile Actions: Theme Switcher & Hamburger */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 w-full bg-[var(--bg-main)]/95 backdrop-blur-2xl border-b border-white/10 py-6 px-6 z-30 lg:hidden flex flex-col gap-5 shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left py-2.5 px-4 rounded-xl text-base font-semibold transition-all ${
                    activeSection === link.id
                      ? 'bg-white/10 text-[var(--accent)] font-bold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 text-slate-300 hover:text-white"
                >
                  <FiGithub className="text-lg" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 text-slate-300 hover:text-white"
                >
                  <FiLinkedin className="text-lg" />
                </a>
              </div>

              <button
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-md"
              >
                Hire {personalInfo.fullName.split(' ')[0]}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
