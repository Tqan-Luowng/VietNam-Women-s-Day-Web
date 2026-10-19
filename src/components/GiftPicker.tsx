import React from 'react';
import { motion } from 'framer-motion';
import type { Member } from '../types';
import { CuteSticker } from '../assets/stickers/CuteSticker';
import { Sparkles, Heart } from 'lucide-react';

interface GiftPickerProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
  onOpenLetter: () => void;
}

export const GiftPicker: React.FC<GiftPickerProps> = ({
  members,
  onSelectMember,
  onOpenLetter,
}) => {
  // Fun tilted angles for scattered desk look
  const angles = [-5, 4, -3, 6];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start px-4 py-8 max-w-4xl mx-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-peachPink/30 text-accentPink text-xs md:text-sm font-bold border border-peachPink/40">
          <Sparkles className="w-3.5 h-3.5" /> Bàn Quà Tặng 20/10
        </span>
        <h2 className="font-handwriting text-3xl md:text-5xl text-plumText font-bold mt-2">
          Chọn Một Món Quà Nhé!
        </h2>
        <p className="text-sm md:text-base text-plumText/75 mt-1">
          Chạm vào tấm thiệp của bạn để mở bức thư và minigame vui riêng 🌸
        </p>
      </motion.div>

      {/* Scattered Polaroids Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-3xl my-auto py-4">
        {members.map((member, index) => {
          const angle = angles[index % angles.length];

          return (
            <motion.div
              key={member.id}
              layoutId={`card-container-${member.id}`}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: angle }}
              transition={{
                delay: index * 0.12,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              whileHover={{
                scale: 1.08,
                rotate: 0,
                zIndex: 30,
                transition: { type: 'spring', stiffness: 350, damping: 15 },
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectMember(member)}
              className="relative cursor-pointer bg-white p-3 md:p-4 rounded-2xl shadow-card-3d border-2 border-white hover:border-accentPink/30 group"
            >
              {/* Cute Washi Tape on top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-80 shadow-sm"
                style={{
                  backgroundColor: member.accentColor || '#FFB6C8',
                  transform: `translateX(-50%) rotate(${angle * 0.5}deg)`,
                }}
              />

              {/* Photo Frame */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-cream mb-3 border border-peachPink/20 flex items-center justify-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback avatar if local photo route hasn't resolved
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23FFD6E0"/><text x="50" y="58" font-size="28" text-anchor="middle" fill="%23E8799A">🌸</text></svg>';
                  }}
                />

                {/* Floating Corner Sticker */}
                {member.stickers && member.stickers[0] && (
                  <div className="absolute -bottom-2 -right-2">
                    <CuteSticker type={member.stickers[0]} size={36} />
                  </div>
                )}
              </div>

              {/* Name & Call Name */}
              <div className="text-center">
                <h3 className="font-handwriting text-xl md:text-2xl text-plumText font-bold">
                  {member.name}
                </h3>
                <p className="text-xs text-accentPink font-semibold mt-0.5">
                  {member.callName}
                </p>
              </div>

              {/* Tap to open badge */}
              <div className="mt-2 text-center">
                <span className="inline-block text-[11px] font-bold text-plumText/60 bg-cream px-2 py-0.5 rounded-full group-hover:bg-peachPink group-hover:text-white transition-colors">
                  Mở quà ✨
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button to open General Family Letter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenLetter}
          className="px-6 py-3 rounded-full bg-white/90 text-plumText font-bold text-sm shadow-soft-pink border border-peachPink/40 flex items-center gap-2 hover:bg-peachPink hover:text-white transition-all mx-auto"
        >
          <Heart className="w-4 h-4 text-accentPink fill-accentPink" />
          <span>Đọc Lá Thư Chung Cho Cả Nhà 💌</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
