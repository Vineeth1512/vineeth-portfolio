import React from 'react';
import { resumeData } from '../data/resumeData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { fullName } = resumeData.personalInfo;

  return (
    <footer className="py-8 border-t border-white/5 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-500 font-sans">
        <p>© {currentYear} {fullName}. All rights reserved.</p>
        <p className="font-mono">
          Built with <span className="text-rose-500">♥</span> using React, Tailwind & Framer Motion
        </p>
      </div>
    </footer>
  );
}
