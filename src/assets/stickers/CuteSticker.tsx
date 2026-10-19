import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type StickerType =
  | 'strawberry'
  | 'tea'
  | 'cake'
  | 'boba'
  | 'donut'
  | 'icecream'
  | 'dango'
  | 'sushi'
  | 'fruit'
  | 'mochi'
  | 'coffee'
  | 'bear'
  | 'bunny'
  | 'flower_cute'
  | 'bear_flower';

interface CuteStickerProps {
  type: StickerType | string;
  size?: number;
  className?: string;
  rotation?: number;
  onClick?: () => void;
}

export const CuteSticker: React.FC<CuteStickerProps> = ({
  type,
  size = 64,
  className = '',
  rotation = 0,
  onClick,
}) => {
  const [popped, setPopped] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleTap = () => {
    setPopped(true);
    const newHearts = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 40,
      y: -30 - Math.random() * 30,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => setPopped(false), 400);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 900);

    if (onClick) onClick();
  };

  const renderSvg = () => {
    switch (type) {
      case 'strawberry':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <path d="M50 15 C30 15 15 35 20 65 C25 88 50 95 50 95 C50 95 75 88 80 65 C85 35 70 15 50 15 Z" fill="#FF4D6D" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M50 8 C42 16 30 12 30 12 C38 22 50 22 50 22 C50 22 62 22 70 12 C70 12 58 16 50 8 Z" fill="#52B788" stroke="#FFFFFF" strokeWidth="4" />
            {/* Seeds */}
            <circle cx="35" cy="40" r="2.5" fill="#FFE27A" />
            <circle cx="50" cy="35" r="2.5" fill="#FFE27A" />
            <circle cx="65" cy="40" r="2.5" fill="#FFE27A" />
            <circle cx="42" cy="55" r="2.5" fill="#FFE27A" />
            <circle cx="58" cy="55" r="2.5" fill="#FFE27A" />
            <circle cx="50" cy="72" r="2.5" fill="#FFE27A" />
            {/* Cute Kawaii Eyes and Smile */}
            <circle cx="43" cy="45" r="3" fill="#2B2D42" />
            <circle cx="57" cy="45" r="3" fill="#2B2D42" />
            <circle cx="38" cy="50" r="3" fill="#FFAEC0" opacity="0.8" />
            <circle cx="62" cy="50" r="3" fill="#FFAEC0" opacity="0.8" />
            <path d="M47 50 Q50 54 53 50" stroke="#2B2D42" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'boba':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <rect x="25" y="28" width="50" height="60" rx="14" fill="#FDE2E4" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M25 45 L75 45 L75 75 C75 82 69 88 61 88 L39 88 C31 88 25 82 25 75 Z" fill="#FFCCD5" />
            {/* Lid & Straw */}
            <rect x="20" y="24" width="60" height="8" rx="4" fill="#E8799A" stroke="#FFFFFF" strokeWidth="3" />
            <rect x="52" y="6" width="8" height="24" rx="4" fill="#FF8FA3" transform="rotate(10 52 6)" stroke="#FFFFFF" strokeWidth="2" />
            {/* Pearls */}
            <circle cx="38" cy="76" r="4.5" fill="#5A3A45" />
            <circle cx="50" cy="78" r="4.5" fill="#5A3A45" />
            <circle cx="62" cy="76" r="4.5" fill="#5A3A45" />
            <circle cx="44" cy="67" r="4.5" fill="#5A3A45" />
            <circle cx="56" cy="67" r="4.5" fill="#5A3A45" />
            {/* Face */}
            <circle cx="42" cy="52" r="2.5" fill="#5A3A45" />
            <circle cx="58" cy="52" r="2.5" fill="#5A3A45" />
            <ellipse cx="36" cy="55" rx="3" ry="2" fill="#FF758F" opacity="0.7" />
            <ellipse cx="64" cy="55" rx="3" ry="2" fill="#FF758F" opacity="0.7" />
            <path d="M48 54 Q50 58 52 54" stroke="#5A3A45" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'cake':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* Cake slice */}
            <path d="M15 70 L50 25 L85 70 C85 80 15 80 15 70 Z" fill="#FFE5EC" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M15 70 C25 65 35 75 50 68 C65 75 75 65 85 70 L85 78 C85 85 15 85 15 78 Z" fill="#F472B6" />
            {/* Cream top */}
            <circle cx="50" cy="22" r="10" fill="#FF4D6D" stroke="#FFFFFF" strokeWidth="3" />
            <path d="M48 10 Q50 5 52 10" stroke="#52B788" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Face */}
            <circle cx="42" cy="50" r="3" fill="#5A3A45" />
            <circle cx="58" cy="50" r="3" fill="#5A3A45" />
            <circle cx="36" cy="54" r="3" fill="#FF8FA3" opacity="0.8" />
            <circle cx="64" cy="54" r="3" fill="#FF8FA3" opacity="0.8" />
            <path d="M48 53 Q50 57 52 53" stroke="#5A3A45" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'donut':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <circle cx="50" cy="50" r="38" fill="#FCD34D" stroke="#FFFFFF" strokeWidth="6" />
            {/* Frosting */}
            <path d="M50 16 C65 16 80 28 80 48 C78 52 72 52 70 48 C68 44 62 45 60 50 C58 55 52 54 50 50 C48 46 42 47 40 52 C38 56 32 55 30 50 C28 45 22 46 20 50 C20 30 35 16 50 16 Z" fill="#F472B6" />
            <circle cx="50" cy="50" r="14" fill="#FFF5F7" stroke="#FFFFFF" strokeWidth="5" />
            {/* Sprinkles */}
            <rect x="35" y="25" width="6" height="2" rx="1" fill="#60A5FA" transform="rotate(20 35 25)" />
            <rect x="58" y="24" width="6" height="2" rx="1" fill="#34D399" transform="rotate(-30 58 24)" />
            <rect x="68" y="38" width="6" height="2" rx="1" fill="#FBBF24" transform="rotate(45 68 38)" />
            <rect x="25" y="36" width="6" height="2" rx="1" fill="#A78BFA" transform="rotate(-15 25 36)" />
          </svg>
        );

      case 'icecream':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* Waffle cone */}
            <path d="M30 45 L50 92 L70 45 Z" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="38" y1="55" x2="60" y2="75" stroke="#D97706" strokeWidth="1.5" />
            <line x1="62" y1="55" x2="40" y2="75" stroke="#D97706" strokeWidth="1.5" />
            {/* Scoop */}
            <circle cx="50" cy="40" r="26" fill="#F472B6" stroke="#FFFFFF" strokeWidth="6" />
            {/* Cherry */}
            <circle cx="50" cy="14" r="8" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3" />
            {/* Face */}
            <circle cx="43" cy="38" r="2.5" fill="#3E2723" />
            <circle cx="57" cy="38" r="2.5" fill="#3E2723" />
            <ellipse cx="37" cy="42" rx="3" ry="2" fill="#FDA4AF" />
            <ellipse cx="63" cy="42" rx="3" ry="2" fill="#FDA4AF" />
            <path d="M48 42 Q50 45 52 42" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'bear':
      case 'bear_flower':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* Ears */}
            <circle cx="28" cy="30" r="14" fill="#D7A987" stroke="#FFFFFF" strokeWidth="5" />
            <circle cx="28" cy="30" r="7" fill="#FBCFE8" />
            <circle cx="72" cy="30" r="14" fill="#D7A987" stroke="#FFFFFF" strokeWidth="5" />
            <circle cx="72" cy="30" r="7" fill="#FBCFE8" />
            {/* Head */}
            <ellipse cx="50" cy="55" rx="36" ry="32" fill="#E8BFA1" stroke="#FFFFFF" strokeWidth="6" />
            {/* Snout */}
            <ellipse cx="50" cy="62" rx="14" ry="10" fill="#FFF" />
            <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#4A303A" />
            <path d="M50 62 L50 67 M46 66 Q50 69 54 66" stroke="#4A303A" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Eyes */}
            <circle cx="36" cy="52" r="3.5" fill="#4A303A" />
            <circle cx="64" cy="52" r="3.5" fill="#4A303A" />
            {/* Cheeks */}
            <circle cx="30" cy="60" r="5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="70" cy="60" r="5" fill="#FDA4AF" opacity="0.8" />
            {/* Optional flower */}
            {type === 'bear_flower' && (
              <circle cx="72" cy="22" r="8" fill="#F472B6" stroke="#FFFFFF" strokeWidth="3" />
            )}
          </svg>
        );

      case 'bunny':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* Ears */}
            <ellipse cx="36" cy="26" rx="9" ry="22" fill="#FFFFFF" stroke="#F472B6" strokeWidth="4" />
            <ellipse cx="36" cy="26" rx="4" ry="14" fill="#FCE7F3" />
            <ellipse cx="64" cy="26" rx="9" ry="22" fill="#FFFFFF" stroke="#F472B6" strokeWidth="4" />
            <ellipse cx="64" cy="26" rx="4" ry="14" fill="#FCE7F3" />
            {/* Face */}
            <ellipse cx="50" cy="62" rx="34" ry="30" fill="#FFFFFF" stroke="#F472B6" strokeWidth="5" />
            {/* Eyes */}
            <circle cx="38" cy="58" r="3.5" fill="#831843" />
            <circle cx="62" cy="58" r="3.5" fill="#831843" />
            <ellipse cx="30" cy="66" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
            <ellipse cx="70" cy="66" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
            {/* Nose & mouth */}
            <polygon points="50,65 47,62 53,62" fill="#FB7185" />
            <path d="M47 67 Q50 70 53 67" stroke="#831843" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'flower_cute':
      default:
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* Petals */}
            <circle cx="50" cy="28" r="14" fill="#FFB6C8" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="72" cy="50" r="14" fill="#FFB6C8" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="50" cy="72" r="14" fill="#FFB6C8" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="28" cy="50" r="14" fill="#FFB6C8" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="34" cy="34" r="14" fill="#FFD6E0" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="66" cy="34" r="14" fill="#FFD6E0" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="66" cy="66" r="14" fill="#FFD6E0" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="34" cy="66" r="14" fill="#FFD6E0" stroke="#FFFFFF" strokeWidth="4" />
            {/* Center */}
            <circle cx="50" cy="50" r="16" fill="#FDE047" stroke="#FFFFFF" strokeWidth="4" />
            {/* Smile face */}
            <circle cx="44" cy="48" r="2" fill="#5A3A45" />
            <circle cx="56" cy="48" r="2" fill="#5A3A45" />
            <path d="M46 53 Q50 57 54 53" stroke="#5A3A45" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative inline-block select-none cursor-pointer ${className}`} onClick={handleTap}>
      <motion.div
        animate={{
          scale: popped ? 1.35 : 1,
          rotate: popped ? rotation + (Math.random() > 0.5 ? 18 : -18) : rotation,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 15,
        }}
        whileHover={{
          scale: 1.15,
          rotate: rotation + 6,
          transition: { type: 'spring', stiffness: 300, damping: 10 },
        }}
        className="filter drop-shadow-md"
      >
        {renderSvg()}
      </motion.div>

      {/* Floating hearts on tap */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, x: h.x, y: h.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 pointer-events-none text-base"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            🌸
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
