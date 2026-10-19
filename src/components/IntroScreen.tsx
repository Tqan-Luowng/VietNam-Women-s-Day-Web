import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ThreeCanvas } from './ThreeCanvas';
import { Sparkles, Heart, ChevronRight } from 'lucide-react';
import { CuteSticker } from '../assets/stickers/CuteSticker';

interface IntroScreenProps {
  onContinue: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleBoxOpen = () => {
    setIsOpened(true);

    // Launch cheerful pastel confetti
    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD6E0', '#FFB6C8', '#E8799A', '#FFE8B8', '#D4F0E6'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#FF8FA3', '#FFCCD5', '#FFE27A'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#FF8FA3', '#FFCCD5', '#FFE27A'],
        });
      }, 400);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden text-center">
      {/* Background cute stickers */}
      <div className="absolute top-6 left-6 animate-idle-float pointer-events-none">
        <CuteSticker type="flower_cute" size={48} rotation={10} />
      </div>
      <div className="absolute top-10 right-8 animate-idle-float pointer-events-none" style={{ animationDelay: '1.5s' }}>
        <CuteSticker type="strawberry" size={52} rotation={-15} />
      </div>

      {/* Header title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-2 z-10"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-peachPink/30 text-accentPink text-xs md:text-sm font-bold border border-peachPink/40">
          <Sparkles className="w-3.5 h-3.5" /> 20 Tháng 10 - Ngày Phụ Nữ Việt Nam
        </span>
        <h1 className="font-handwriting text-3xl md:text-5xl text-plumText font-bold mt-3">
          Món Quà Ngọt Ngào Dành Tặng Cả Nhà
        </h1>
      </motion.div>

      {/* 3D Canvas with Gift Box */}
      <div className="w-full max-w-lg z-10 my-2">
        <ThreeCanvas onOpenBox={handleBoxOpen} isOpen={isOpened} />
      </div>

      {/* When box opens: Reveal message & CTA */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="z-20 max-w-md bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-card-3d border-2 border-white mx-auto mt-2"
          >
            <div className="flex justify-center mb-2">
              <Heart className="w-8 h-8 text-accentPink fill-accentPink animate-bounce" />
            </div>

            <h2 className="font-handwriting text-2xl md:text-3xl text-accentPink font-bold mb-2">
              Chúc Mừng 20/10!
            </h2>
            <p className="text-sm md:text-base text-plumText/85 mb-5 leading-relaxed">
              Cảm ơn những người phụ nữ tuyệt vời nhất trong cuộc đời tôi. Hãy cùng khám phá từng món quà và thiệp nhắn riêng nhé! 🌸
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-accentPink to-peachPink text-white font-bold text-base shadow-soft-pink flex items-center justify-center gap-2 hover:opacity-95 transition-all"
            >
              <span>Vào Bàn Quà Tặng</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
