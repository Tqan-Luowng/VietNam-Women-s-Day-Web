import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Member, QuizOption } from '../types';
import { CuteSticker } from '../assets/stickers/CuteSticker';
import confetti from 'canvas-confetti';
import { Award, ArrowLeft, RefreshCw, CheckCircle2, Heart } from 'lucide-react';

interface QuizGameProps {
  member: Member;
  onBackToCard: () => void;
  onBackToPicker: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  member,
  onBackToCard,
  onBackToPicker,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = member.quiz || [];
  const currentQ = questions[currentQIndex];

  const handleSelectOption = (opt: QuizOption) => {
    setSelectedOption(opt);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FFB6C8', '#FFD6E0', '#FFE8B8', '#E8799A'],
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsCompleted(false);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-6 max-w-lg mx-auto">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-4 z-20">
        <button
          onClick={onBackToCard}
          className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-plumText text-xs md:text-sm font-bold shadow-soft-pink border border-peachPink/30 flex items-center gap-1.5 hover:bg-peachPink hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về thiệp của {member.name}</span>
        </button>

        {!isCompleted && (
          <span className="text-xs font-bold text-accentPink bg-white/70 px-3 py-1.5 rounded-full border border-peachPink/20">
            Câu {currentQIndex + 1} / {questions.length}
          </span>
        )}
      </div>

      {/* Main Container */}
      <motion.div
        layout
        className="w-full bg-white/90 backdrop-blur-md rounded-card shadow-card-3d border-4 border-white p-6 md:p-8"
      >
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentQIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Question Header */}
              <div className="text-center pb-2 border-b border-peachPink/20">
                <span className="text-xs text-accentPink font-bold uppercase tracking-wider">
                  Minigame Vui 20/10 🌸
                </span>
                <h3 className="font-handwriting text-2xl md:text-3xl text-plumText font-bold mt-1">
                  {currentQ?.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ?.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-4 rounded-2xl text-left text-sm md:text-base font-semibold border-2 transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-peachPink/20 border-accentPink text-plumText shadow-soft-pink'
                          : 'bg-cream/60 border-peachPink/30 text-plumText/85 hover:bg-cream hover:border-peachPink'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-accentPink shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-peachPink/40 shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Chat Bubble Reply from Author */}
              <AnimatePresence>
                {selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="p-4 rounded-2xl bg-gradient-to-r from-cream to-[#FFF0F5] border border-peachPink/40 shadow-soft-pink relative mt-4"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar or sticker */}
                      <div className="w-10 h-10 rounded-full bg-peachPink/30 border border-white flex items-center justify-center shrink-0">
                        {selectedOption.sticker ? (
                          <CuteSticker type={selectedOption.sticker} size={28} />
                        ) : (
                          <span className="text-lg">💌</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-[11px] font-bold text-accentPink uppercase block">
                          Lời nhắn của em/con:
                        </span>
                        <p className="text-xs md:text-sm text-plumText font-medium mt-0.5 leading-relaxed">
                          {selectedOption.reply}
                        </p>
                      </div>
                    </div>

                    {/* Next Question CTA */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextQuestion}
                      className="w-full mt-4 py-2.5 rounded-xl bg-accentPink text-white font-bold text-xs md:text-sm shadow-sm hover:opacity-95 transition-all"
                    >
                      {currentQIndex < questions.length - 1
                        ? 'Câu tiếp theo ➜'
                        : 'Xem Huy Hiệu Danh Dự 🏆'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* COMPLETED SCREEN WITH BADGE */
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="text-center py-4 space-y-5"
            >
              <div className="w-20 h-20 rounded-full bg-peachPink/30 border-4 border-white flex items-center justify-center mx-auto shadow-soft-pink animate-bounce">
                <Award className="w-10 h-10 text-accentPink" />
              </div>

              <div>
                <span className="text-xs font-bold text-accentPink uppercase tracking-wider">
                  Huy Hiệu Trao Tặng 20/10
                </span>
                <h3 className="font-handwriting text-3xl md:text-4xl text-plumText font-bold mt-1">
                  {member.badge?.title || 'Nữ Hoàng Yêu Thương'}
                </h3>
                <p className="text-xs md:text-sm text-plumText/80 max-w-xs mx-auto mt-2 leading-relaxed">
                  {member.badge?.description ||
                    'Người phụ nữ tuyệt vời, luôn mang lại bình yên và niềm vui cho cả nhà!'}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBackToCard}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-accentPink to-peachPink text-white font-bold text-sm shadow-soft-pink hover:opacity-95 transition-all"
                >
                  Xem Lại Thiệp Của {member.name} 🌸
                </motion.button>

                <div className="flex gap-2">
                  <button
                    onClick={handleRestart}
                    className="flex-1 py-2.5 rounded-2xl bg-cream border border-peachPink/40 text-plumText text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-peachPink/20 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-accentPink" />
                    <span>Làm lại</span>
                  </button>
                  <button
                    onClick={onBackToPicker}
                    className="flex-1 py-2.5 rounded-2xl bg-cream border border-peachPink/40 text-plumText text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-peachPink/20 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 text-accentPink" />
                    <span>Chọn người khác</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
