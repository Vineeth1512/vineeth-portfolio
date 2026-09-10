import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiCalendar, FiBook } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

export default function Certifications() {
  const certifications = resumeData.certifications;

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--accent)] font-sans mb-2">Qualifications</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Credentials & <span className="text-gradient-primary">Certificates</span>
          </h2>
          <div className="h-[2px] w-20 bg-[var(--primary)] mt-4 rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group theme-card p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Header Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl text-[var(--primary)] group-hover:scale-110 transition-transform">
                    <FiAward className="text-xl" />
                  </div>
                  {cert.link && cert.link !== '#' && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-white transition-colors hoverable"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {cert.name}
                </h3>
                
                <p className="text-sm font-semibold text-slate-400 flex items-center gap-1.5 mb-4">
                  <FiBook className="text-[var(--primary)] text-xs" />
                  {cert.issuer}
                </p>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-4 pt-4 border-t border-white/5">
                <FiCalendar />
                <span>Issued in {cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
