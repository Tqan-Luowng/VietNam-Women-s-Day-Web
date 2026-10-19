import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Member } from '../types';
import DepthCarousel, { type DepthCarouselItem } from './DepthCarousel/DepthCarousel';
import { CuteSticker } from '../assets/stickers/CuteSticker';
import { Heart, Sparkles, Award, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MembersDepthSectionProps {
  members: Member[];
}

export const MembersDepthSection: React.FC<MembersDepthSectionProps> = ({ members }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMemberModal, setSelectedMemberModal] = useState<Member | null>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeMember = members[activeIndex] || members[0];

  // Convert members to DepthCarousel items for desktop
  const carouselItems: DepthCarouselItem[] = members.map((m) => ({
    image: m.photo,
    alt: m.name,
    title: m.name,
    subtitle: m.callName,
    accentColor: m.accentColor,
    message: m.message,
    memberData: m,
  }));

  const handleOpenModal = (member: Member) => {
    setSelectedMemberModal(member);
  };

  const handleSendModalLove = (color?: string) => {
    try {
      confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFB6C8', '#FFD6E0', '#FFE8B8', '#E8799A', color || '#E8799A'],
      });
    } catch {
      // Fallback
    }
    setSelectedMemberModal(null);
  };

  return (
    <section id="members-list" className="relative w-full py-16 md:py-24 px-4 md:px-8 max-w-full overflow-x-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-12">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md text-accentPink text-xs md:text-sm font-black border border-peachPink/60 shadow-soft-pink mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" /> Trạm Yêu Thương
        </span>
        <h2 className="font-handwriting text-4xl sm:text-5xl md:text-7xl font-black text-[#2B121C] mb-2 drop-shadow-sm">
          Trạm Yêu Thương Từng Người
        </h2>
      </div>

      {/* ================= MOBILE VIEW (Zero 3D lag, zero blur, perfectly centered 1:1 photos) ================= */}
      {isMobile ? (
        <div className="w-full max-w-sm mx-auto px-1 sm:px-2">
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -35) {
                    setActiveIndex((prev) => (prev + 1) % members.length);
                  } else if (info.offset.x > 35) {
                    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
                  }
                }}
                className="w-full bg-white/98 backdrop-blur-md rounded-[32px] p-5 sm:p-6 border-4 border-white shadow-soft-pink text-left relative overflow-hidden"
              >
                {/* Top Decorative Tape */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-sm opacity-95 shadow-sm border-2 border-white"
                  style={{ backgroundColor: activeMember.accentColor }}
                />

                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-pink-100/90 pb-2.5 pt-1 mb-2">
                  <div>
                    <span className="text-xs font-black text-accentPink uppercase tracking-widest block mb-0.5">
                      {activeMember.callName}
                    </span>
                    <h3 className="font-handwriting text-3xl sm:text-4xl font-black text-[#2B121C] leading-tight">
                      {activeMember.name}
                    </h3>
                  </div>
                  <span
                    className="w-4 h-4 rounded-full shadow-sm border-2 border-white mt-1.5 shrink-0"
                    style={{ backgroundColor: activeMember.accentColor }}
                  />
                </div>

                {/* Member Photo Frame (Guaranteed 1:1 square, perfectly centered) */}
                <div className="relative w-full aspect-square max-w-[240px] sm:max-w-[260px] mx-auto rounded-2xl overflow-hidden border-2 border-pink-200/80 shadow-md bg-cream my-3 flex items-center justify-center">
                  <img
                    src={activeMember.photo}
                    alt={activeMember.name}
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                  />
                  <div className="absolute top-2.5 right-2.5 drop-shadow-md pointer-events-none">
                    <CuteSticker type={activeMember.stickers[0] || 'flower_cute'} size={40} />
                  </div>
                </div>

                {/* Heartfelt Message */}
                <div className="bg-[#FFF8FA] p-4 rounded-2xl border border-peachPink/30 text-sm text-[#2B121C] font-semibold leading-relaxed mb-4 shadow-inner">
                  <p>{activeMember.message}</p>
                </div>

                {/* Badge if available */}
                {activeMember.badge && (
                  <div className="flex items-center gap-3 bg-pink-50/95 p-3 rounded-xl border border-pink-200/70 shadow-sm mb-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Award className="w-5 h-5 text-accentPink" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-[#2B121C]">
                        {activeMember.badge.title}
                      </h5>
                      <p className="text-[11px] text-[#4A2533] font-medium leading-snug">
                        {activeMember.badge.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Love Button with Confetti */}
                <button
                  onClick={() => handleSendModalLove(activeMember.accentColor)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-accentPink via-[#E8799A] to-[#D85A7E] text-white font-black text-sm shadow-soft-pink flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Gửi Trọn Yêu Thương ❤️</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clean Navigation Controls on Mobile */}
          <div className="flex items-center justify-between gap-2 mt-5 max-w-sm mx-auto">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + members.length) % members.length)}
              className="w-11 h-11 rounded-full bg-white/95 border-2 border-white shadow-soft-pink text-accentPink flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
              aria-label="Người trước"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Indicator dots */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center px-1">
              {members.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-full transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'w-6 h-2 bg-accentPink'
                      : 'w-2 h-2 bg-peachPink/40 hover:bg-peachPink'
                  }`}
                  aria-label={`Chọn người ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % members.length)}
              className="w-11 h-11 rounded-full bg-white/95 border-2 border-white shadow-soft-pink text-accentPink flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
              aria-label="Người tiếp theo"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        /* ================= DESKTOP VIEW (Keeps DepthCarousel with zero-blur optimization and centered 1:1 photo) ================= */
        <>
          <div className="relative w-full max-w-6xl mx-auto h-[620px] md:h-[680px] mb-14 overflow-hidden">
            <DepthCarousel
              items={carouselItems}
              cardWidth={400}
              cardHeight={560}
              radius={32}
              depth={175}
              spread={85}
              tilt={16}
              tiltDirection="right"
              perspective={1350}
              visibleCards={4}
              falloff={0.16}
              blur={0}
              duration={750}
              autoplay={false}
              loop={true}
              showControls={true}
              showIndicators={true}
              onChange={(idx) => setActiveIndex(idx)}
              renderCardContent={(_item, idx, isActive) => {
                const m = members[idx];
                return (
                  <div className="relative w-full h-full p-7 md:p-8 flex flex-col justify-between text-left bg-gradient-to-b from-white via-white to-pink-50/80 border-4 border-white rounded-[32px] shadow-card-3d">
                    {/* Top Decorative Tape */}
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 rounded-sm opacity-95 shadow-sm border-2 border-white"
                      style={{ backgroundColor: m.accentColor }}
                    />

                    {/* Header */}
                    <div className="flex items-start justify-between border-b-2 border-pink-100/90 pb-3 pt-1">
                      <div>
                        <span className="text-xs md:text-sm font-black text-accentPink uppercase tracking-widest block mb-0.5">
                          {m.callName}
                        </span>
                        <h3 className="font-handwriting text-4xl md:text-5xl font-black text-[#2B121C] leading-tight">
                          {m.name}
                        </h3>
                      </div>
                      <span
                        className="w-5 h-5 rounded-full shadow-sm border-2 border-white mt-1.5 shrink-0"
                        style={{ backgroundColor: m.accentColor }}
                      />
                    </div>

                    {/* Member Photo Frame (1:1 square, centered, never cropped or stretched) */}
                    <div className="relative w-full aspect-square max-h-56 md:max-h-60 mx-auto rounded-2xl overflow-hidden border-2 border-pink-200/80 shadow-md bg-cream my-3 flex items-center justify-center">
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        draggable={false}
                      />
                      <div className="absolute top-3 right-3 drop-shadow-md">
                        <CuteSticker type={m.stickers[0] || 'flower_cute'} size={44} />
                      </div>
                    </div>

                    {/* Snippet & Action Button */}
                    <div>
                      <p className="text-sm md:text-base text-[#2B121C] font-bold line-clamp-3 leading-relaxed mb-4">
                        {m.message}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(m);
                        }}
                        className={`w-full py-3.5 md:py-4 px-5 rounded-2xl text-sm md:text-base font-black tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-accentPink via-[#E8799A] to-[#D85A7E] text-white hover:opacity-95 shadow-soft-pink scale-[1.02]'
                            : 'bg-pink-100/90 text-[#2B121C] hover:bg-peachPink hover:text-white'
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        <span>Mở Thiệp Yêu Thương</span>
                      </button>
                    </div>
                  </div>
                );
              }}
            />
          </div>

          {/* Desktop Active Member Focus Showcase Panel */}
          {activeMember && (
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-[40px] p-8 md:p-12 border-4 border-white shadow-card-3d text-left relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-7">
                <div className="flex items-center gap-5">
                  <div className="relative w-18 h-18 md:w-20 md:h-20 aspect-square rounded-2xl overflow-hidden border-2 border-pink-200 shadow-md shrink-0 bg-cream">
                    <img
                      src={activeMember.photo}
                      alt={activeMember.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-black text-accentPink uppercase tracking-widest block mb-1">
                      Đang chọn thiệp
                    </span>
                    <h3 className="font-handwriting text-4xl md:text-5xl font-black text-[#2B121C]">
                      {activeMember.callName} ({activeMember.name})
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(activeMember)}
                  className="px-6 py-3.5 rounded-2xl bg-pink-100/95 hover:bg-peachPink hover:text-white text-accentPink font-black text-sm md:text-base transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  <span>Mở Thiệp Yêu Thương</span>
                </button>
              </div>

              <div className="bg-[#FFF8FA] p-7 md:p-9 rounded-3xl border-2 border-peachPink/40 text-lg md:text-xl text-[#2B121C] leading-relaxed font-semibold mb-7 shadow-inner">
                <p>{activeMember.message}</p>
              </div>

              {activeMember.badge && (
                <div className="flex items-center gap-5 bg-pink-50/95 p-5 md:p-6 rounded-2xl border-2 border-pink-200/70 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-7 h-7 text-accentPink" />
                  </div>
                  <div>
                    <h5 className="text-base md:text-lg font-black text-[#2B121C]">
                      {activeMember.badge.title}
                    </h5>
                    <p className="text-sm md:text-base text-[#4A2533] font-semibold mt-0.5">
                      {activeMember.badge.description}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}

      {/* Interactive Member Modal */}
      <AnimatePresence>
        {selectedMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-[36px] md:rounded-[40px] p-6 sm:p-8 md:p-12 shadow-2xl border-4 border-pink-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-pink-50 hover:bg-pink-100 text-[#2B121C] transition-all cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6 sm:mb-7">
                <span className="text-xs md:text-sm font-black text-accentPink uppercase tracking-widest block mb-1">
                  Món Quà Riêng Dành Tặng
                </span>
                <h3 className="font-handwriting text-3xl sm:text-4xl md:text-6xl font-black text-[#2B121C]">
                  {selectedMemberModal.callName}
                </h3>
              </div>

              {/* Photo & Stickers (Guaranteed 1:1 aspect-square, centered) */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 aspect-square rounded-3xl overflow-hidden mx-auto mb-6 border-4 border-pink-200 shadow-xl bg-cream flex items-center justify-center">
                <img
                  src={selectedMemberModal.photo}
                  alt={selectedMemberModal.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 right-3 drop-shadow-md pointer-events-none">
                  <CuteSticker type={selectedMemberModal.stickers[0] || 'flower_cute'} size={48} />
                </div>
              </div>

              <div className="bg-[#FFF8FA] p-5 sm:p-6 md:p-8 rounded-3xl border-2 border-pink-200/60 text-sm sm:text-base md:text-lg text-[#2B121C] leading-relaxed mb-6 font-bold text-left shadow-inner">
                {selectedMemberModal.message}
              </div>

              {/* Badge if available */}
              {selectedMemberModal.badge && (
                <div className="flex items-center gap-4 sm:gap-5 bg-pink-50/95 p-4 sm:p-5 md:p-6 rounded-2xl border-2 border-pink-200/70 shadow-sm mb-6 text-left">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 text-accentPink" />
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base md:text-lg font-black text-[#2B121C]">
                      {selectedMemberModal.badge.title}
                    </h5>
                    <p className="text-xs sm:text-sm md:text-base text-[#4A2533] font-semibold mt-0.5">
                      {selectedMemberModal.badge.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button: Send Love with Confetti */}
              <div className="pt-2">
                <button
                  onClick={() => handleSendModalLove(selectedMemberModal.accentColor)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-accentPink via-[#E8799A] to-peachPink text-white font-black text-base md:text-lg shadow-soft-pink hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Gửi Trọn Yêu Thương ❤️</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MembersDepthSection;
