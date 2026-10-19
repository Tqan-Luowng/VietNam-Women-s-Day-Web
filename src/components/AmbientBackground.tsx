import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Room Ambient Light Spots */}
      {/* Top warm golden-pink spotlight */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-60 filter blur-[90px]"
        style={{
          background: 'radial-gradient(circle, #FFE5EC 0%, #FFD6E0 45%, transparent 70%)',
        }}
      />

      {/* Left peach glow */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full opacity-40 filter blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #FFCCD5 0%, #FFF0F5 50%, transparent 70%)',
        }}
      />

      {/* Right butter-yellow warm glow */}
      <motion.div
        animate={{
          x: [20, -20, 20],
          y: [15, -15, 15],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full opacity-35 filter blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #FFE8B8 0%, #FFF5EB 50%, transparent 70%)',
        }}
      />

      {/* 3D Perspective Ground Shadow (tabletop illusion) */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl h-[120px] rounded-[100%] opacity-20 filter blur-[40px]"
        style={{
          background: 'radial-gradient(ellipse, #9F6B7E 0%, #D8A4B8 40%, transparent 70%)',
          transform: 'translateX(-50%) rotateX(60deg)',
        }}
      />

      {/* FOREGROUND DEPTH-OF-FIELD (DOF) BLUR AT FOOTER */}
      {/* Optical blur layer that progressively blurs the bottom like a camera macro lens */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 z-20"
        style={{
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,1) 100%)',
          background: 'linear-gradient(to bottom, transparent, rgba(255, 240, 245, 0.45) 50%, rgba(255, 230, 238, 0.8) 100%)',
        }}
      />

      {/* Foreground out-of-focus bokeh orbs floating near camera lens */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          x: [0, 12, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-10 left-10 w-48 h-48 rounded-full filter blur-[28px] opacity-45 z-30"
        style={{
          background: 'radial-gradient(circle, #FFAEC0 0%, #FFD6E0 60%, transparent 80%)',
        }}
      />

      <motion.div
        animate={{
          y: [-10, 10, -10],
          x: [10, -10, 10],
          scale: [1.05, 0.95, 1.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-14 right-8 w-60 h-60 rounded-full filter blur-[32px] opacity-40 z-30"
        style={{
          background: 'radial-gradient(circle, #FFE29A 0%, #FFCCD5 60%, transparent 80%)',
        }}
      />
    </div>
  );
};
