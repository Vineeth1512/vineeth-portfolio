import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiDownload,
} from "react-icons/fi";
import Tilt from "react-parallax-tilt";
import { resumeData } from "../data/resumeData";
import profileImg from "../assets/developer_profile.jpeg";

export default function Hero() {
  const { fullName, titles, email, github, linkedin, phone } =
    resumeData.personalInfo;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const codeString = `const developer = {
  name: "${fullName}",
  stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
  role: "Full Stack Engineer",
  location: "Hyderabad, India",
  hireable: true,
  code: () => {
    return "Building clean, scalable full-stack web applications";
  }
};`;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background Interactive Light Mesh */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs lg:text-sm uppercase tracking-[0.3em] font-bold text-[var(--accent)] font-sans"
          >
            Welcome to my creative space
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-tight"
          >
            Hi, I'm <br />
            <span className="text-gradient-primary block mt-1.5 relative">
              {fullName}
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="h-10 sm:h-12 flex items-center text-xl sm:text-3xl text-slate-300 font-bold font-display"
          >
            <span className="mr-2">I am a</span>
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1800,
                "MERN Stack Developer",
                1800,
                "Full Stack Engineer",
                1800,
                "MERN Stack Specialist",
                1800,
                "Backend Developer",
                1800,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-[var(--primary)] font-mono font-bold"
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-slate-200 text-sm sm:text-lg max-w-xl leading-relaxed font-sans"
          >
            {resumeData.personalInfo.summary}
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 text-slate-400"
          >
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors p-2 theme-card rounded-full text-lg hoverable"
            >
              <FiGithub />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors p-2 theme-card rounded-full text-lg hoverable"
            >
              <FiLinkedin />
            </a>
            <a
              href={`mailto:${email}`}
              className="hover:text-[var(--accent)] transition-colors p-2 theme-card rounded-full text-lg hoverable"
            >
              <FiMail />
            </a>
            <a
              href={`tel:${phone}`}
              className="hover:text-[var(--accent)] transition-colors p-2 theme-card rounded-full text-lg hoverable"
            >
              <FiPhone />
            </a>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-medium text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--primary-glow)] hover:scale-105 transition-all duration-300 hoverable"
            >
              <span>View Projects</span>
              <FiArrowRight />
            </button>

            <a
              href={`mailto:${email}`}
              className="px-6 py-3 rounded-full theme-card hover:bg-white/5 border border-white/10 text-slate-200 font-medium text-sm transition-all duration-300 hoverable flex items-center gap-2"
            >
              <span>Hire Me</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-slate-400 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors hoverable"
            >
              <FiDownload />
              <span>Resume</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right column: Image & Code Card Layered Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="lg:col-span-5 flex justify-center items-center relative h-[450px] w-full"
        >
          {/* Ambient Glow */}
          <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-[var(--primary)]/20 to-cyan-500/20 rounded-full blur-[80px] -z-10" />

          {/* Back Layer: Mini Code IDE Card */}
          <div className="absolute -left-4 bottom-4 w-72 hidden sm:block z-10 opacity-70 hover:opacity-100 transition-opacity duration-300">
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={800}
              scale={1}
              className="w-full"
            >
              <div className="w-full theme-card rounded-xl border border-white/5 overflow-hidden shadow-xl shadow-black/40">
                <div className="bg-slate-950/70 px-3 py-1.5 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500/60" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono">
                    info.js
                  </div>
                </div>
                <div className="p-3.5 font-mono text-[10px] leading-relaxed text-slate-300 select-none">
                  <span className="text-pink-400">const</span>{" "}
                  <span className="text-[var(--accent)]">stack</span> = [<br />
                  &nbsp;&nbsp;<span className="text-emerald-400">
                    "React"
                  </span>, <span className="text-emerald-400">"Node.js"</span>,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-emerald-400">"Express"</span>,{" "}
                  <span className="text-emerald-400">"MongoDB"</span>
                  <br />
                  ];
                </div>
              </div>
            </Tilt>
          </div>

          {/* Front Layer: Profile Photo Card */}
          <div className="absolute z-20 w-[280px] sm:w-[320px]">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
            >
              <div className="relative group overflow-hidden rounded-3xl border border-white/10 p-2 bg-slate-950/40 backdrop-blur-md shadow-2xl shadow-black/60 glow-border">
                {/* Photo Element */}
                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-900 relative">
                  <img
                    src={profileImg}
                    alt={fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle glass overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-65" />

                  {/* Name badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--accent)] block mb-0.5">
                      Full Stack Developer
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {fullName}
                    </h3>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs uppercase tracking-widest font-medium">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center p-1"
        >
          <div className="w-1.5 h-2 bg-[var(--primary)] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
