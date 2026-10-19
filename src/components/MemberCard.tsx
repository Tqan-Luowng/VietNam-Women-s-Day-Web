import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Member } from '../types';
import { CuteSticker } from '../assets/stickers/CuteSticker';
import {
  RotateCw,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface MemberCardProps {
  member: Member;
  allMembers: Member[];
  onSelectMember: (member: Member) => void;
  onBackToPicker: () => void;
  onStartQuiz: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  allMembers,
  onSelectMember,
  onBackToPicker,
  onStartQuiz,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect for message
  useEffect(() => {
    setIsFlipped(false);
    setDisplayedText('');
    setIsTyping(true);

    let index = 0;
    const fullText = member.message;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [member]);

  const handleSkipTyping = () => {
    if (isTyping) {
      setDisplayedText(member.message);
      setIsTyping(false);
    }
  };

  const currentIndex = allMembers.findIndex((m) => m.id === member.id);
  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allMembers.length) % allMembers.length;
    onSelectMember(allMembers[prevIdx]);
  };
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allMembers.length;
    onSelectMember(allMembers[nextIdx]);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-6 max-w-lg mx-auto">
      {/* Top Bar Navigation */}
      <div className="w-full flex items-center justify-between mb-4 z-20">
        <button
          onClick={onBackToPicker}
          className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-plumText text-xs md:text-sm font-bold shadow-soft-pink border border-peachPink/30 flex items-center gap-1.5 hover:bg-peachPink hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bàn quà tặng</span>
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-peachPink/20">
          {allMembers.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => onSelectMember(m)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-6 bg-accentPink'
                  : 'bg-peachPink/60 hover:bg-peachPink'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main 3D Flipping Card Container */}
      <div className="relative w-full aspect-[4/5] max-h-[560px] perspective-1000 z-10">
        {/* Corner Stickers */}
        {member.stickers && member.stickers[0] && (
          <div className="absolute -top-4 -left-4 z-30 animate-idle-float">
            <CuteSticker type={member.stickers[0]} size={58} rotation={-14} />
          </div>
        )}
        {member.stickers && member.stickers[1] && (
          <div
            className="absolute -top-5 -right-4 z-30 animate-idle-float"
            style={{ animationDelay: '1.2s' }}
          >
            <CuteSticker type={member.stickers[1]} size={54} rotation={16} />
          </div>
        )}
        {member.stickers && member.stickers[2] && (
          <div
            className="absolute -bottom-4 -left-4 z-30 animate-idle-float"
            style={{ animationDelay: '0.8s' }}
          >
            <CuteSticker type={member.stickers[2]} size={52} rotation={8} />
          </div>
        )}
        {member.stickers && member.stickers[3] && (
          <div
            className="absolute -bottom-4 -right-4 z-30 animate-idle-float"
            style={{ animationDelay: '1.8s' }}
          >
            <CuteSticker type={member.stickers[3]} size={56} rotation={-12} />
          </div>
        )}

        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-full h-full transform-style-3d relative"
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-card shadow-card-3d border-4 border-white p-6 md:p-8 flex flex-col justify-between overflow-hidden">
            {/* Top Info */}
            <div className="flex items-start justify-between border-b border-peachPink/20 pb-3">
              <div>
                <span
                  className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white mb-1 shadow-sm"
                  style={{ backgroundColor: member.accentColor }}
                >
                  {member.callName}
                </span>
                <h2 className="font-handwriting text-3xl md:text-4xl text-plumText font-bold">
                  {member.name}
                </h2>
              </div>

              {/* Flip Button */}
              <button
                onClick={() => setIsFlipped(true)}
                className="p-2 rounded-full bg-peachPink/20 text-accentPink hover:bg-accentPink hover:text-white transition-all shadow-sm"
                title="Lật mặt sau"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Photo In Card */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto my-2 rounded-2xl overflow-hidden border-2 border-peachPink/30 shadow-inner bg-cream flex items-center justify-center">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
            </div>

            {/* Message Area with Typewriter */}
            <div
              onClick={handleSkipTyping}
              className="bg-cream/70 rounded-2xl p-4 border border-peachPink/30 flex-1 flex flex-col justify-center cursor-pointer relative"
              title="Nhấn để hiện toàn bộ chữ"
            >
              <p className="text-xs md:text-sm text-plumText leading-relaxed font-medium">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-1.5 h-3.5 bg-accentPink ml-1 animate-pulse" />
                )}
              </p>
              {isTyping && (
                <span className="text-[10px] text-accentPink/70 text-right mt-1 font-semibold">
                  (chạm để bỏ qua gõ chữ)
                </span>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between text-xs text-plumText/60">
              <button
                onClick={() => setIsFlipped(true)}
                className="text-accentPink hover:underline font-bold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Xem mặt sau thiệp</span>
              </button>
              <span>🌸 20/10/2026</span>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-b from-white to-cream rounded-card shadow-card-3d border-4 border-white p-6 md:p-8 flex flex-col justify-between text-center overflow-hidden">
            <div className="flex justify-between items-center border-b border-peachPink/20 pb-2">
              <span className="font-handwriting text-2xl text-accentPink font-bold">
                Mảnh Ghép Kỷ Niệm
              </span>
              <button
                onClick={() => setIsFlipped(false)}
                className="p-2 rounded-full bg-peachPink/20 text-accentPink hover:bg-accentPink hover:text-white transition-all"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Back Photo or Memory */}
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto my-2 rounded-2xl overflow-hidden border-2 border-peachPink/30 shadow-md bg-white">
              <img
                src={member.backPhoto || member.photo}
                alt="Back"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white/80 p-3.5 rounded-2xl border border-peachPink/30">
              <p className="font-handwriting text-lg md:text-xl text-plumText leading-relaxed">
                "{member.backNote || 'Cảm ơn vì đã luôn là người phụ nữ tuyệt vời nhất!'}"
              </p>
            </div>

            <button
              onClick={() => setIsFlipped(false)}
              className="text-xs text-accentPink font-bold hover:underline"
            >
              ↩ Lật lại mặt trước
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Switch Buttons & Minigame Launcher */}
      <div className="w-full flex items-center justify-between gap-3 mt-5 z-20">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white shadow-soft-pink text-plumText hover:bg-peachPink hover:text-white transition-all"
          title="Người trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStartQuiz}
          className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-accentPink to-peachPink text-white font-bold text-sm md:text-base shadow-soft-pink flex items-center justify-center gap-2 hover:opacity-95 transition-all"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>Minigame Của {member.name} 🎮</span>
        </motion.button>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white shadow-soft-pink text-plumText hover:bg-peachPink hover:text-white transition-all"
          title="Người tiếp theo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
