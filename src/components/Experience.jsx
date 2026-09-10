import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

export default function Experience() {
  const timelineData = resumeData.experience;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[var(--accent)] font-sans mb-2">Journey</span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight font-display">
            Work <span className="text-gradient-primary">Experience</span>
          </h2>
          <div className="h-[2px] w-20 bg-[var(--primary)] mt-4 rounded-full" />
        </div>

        {/* Timeline Line */}
        <div className="relative border-l-2 border-[var(--primary)]/20 pl-8 ml-4 sm:ml-8 space-y-12">
          {timelineData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Dot Icon */}
              <div className="absolute -left-[43px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-[var(--primary)] flex items-center justify-center shadow-lg shadow-[var(--primary-glow)]">
                <FiBriefcase className="text-[var(--primary)] text-xs" />
              </div>

              {/* Experience Card */}
              <div className="theme-card p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] uppercase">
                      Professional
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 mt-2">{exp.role}</h3>
                    <h4 className="text-base text-[var(--accent)] font-semibold">{exp.company}</h4>
                  </div>
                  
                  {/* Meta items (Date, Place) */}
                  <div className="flex flex-col gap-1 text-xs text-slate-300 font-semibold font-sans">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="text-[var(--primary)]" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiMapPin className="text-[var(--primary)]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Duties */}
                <ul className="space-y-2.5 mb-6 text-sm text-slate-200 leading-relaxed font-sans list-disc list-inside">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="pl-1">
                      <span className="text-slate-200 font-sans">{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-full bg-slate-900 border border-white/5 text-slate-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
