import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { ChevronDown, Heart, Sparkles, MailOpen } from 'lucide-react';
import type { DeviceMode } from '../config/hero';

interface HeroOverlaysProps {
  progress: MotionValue<number>;
  mode?: DeviceMode;
  onOpenLetter?: () => void;
}

export const HeroOverlays: React.FC<HeroOverlaysProps> = ({
  progress,
  mode = 'desktop',
  onOpenLetter,
}) => {
  // Phase 1: 0% - 10% Scroll prompt hint
  const hintOpacity = useTransform(progress, [0, 0.02, 0.08, 0.12], [0.95, 1, 0.6, 0]);
  const hintY = useTransform(progress, [0, 0.08, 0.12], [0, 0, -20]);

  // Phase 2: 20% - 60% Ambient caption
  const captionOpacity = useTransform(progress, [0.18, 0.25, 0.55, 0.62], [0, 1, 1, 0]);
  const captionY = useTransform(progress, [0.18, 0.25, 0.55, 0.62], [24, 0, 0, -24]);

  // Phase 3: 60% - 96% Final Headline Card & CTA Button
  const cardOpacity = useTransform(progress, [0.58, 0.66, 0.95, 1.0], [0, 1, 1, 0.4]);
  const cardY = useTransform(progress, [0.58, 0.66, 0.95, 1.0], [24, 0, 0, -10]);
  const cardScale = useTransform(progress, [0.58, 0.66], [0.94, 1]);

  const captionTitle = mode === 'desktop' ? '✨ Vườn hoa rực rỡ' : '✨ Khoảnh khắc an yên';
  const captionText =
    mode === 'desktop'
      ? 'Từng cánh hoa hồng ngát hương bay lượn trong gió...'
      : 'Từng đóa hoa sen ngát hương đang hé nở...';

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between items-center p-6 select-none">
      {/* Top Floating Badge */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-pink-200/60 shadow-soft-pink text-xs font-bold text-accentPink"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
        <span>20 Tháng 10 • Ngày Phụ Nữ Việt Nam</span>
      </motion.div>

      {/* Phase 1: Initial Hint */}
      <motion.div
        style={{ opacity: hintOpacity, y: hintY }}
        className="flex flex-col items-center text-center my-auto"
      >
        <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-md border-2 border-pink-200 shadow-soft-pink flex items-center justify-center mb-3.5">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
        </div>
        <h2 className="font-handwriting text-4xl md:text-6xl font-black text-[#2B121C] drop-shadow-sm mb-2.5">
          Món Quà Dành Tặng Cả Nhà
        </h2>
        <p className="text-sm md:text-base font-bold text-[#2B121C] bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-sm mb-5">
          Lăn chuột xuống để bắt đầu hành trình yêu thương 🌸
        </p>
        <div className="w-9 h-14 rounded-full border-2 border-accentPink/70 flex items-start justify-center p-1.5 bg-white/60 shadow-sm">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-2 h-3 rounded-full bg-accentPink"
          />
        </div>
      </motion.div>

      {/* Phase 2: Mid-scroll Caption */}
      <motion.div
        style={{ opacity: captionOpacity, y: captionY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md md:max-w-lg text-center px-4"
      >
        <div className="bg-white/95 backdrop-blur-lg border-2 border-pink-200/90 px-8 py-6 rounded-3xl shadow-card-3d">
          <span className="text-xs md:text-sm uppercase tracking-wider font-black text-accentPink block mb-1.5">
            {captionTitle}
          </span>
          <p className="font-handwriting text-3xl md:text-4xl text-[#2B121C] font-black leading-snug">
            {captionText}
          </p>
          <p className="text-sm md:text-base text-[#4A2533] font-semibold mt-2">
            Gửi gắm ngàn lời chúc bình an và hạnh phúc đến gia đình mình
          </p>
        </div>
      </motion.div>

      {/* Phase 3: Final Card & Action */}
      <motion.div
        style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
        className="my-auto max-w-lg md:max-w-xl w-full text-center px-4 pointer-events-auto"
      >
        <div className="bg-white/98 backdrop-blur-xl border-4 border-white rounded-[38px] p-8 md:p-11 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-pink-100/90 flex items-center justify-center mx-auto mb-3.5 shadow-inner">
            <Heart className="w-7 h-7 text-accentPink fill-accentPink" />
          </div>
          <span className="text-xs md:text-sm font-black text-accentPink uppercase tracking-widest bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
            Kính chúc 20/10 vẹn tròn
          </span>
          <h2 className="font-handwriting text-4xl md:text-5xl text-[#2B121C] font-black mt-3 mb-2.5">
            Chúc Mừng 20 Tháng 10
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#2B121C] leading-relaxed mb-7 font-bold">
            Kính chúc Bà Ngoại, Bá, Mẹ, Mợ và các chị em luôn mạnh khỏe, tràn ngập tiếng cười và luôn là những bông hoa tươi thắm nhất!
          </p>

          <button
            onClick={onOpenLetter}
            className="w-full py-4 px-7 rounded-2xl bg-gradient-to-r from-[#FF8EA0] via-[#E8799A] to-[#D85A7E] text-white font-black text-base md:text-lg shadow-soft-pink flex items-center justify-center gap-2.5 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MailOpen className="w-5 h-5" />
            <span>Mở Thiệp &amp; Khám Phá Lời Chúc</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom Subtle Scroll Indicator */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="mb-2 flex items-center gap-1.5 text-xs text-plumText/75 font-semibold bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full"
      >
        <span>Cuộn chuột để tua video</span>
        <ChevronDown className="w-3.5 h-3.5 text-accentPink animate-bounce" />
      </motion.div>
    </div>
  );
};
