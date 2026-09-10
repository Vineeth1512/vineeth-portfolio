import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const projects = resumeData.projects;

  const filters = ['All', 'Full Stack', 'Frontend', 'React', 'MERN'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Full Stack') return project.category === 'Full Stack';
    if (activeFilter === 'Frontend') return project.category === 'Frontend';
    if (activeFilter === 'React') return project.tags.includes('React.js') || project.tags.includes('REACT');
    if (activeFilter === 'MERN') return project.tags.includes('MongoDB') && project.tags.includes('Express.js') && project.tags.includes('React.js');
    return true;
  });

  // Abstract gradients for cover placeholders (modern SaaS design)
  const projectGradients = {
    medibook: 'from-blue-600 to-indigo-700',
    'task-manager': 'from-purple-600 to-indigo-700',
    'femme-cart': 'from-rose-500 to-pink-600',
    'cricket-app': 'from-emerald-500 to-teal-600',
    'app-landing-page': 'from-amber-500 to-orange-600'
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col mb-12 items-center text-center">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[var(--accent)] font-sans mb-2">Showcase</span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight font-display">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <div className="h-[2px] w-20 bg-[var(--primary)] mt-4 rounded-full" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hoverable ${
                activeFilter === filter
                  ? 'bg-[var(--primary)] text-white shadow-md shadow-[var(--primary-glow)]'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
              >
                <Tilt
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  perspective={1000}
                  scale={1.01}
                  className="h-full"
                >
                  <div className="group h-full flex flex-col theme-card rounded-3xl border border-white/5 overflow-hidden shadow-xl hover:border-[var(--primary)]/20 transition-all duration-500">
                    
                    {/* Placeholder Cover - Abstract Color Fields */}
                    <div className={`h-40 bg-gradient-to-r ${projectGradients[project.id] || 'from-indigo-600 to-cyan-500'} flex items-center justify-center p-6 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-40" />
                      
                      {/* Abstract Tech Graphic */}
                      <div className="w-11/12 h-4/5 bg-slate-950/80 rounded-xl border border-white/10 backdrop-blur-sm p-4 flex flex-col justify-between font-mono text-[10px] text-slate-400 select-none shadow-2xl translate-y-3 transition-transform duration-500">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-[var(--accent)] font-bold">{project.name}.jsx</span>
                          <span className="text-slate-600 font-semibold">{project.category}</span>
                        </div>
                        <div className="flex-grow flex flex-col justify-center gap-1 py-1 text-slate-300">
                          <div><span className="text-[var(--primary)] font-bold">const</span> techStack = [<span className="text-emerald-400">{project.tags.map(t => `"${t}"`).join(', ')}</span>];</div>
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-[var(--accent)] transition-colors">
                            {project.name}
                          </h3>
                          <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>

                        {/* Bullet Description list directly from Resume */}
                        <div className="space-y-3">
                          <ul className="text-sm text-slate-200 space-y-2.5 list-disc list-inside leading-relaxed font-sans">
                            {project.bullets.map((bullet, idx) => (
                              <li key={idx} className="text-slate-200 font-sans pl-1">
                                <span className="align-middle font-sans">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer: Tags & Links */}
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        {/* Technical Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 text-xs rounded bg-slate-900 border border-white/5 text-slate-300 font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          {project.githubFrontend && project.githubBackend ? (
                            <>
                              <a
                                href={project.githubFrontend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 min-w-[120px] px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 hoverable transition-colors"
                              >
                                <FiGithub className="text-sm" />
                                <span>Frontend</span>
                              </a>
                              <a
                                href={project.githubBackend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 min-w-[120px] px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 hoverable transition-colors"
                              >
                                <FiGithub className="text-sm" />
                                <span>Backend</span>
                              </a>
                            </>
                          ) : (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 hoverable transition-colors"
                            >
                              <FiGithub className="text-sm" />
                              <span>Code Repo</span>
                            </a>
                          )}

                          {project.demo ? (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-bold text-xs flex items-center justify-center gap-2 hoverable hover:opacity-90 transition-opacity"
                            >
                              <span>Live Preview</span>
                              <FiExternalLink className="text-sm" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
