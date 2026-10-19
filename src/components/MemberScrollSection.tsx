import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Member, QuizOption } from '../types';
import { CuteSticker } from '../assets/stickers/CuteSticker';
import FlipCard from './FlipCard/FlipCard';
import {
  Gamepad2,
  Sparkles,
  Award,
  CheckCircle2,
  RefreshCw,
  Heart,
  RotateCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemberScrollSectionProps {
  member: Member;
  index: number;
}

export const MemberScrollSection: React.FC<MemberScrollSectionProps> = ({
  member,
  index,
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
      setQuizCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#FFB6C8', '#FFD6E0', '#FFE8B8', '#E8799A', member.accentColor],
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  };

  // Content for Front of FlipCard
  const frontContent = (
    <div className="w-full h-full p-6 md:p-7 flex flex-col justify-between text-left relative overflow-hidden bg-white">
      {/* Top Washi Tape */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-sm opacity-85 shadow-sm"
        style={{ backgroundColor: member.accentColor }}
      />

      {/* Header */}
      <div className="flex items-start justify-between border-b border-peachPink/20 pb-2.5 pt-2">
        <div>
          <span className="text-xs font-semibold text-accentPink">
            Thương gửi {member.callName}
          </span>
          <h4 className="font-handwriting text-2xl md:text-3xl text-plumText font-bold">
            {member.name}
          </h4>
        </div>

        <div
          className="p-1.5 rounded-full bg-peachPink/20 text-accentPink shadow-sm flex items-center justify-center"
          title="Chạm hoặc vuốt để lật"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Photo In Card */}
      <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto my-1.5 rounded-2xl overflow-hidden border-2 border-peachPink/30 shadow-inner bg-cream flex items-center justify-center">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Heartfelt Message */}
      <div className="bg-cream/80 rounded-2xl p-3.5 border border-peachPink/30 flex-1 flex flex-col justify-center my-1">
        <p className="text-xs md:text-sm text-plumText leading-relaxed font-medium line-clamp-4">
          {member.message}
        </p>
      </div>

      {/* Bottom Hint */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-plumText/60 border-t border-peachPink/15">
        <span className="text-accentPink font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Chạm/vuốt để xem kỷ niệm</span>
        </span>
        <span>🌸 20/10/2026</span>
      </div>
    </div>
  );

  // Content for Back of FlipCard
  const backContent = (
    <div className="w-full h-full p-6 md:p-7 flex flex-col justify-between text-center relative overflow-hidden bg-gradient-to-b from-white to-cream">
      <div className="flex justify-between items-center border-b border-peachPink/20 pb-2">
        <span className="font-handwriting text-2xl text-accentPink font-bold">
          Mảnh Ghép Kỷ Niệm
        </span>
        <div className="p-1.5 rounded-full bg-peachPink/20 text-accentPink">
          <RotateCw className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Back Photo */}
      <div className="w-36 h-36 md:w-44 md:h-44 mx-auto my-2 rounded-2xl overflow-hidden border-2 border-peachPink/30 shadow-md bg-white">
        <img
          src={member.backPhoto || member.photo}
          alt="Back"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white/85 p-3 rounded-2xl border border-peachPink/30">
        <p className="font-handwriting text-base md:text-lg text-plumText leading-relaxed">
          "{member.backNote || 'Chúc người phụ nữ tuyệt vời của gia đình mãi an vui và hạnh phúc!'}"
        </p>
      </div>

      <div className="text-[11px] text-accentPink font-bold pt-1">
        <span>↩ Chạm/vuốt để lật lại mặt trước</span>
      </div>
    </div>
  );

  return (
    <section className="relative w-full max-w-xl mx-auto py-12 md:py-16 px-4">
      {/* Section Header with index */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <span
          className="inline-block px-3.5 py-1 rounded-full text-white text-xs font-bold tracking-wide shadow-sm mb-1.5"
          style={{ backgroundColor: member.accentColor }}
        >
          {String(index + 1).padStart(2, '0')} • {member.callName}
        </span>
        <h3 className="font-handwriting text-3xl md:text-5xl text-plumText font-bold">
          {member.name}
        </h3>
      </motion.div>

      {/* React Bits FlipCard Integration with Floating Corner Stickers */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="relative max-w-[340px] md:max-w-[360px] mx-auto"
      >
        {/* Floating Corner Stickers */}
        {member.stickers && member.stickers[0] && (
          <div className="absolute -top-5 -left-5 z-30 animate-idle-float pointer-events-auto">
            <CuteSticker type={member.stickers[0]} size={56} rotation={-14} />
          </div>
        )}
        {member.stickers && member.stickers[1] && (
          <div
            className="absolute -top-6 -right-5 z-30 animate-idle-float pointer-events-auto"
            style={{ animationDelay: '1.2s' }}
          >
            <CuteSticker type={member.stickers[1]} size={52} rotation={16} />
          </div>
        )}
        {member.stickers && member.stickers[2] && (
          <div
            className="absolute -bottom-5 -left-5 z-30 animate-idle-float pointer-events-auto"
            style={{ animationDelay: '0.8s' }}
          >
            <CuteSticker type={member.stickers[2]} size={50} rotation={8} />
          </div>
        )}
        {member.stickers && member.stickers[3] && (
          <div
            className="absolute -bottom-5 -right-5 z-30 animate-idle-float pointer-events-auto"
            style={{ animationDelay: '1.8s' }}
          >
            <CuteSticker type={member.stickers[3]} size={54} rotation={-12} />
          </div>
        )}

        {/* The React Bits FlipCard Component */}
        <FlipCard
          front={frontContent}
          back={backContent}
          axis="y"
          flipOnClick={true}
          draggable={true}
          dragDistance={0}
          tilt={true}
          tiltMax={10}
          glare={true}
          glareOpacity={0.18}
          hoverScale={1.03}
          perspective={1100}
          stiffness={170}
          damping={20}
          width={340}
          height={480}
          radius={28}
          background="#ffffff"
          color="#5A3A45"
          shadow={true}
          shadowColor={member.accentColor || '#E8799A'}
          shadowOpacity={0.3}
          ariaLabel={`Thiệp của ${member.name}`}
        />
      </motion.div>

      {/* Button to toggle Quiz */}
      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowQuiz(!showQuiz)}
          className="py-3 px-6 rounded-2xl bg-gradient-to-r from-accentPink to-peachPink text-white font-bold text-sm shadow-soft-pink inline-flex items-center gap-2 hover:opacity-95 transition-all"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>
            {showQuiz ? `Đóng Minigame của ${member.name}` : `Mở Minigame Vui Của ${member.name} 🎮`}
          </span>
        </motion.button>
      </div>

      {/* Accordion Quiz Section */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden mt-4"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 md:p-7 shadow-card-3d border-2 border-peachPink/30">
              {!quizCompleted ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-peachPink/20 pb-2">
                    <span className="text-xs font-bold text-accentPink uppercase">
                      Minigame dành riêng cho {member.name} 🌸
                    </span>
                    <span className="text-xs font-bold text-plumText/60 bg-cream px-2 py-0.5 rounded-full">
                      Câu {currentQIndex + 1}/{questions.length}
                    </span>
                  </div>

                  <h5 className="font-handwriting text-xl md:text-2xl text-plumText font-bold text-center">
                    {currentQ?.question}
                  </h5>

                  <div className="space-y-2.5">
                    {currentQ?.options.map((opt, oIdx) => {
                      const isSelected = selectedOption === opt;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(opt)}
                          className={`w-full p-3.5 rounded-2xl text-left text-xs md:text-sm font-semibold border-2 transition-all flex items-center justify-between gap-2.5 ${
                            isSelected
                              ? 'bg-peachPink/25 border-accentPink text-plumText shadow-sm'
                              : 'bg-cream/60 border-peachPink/30 text-plumText/85 hover:bg-cream'
                          }`}
                        >
                          <span>{opt.text}</span>
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-accentPink shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-peachPink/40 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Reply bubble */}
                  {selectedOption && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-cream border border-peachPink/30 shadow-inner mt-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-lg">💌</span>
                        <div className="flex-1">
                          <span className="text-[11px] font-bold text-accentPink block">
                            Lời nhắn của con/cháu/em:
                          </span>
                          <p className="text-xs text-plumText font-medium mt-0.5 leading-relaxed">
                            {selectedOption.reply}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleNextQuestion}
                        className="w-full mt-3 py-2 rounded-xl bg-accentPink text-white font-bold text-xs shadow-sm hover:opacity-95"
                      >
                        {currentQIndex < questions.length - 1
                          ? 'Câu tiếp theo ➜'
                          : 'Xem Huy Hiệu Danh Dự 🏆'}
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-peachPink/30 border-2 border-white flex items-center justify-center mx-auto shadow-soft-pink">
                    <Award className="w-8 h-8 text-accentPink" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-accentPink uppercase">
                      Huy Hiệu Trao Tặng
                    </span>
                    <h5 className="font-handwriting text-2xl md:text-3xl text-plumText font-bold mt-1">
                      {member.badge?.title}
                    </h5>
                    <p className="text-xs text-plumText/80 max-w-xs mx-auto mt-1 leading-relaxed">
                      {member.badge?.description}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleRestartQuiz}
                      className="px-4 py-2 rounded-xl bg-cream border border-peachPink/40 text-xs font-bold text-plumText flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-accentPink" />
                      <span>Chơi lại</span>
                    </button>
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="px-4 py-2 rounded-xl bg-accentPink text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Hoàn thành ✨</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
