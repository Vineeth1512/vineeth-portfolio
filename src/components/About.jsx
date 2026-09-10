import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

export default function About() {
  const { summary, githubUsername } = resumeData.personalInfo;
  const education = resumeData.education[0];
  const [repoCount, setRepoCount] = useState(18); // Default fallback matching resume stats

  useEffect(() => {
    const fetchRepoCount = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (response.ok) {
          const data = await response.json();
          if (data.public_repos) {
            setRepoCount(data.public_repos);
          }
        }
      } catch (err) {
        console.warn("Could not fetch GitHub repo count, using fallback:", err);
      }
    };
    fetchRepoCount();
  }, [githubUsername]);

  const stats = [
    { label: 'Projects Built', value: '5+', desc: 'Personal & Professional' },
    { label: 'GitHub Repositories', value: repoCount, desc: 'Public repositories' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[var(--accent)] font-sans mb-2">About Me</span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight font-display">
            Discover My <span className="text-gradient-primary">Story</span>
          </h2>
          <div className="h-[2px] w-20 bg-[var(--primary)] mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Summary and Stats */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
                <FiCheckCircle className="text-[var(--primary)]" />
                Professional Summary
              </h3>
              <p className="text-slate-200 leading-relaxed text-sm sm:text-base font-sans">
                {summary}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="theme-card p-6 rounded-2xl flex flex-col justify-between hover:border-[var(--card-hover-border)] transition-all duration-300"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold text-gradient-primary font-mono">
                    {stat.value}
                  </span>
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-slate-100">{stat.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="theme-card p-8 rounded-3xl relative overflow-hidden shadow-xl shadow-black/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-2xl" />
              
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2 mb-6">
                <FiBookOpen className="text-[var(--accent)]" />
                Education
              </h3>

              <div className="relative pl-6 border-l border-[var(--primary)]/30 space-y-2">
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[var(--primary)] shadow-md shadow-[var(--primary-glow)]" />
                
                <span className="text-xs font-mono text-[var(--primary)] font-semibold uppercase">
                  {education.year}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-100">
                  {education.degree}
                </h4>
                <p className="text-sm font-semibold text-slate-300">
                  {education.college}
                </p>
                <p className="text-xs font-semibold text-slate-400">
                  {education.location}
                </p>
                <div className="pt-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] font-mono">
                    CGPA: {education.cgpa}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
