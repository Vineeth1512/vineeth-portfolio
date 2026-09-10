import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSliders, FiCheck } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

export const THEMES = [
  {
    id: 'nebula',
    name: 'Nebula Violet',
    primaryColor: '#8b5cf6',
    secondaryColor: '#06b6d4',
    bgPreview: '#070711',
    description: 'Cosmic purple & neon cyan'
  },
  {
    id: 'emerald',
    name: 'Cyber Emerald',
    primaryColor: '#10b981',
    secondaryColor: '#34d399',
    bgPreview: '#040c08',
    description: 'Matrix terminal & neon mint'
  },
  {
    id: 'sapphire',
    name: 'Midnight Sapphire',
    primaryColor: '#06b6d4',
    secondaryColor: '#2563eb',
    bgPreview: '#050a14',
    description: 'Deep ocean abyss & cobalt'
  },
  {
    id: 'solar',
    name: 'Solar Amber',
    primaryColor: '#f59e0b',
    secondaryColor: '#ea580c',
    bgPreview: '#0d0806',
    description: 'Warm sunset & fiery amber'
  }
];

export default function ThemeSwitcher({ currentTheme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  const handleSelectTheme = (themeId) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Theme Palette"
        className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-sm cursor-pointer"
      >
        {/* Animated Glow Dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: activeThemeObj.primaryColor }}
          />
          <span
            className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-sm"
            style={{ backgroundColor: activeThemeObj.primaryColor }}
          />
        </span>

        {/* Theme Name (desktop) */}
        <span className="hidden sm:inline text-xs font-semibold tracking-wide text-slate-300 group-hover:text-white transition-colors">
          {activeThemeObj.name}
        </span>

        {/* Small Icon */}
        <HiSparkles 
          className="text-xs transition-transform duration-300 group-hover:rotate-45"
          style={{ color: activeThemeObj.primaryColor }}
        />
      </button>

      {/* Floating Theme Palette Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 p-3 rounded-2xl bg-[#0b0c1b]/95 border border-white/15 backdrop-blur-2xl shadow-2xl shadow-black/80 z-50 space-y-1.5"
          >
            <div className="flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5">
                <FiSliders className="text-xs" /> Dynamic Themes
              </span>
              <span className="text-[10px] text-slate-500 font-mono">4 PALETTES</span>
            </div>

            <div className="space-y-1 pt-1">
              {THEMES.map((theme) => {
                const isSelected = theme.id === currentTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border border-white/20'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Theme color previews */}
                      <div
                        className="w-7 h-7 rounded-lg border border-white/20 flex items-center justify-center relative overflow-hidden shadow-inner shrink-0"
                        style={{ backgroundColor: theme.bgPreview }}
                      >
                        <div
                          className="w-3 h-3 rounded-full absolute -top-0.5 -left-0.5 shadow-sm"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <div
                          className="w-3 h-3 rounded-full absolute -bottom-0.5 -right-0.5 shadow-sm"
                          style={{ backgroundColor: theme.secondaryColor }}
                        />
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          {theme.name}
                        </div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">
                          {theme.description}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <FiCheck
                        className="text-sm shrink-0"
                        style={{ color: theme.primaryColor }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
