import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  // Position of the mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring settings for the trailing ring
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.6 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.classList?.contains('clickable') ||
        target.closest('.clickable') ||
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA';
        
      if (isClickable) {
        setHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      setHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Apply global CSS class to body when cursor is enabled (for custom-cursor-active)
    if (window.innerWidth >= 1024) {
      document.body.classList.add('custom-cursor-active');
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, hidden]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Central Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--primary)] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--primary)] pointer-events-none z-50 mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
          backgroundColor: hovered ? 'var(--primary-glow)' : 'transparent',
          borderColor: hovered ? 'var(--accent)' : 'var(--primary)',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />
    </>
  );
}
