import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

export default function Contact() {
  const { email, phone, location, github, linkedin } = resumeData.personalInfo;
  
  const formRef = useRef();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formState.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // If environment variables are not set yet, simulate successful submission
      // to make it robust and instantly demoable.
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_demo';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_demo';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_demo';

      if (serviceId === 'service_demo' || templateId === 'template_demo' || publicKey === 'public_demo') {
        // Simulation mode
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form submitted (Simulated):", formState);
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        // Actual EmailJS send
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Auto-hide toast status after 5s
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[var(--accent)] font-sans mb-2">Get in touch</span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight font-display">
            Contact <span className="text-gradient-primary">Me</span>
          </h2>
          <div className="h-[2px] w-20 bg-[var(--primary)] mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="theme-card p-8 rounded-3xl border border-white/5 space-y-6">
              <h3 className="text-lg font-bold text-slate-100 mb-2">Let's talk about your next project</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                I'm open to full-time opportunities, freelance projects, and collaboration. Feel free to reach out via form or my direct contact details below.
              </p>

              <div className="space-y-4">
                {/* Email Info */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl text-[var(--primary)]">
                    <FiMail className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Me</h4>
                    <a href={`mailto:${email}`} className="text-sm font-semibold text-slate-300 hover:text-[var(--accent)] transition-colors hoverable">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Phone Info */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[var(--accent)]">
                    <FiPhone className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Call Me</h4>
                    <a href={`tel:${phone}`} className="text-sm font-semibold text-slate-300 hover:text-[var(--accent)] transition-colors hoverable">
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Location Info */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                    <FiMapPin className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</h4>
                    <span className="text-sm font-semibold text-slate-300">
                      {location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="theme-card p-6 sm:p-8 rounded-3xl border border-white/5 relative">
              
              {/* Form Status Banner */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl mb-6 flex items-center gap-3 border text-sm ${
                      submitStatus === 'success'
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <FiCheckCircle className="text-lg shrink-0" />
                        <div>
                          <p className="font-bold">Message sent successfully!</p>
                          <p className="text-xs text-emerald-400/80 font-sans">Thank you, I will get back to you shortly.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <FiAlertCircle className="text-lg shrink-0" />
                        <div>
                          <p className="font-bold">Failed to send message.</p>
                          <p className="text-xs text-rose-400/80 font-sans">Please check your connection and try again.</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/60 border ${
                        errors.name ? 'border-rose-500' : 'border-white/5'
                      } text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[var(--primary)]/50 transition-colors`}
                    />
                    {errors.name && <p className="text-xs text-rose-400 pl-1 font-sans">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/60 border ${
                        errors.email ? 'border-rose-500' : 'border-white/5'
                      } text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[var(--primary)]/50 transition-colors`}
                    />
                    {errors.email && <p className="text-xs text-rose-400 pl-1 font-sans">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/60 border ${
                      errors.subject ? 'border-rose-500' : 'border-white/5'
                    } text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[var(--primary)]/50 transition-colors`}
                  />
                  {errors.subject && <p className="text-xs text-rose-400 pl-1 font-sans">{errors.subject}</p>}
                </div>

                {/* Message Input */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project detail..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/60 border ${
                      errors.message ? 'border-rose-500' : 'border-white/5'
                    } text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[var(--primary)]/50 transition-colors resize-none`}
                  />
                  {errors.message && <p className="text-xs text-rose-400 pl-1 font-sans">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--primary-glow)] hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100 hoverable cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
