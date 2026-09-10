import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiFolder, FiExternalLink, FiUsers } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

export default function GithubShowcase() {
  const { githubUsername } = resumeData.personalInfo;
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data if GitHub API rate-limits
  const fallbackProfile = {
    followers: 12,
    following: 15,
    public_repos: 18,
    avatar_url: 'https://avatars.githubusercontent.com/u/124707248?v=4'
  };

  const fallbackRepos = [
    {
      name: 'Blood Donation App',
      description: 'A web application connecting blood donors and patients with Firebase Authentication and Firestore.',
      stargazers_count: 0,
      forks_count: 0,
      language: 'JavaScript',
      html_url: 'https://github.com/Vineeth1512'
    },
    {
      name: 'Dairy Farm Application',
      description: 'Dairy Farm Management System for tracking animals, milk production, and dairy product sales.',
      stargazers_count: 0,
      forks_count: 0,
      language: 'JavaScript',
      html_url: 'https://github.com/Vineeth1512'
    },
    {
      name: 'SparkChat',
      description: 'Real-time chat application built with React and Node.js, using WebSockets and JWT authentication.',
      stargazers_count: 0,
      forks_count: 0,
      language: 'JavaScript',
      html_url: 'https://github.com/Vineeth1512'
    },
    {
      name: 'Quiz Hut',
      description: 'An online quiz platform built with the MERN stack featuring authentication and role-based access.',
      stargazers_count: 0,
      forks_count: 0,
      language: 'JavaScript',
      html_url: 'https://github.com/Vineeth1512'
    }
  ];

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        // Fetch Profile
        const profileRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        } else {
          setProfile(fallbackProfile);
        }

        // Fetch Repos
        const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          // Filter out forks if any, and slice top 4
          const filtered = reposData
            .filter(r => !r.fork)
            .slice(0, 4);
          setRepos(filtered.length > 0 ? filtered : fallbackRepos);
        } else {
          setRepos(fallbackRepos);
        }
      } catch (err) {
        console.warn("GitHub API error, using fallback data:", err);
        setProfile(fallbackProfile);
        setRepos(fallbackRepos);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [githubUsername]);

  // Generate mock contribution grid colors (52 columns for weeks, 7 rows for days)
  // Standard GitHub contribution colors: empty, light green, medium green, dark green
  const contribColors = [
    'bg-slate-900', // 0 contributions
    'bg-emerald-950', // 1-2 contributions
    'bg-emerald-800', // 3-4 contributions
    'bg-emerald-600', // 5-6 contributions
    'bg-emerald-400', // 7+ contributions
  ];

  // Simulated grid data
  const gridCells = Array.from({ length: 140 }, (_, i) => {
    // Generate a pseudo-random intensity distribution that looks natural
    const rand = Math.sin(i * 0.15) * Math.cos(i * 0.05);
    let colorIdx = 0;
    if (rand > 0.6) colorIdx = 4;
    else if (rand > 0.2) colorIdx = 3;
    else if (rand > -0.2) colorIdx = 2;
    else if (rand > -0.6) colorIdx = 1;
    return contribColors[colorIdx];
  });

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-slate-950/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[var(--accent)] font-sans mb-2">Open Source</span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight font-display">
            GitHub <span className="text-gradient-primary">Showcase</span>
          </h2>
          <div className="h-[2px] w-20 bg-[var(--primary)] mt-4 rounded-full" />
        </div>

        {/* Profile Stats Bar */}
        <div className="theme-card p-6 sm:p-8 rounded-3xl border border-white/5 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img
              src={profile?.avatar_url || fallbackProfile.avatar_url}
              alt="GitHub Avatar"
              className="w-16 h-16 rounded-full border-2 border-[var(--primary)]/30 shadow-md shadow-[var(--primary-glow)]"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-1.5">
                @{githubUsername}
              </h3>
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 hover:underline hoverable"
              >
                <span>View profile on GitHub</span>
                <FiExternalLink />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-8 text-center">
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[var(--primary)] font-mono">
                {profile?.followers !== undefined ? profile.followers : fallbackProfile.followers}
              </span>
              <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <FiUsers className="inline" /> Followers
              </p>
            </div>
            <div className="h-8 w-[1px] bg-white/5" />
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[var(--accent)] font-mono">
                {profile?.public_repos !== undefined ? profile.public_repos : fallbackProfile.public_repos}
              </span>
              <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <FiFolder className="inline" /> Repositories
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: contribution graph */}
          <div className="lg:col-span-8 space-y-6">
            <div className="theme-card p-6 rounded-3xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-200">Contribution History</h4>
                <span className="text-[10px] text-slate-500 font-semibold font-mono">Simulated Activity</span>
              </div>
              
              {/* Grid Wrapper */}
              <div className="overflow-x-auto pb-2">
                <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[500px]">
                  {gridCells.map((color, idx) => (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-sm transition-colors duration-300 hover:scale-125 ${color}`}
                      title={`Activity index: ${idx}`}
                    />
                  ))}
                </div>
              </div>

              {/* Grid Legend */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>Less</span>
                <div className="flex gap-1 items-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-900" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-800" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Repos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-40 theme-card rounded-2xl animate-pulse" />
                ))
              ) : (
                repos.map((repo, idx) => (
                  <a
                    key={idx}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group theme-card p-6 rounded-2xl border border-white/5 hover:border-[var(--primary)]/20 hover:scale-[1.01] transition-all flex flex-col justify-between h-40 hoverable"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h4 className="text-base font-bold text-slate-200 group-hover:text-[var(--accent)] transition-colors truncate">
                          {repo.name}
                        </h4>
                        <FiGithub className="text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                        {repo.description || 'No description provided.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                        {repo.language || 'JavaScript'}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FiStar /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiGitBranch /> {repo.forks_count || 0}
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Readme Stats Cards using standard SVG widgets */}
          <div className="lg:col-span-4 space-y-6">
            <div className="theme-card p-4 rounded-3xl border border-white/5 space-y-4">
              <h4 className="text-sm font-bold text-slate-200 pl-2">GitHub Stats Card</h4>
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=03001400`}
                alt="GitHub Stats"
                className="w-full rounded-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=tokyonight&hide_border=true&bg_color=03001400`}
                alt="Top Languages"
                className="w-full rounded-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
