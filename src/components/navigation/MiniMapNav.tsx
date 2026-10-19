import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../../utils/audio';

interface MiniMapNavProps {
  currentProgress: number;
}

export const MiniMapNav: React.FC<MiniMapNavProps> = ({ currentProgress }) => {
  const navItems = [
    {
      id: 'hero',
      label: 'Hộp Quà 20/10',
      shortLabel: '🎁',
      progress: 0.0,
      color: '#E8799A',
    },
    {
      id: 'general-letter',
      label: 'Lời Chúc Chung',
      shortLabel: '📜',
      progress: 0.3,
      color: '#F472B6',
    },
    {
      id: 'members-list',
      label: 'Trạm Yêu Thương',
      shortLabel: '🌸',
      progress: 0.65,
      color: '#FB7185',
    },
    {
      id: 'finale',
      label: 'Gửi Lời Nhắn',
      shortLabel: '💌',
      progress: 0.98,
      color: '#E8799A',
    },
  ];

  const handleScrollTo = (id: string, progress: number) => {
    soundFx.playChime(750);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: progress * maxScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      aria-label="Điều hướng nhanh trang 20/10"
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3 bg-white/80 backdrop-blur-md px-2.5 py-4 rounded-full shadow-soft-pink border-2 border-white/80"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-accentPink/60 mb-0.5" />

      {navItems.map((item) => {
        const isActive = Math.abs(currentProgress - item.progress) < 0.18;

        return (
          <button
            key={item.id}
            onClick={() => handleScrollTo(item.id, item.progress)}
            title={item.label}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
          >
            {/* Tooltip on left */}
            <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-[#2B121C]/90 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-lg border border-white/10 flex items-center gap-1.5">
              <span>{item.shortLabel}</span>
              <span>{item.label}</span>
            </span>

            {/* Dot Indicator */}
            <motion.div
              animate={{
                scale: isActive ? 1.3 : 1,
                borderColor: isActive ? item.color : '#FFB6C8',
                backgroundColor: isActive ? item.color : '#FFFFFF',
              }}
              className="w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center shadow-sm"
            >
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </motion.div>
          </button>
        );
      })}

      <div className="w-1.5 h-1.5 rounded-full bg-accentPink/60 mt-0.5" />
    </nav>
  );
};
