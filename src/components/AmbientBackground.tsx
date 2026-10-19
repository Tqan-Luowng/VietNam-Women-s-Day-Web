import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Lightweight Ambient Base Glow (Works on both mobile & desktop with zero RAM overhead) */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 15%, #FFE5EC 0%, #FFF5F7 60%, transparent 100%)',
        }}
      />

      {/* Desktop-only Rich Animated Bokeh Spots (Hidden on mobile to save RAM & GPU) */}
      <div className="hidden md:block">
        {/* Top warm golden-pink spotlight */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-50 filter blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #FFE5EC 0%, #FFD6E0 45%, transparent 70%)',
          }}
        />

        {/* Left peach glow */}
        <motion.div
          animate={{
            x: [-15, 15, -15],
            y: [-10, 10, -10],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full opacity-35 filter blur-[70px]"
          style={{
            background: 'radial-gradient(circle, #FFCCD5 0%, #FFF0F5 50%, transparent 70%)',
          }}
        />

        {/* Right butter-yellow warm glow */}
        <motion.div
          animate={{
            x: [15, -15, 15],
            y: [10, -10, 10],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-20 w-[360px] h-[360px] rounded-full opacity-30 filter blur-[70px]"
          style={{
            background: 'radial-gradient(circle, #FFE8B8 0%, #FFF5EB 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Soft gradient bottom vignette (clean gradient without heavy GPU backdrop-filter) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255, 240, 245, 0.45) 50%, rgba(255, 230, 238, 0.75) 100%)',
        }}
      />
    </div>
  );
};
