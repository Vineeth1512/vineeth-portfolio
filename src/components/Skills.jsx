import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiLayout, FiCpu, FiDatabase, FiServer, FiTool } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

export default function Skills() {
  const { skills } = resumeData;

  const categories = [
    {
      title: 'Front-End Technologies',
      icon: <FiLayout className="text-[var(--accent)] text-2xl" />,
      items: skills.frontend || [],
      glowColor: 'group-hover:border-cyan-500/30'
    },
    {
      title: 'Back-End Technologies',
      icon: <FiCpu className="text-[var(--primary)] text-2xl" />,
      items: skills.backend || [],
      glowColor: 'group-hover:border-[var(--primary)]/30'
    },
    {
      title: 'Libraries & Frameworks',
      icon: <FiServer className="text-emerald-400 text-2xl" />,
      items: skills.libraries || [],
      glowColor: 'group-hover:border-emerald-500/30'
    },
    {
      title: 'Databases',
      icon: <FiDatabase className="text-purple-400 text-2xl" />,
      items: skills.database || [],
      glowColor: 'group-hover:border-purple-500/30'
    },
    {
      title: 'Tools',
      icon: <FiTool className="text-amber-400 text-2xl" />,
      items: skills.tools || [],
      glowColor: 'group-hover:border-amber-500/30'
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[var(--accent)] font-sans mb-2">Capabilities</span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight font-display">
            Technical <span className="text-gradient-primary">Toolbox</span>
          </h2>
          <div className="h-[2px] w-20 bg-[var(--primary)] mt-4 rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={800}
                scale={1.01}
                className="h-full"
              >
                <div className={`group h-full p-6 theme-card rounded-2xl border border-white/5 flex flex-col transition-all duration-300 ${cat.glowColor}`}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                      {cat.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100">{cat.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4 flex-grow">
                    {cat.items.map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-300 font-sans">{item.name}</span>
                          <span className="text-slate-500 font-mono">{item.percentage}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-900/60 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut', delay: i * 0.05 }}
                            className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
