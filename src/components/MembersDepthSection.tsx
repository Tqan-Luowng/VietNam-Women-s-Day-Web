import React, { useState } from 'react';
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

  const activeMember = members[activeIndex] || members[0];

  // Convert members to DepthCarousel items
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
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#FFB6C8', '#FFD6E0', '#FFE8B8', '#E8799A', color || '#E8799A'],
      });
    } catch {
      // Fallback
    }
    setSelectedMemberModal(null);
  };

  return (
    <section id="members-list" className="relative w-full py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md text-accentPink text-xs md:text-sm font-black border border-peachPink/60 shadow-soft-pink mb-3.5">
          <Sparkles className="w-4 h-4 text-amber-500" /> 3D Depth Card Carousel
        </span>
        <h2 className="font-handwriting text-5xl md:text-7xl font-black text-[#2B121C] mb-4 drop-shadow-sm">
          Trạm Yêu Thương Từng Người
        </h2>
        <p className="text-base md:text-lg text-[#4A2533] font-bold max-w-2xl mx-auto leading-relaxed">
          Lăn chuột, vuốt ngang hoặc bấm nút mũi tên để lật xem bộ thẻ 3D xếp lớp dành cho từng người thương 🌸
        </p>
      </div>

      {/* DepthCarousel 3D Stage with larger dimensions for prominent cards */}
      <div className="relative w-full max-w-6xl mx-auto h-[620px] md:h-[700px] mb-14">
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
          blur={3}
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

                {/* Member Photo Frame */}
                <div className="relative w-full h-60 md:h-64 rounded-2xl overflow-hidden border-2 border-pink-200/80 shadow-md bg-cream my-3 flex items-center justify-center">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
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

      {/* Active Member Focus Showcase Panel with larger readable typography */}
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
              <div className="relative w-18 h-18 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-pink-200 shadow-md shrink-0 bg-cream">
                <img
                  src={activeMember.photo}
                  alt={activeMember.name}
                  className="w-full h-full object-cover object-top"
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

      {/* Interactive Member Modal without Quiz */}
      <AnimatePresence>
        {selectedMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border-4 border-pink-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-pink-50 hover:bg-pink-100 text-[#2B121C] transition-all cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-7">
                <span className="text-xs md:text-sm font-black text-accentPink uppercase tracking-widest block mb-1">
                  Món Quà Riêng Dành Tặng
                </span>
                <h3 className="font-handwriting text-4xl md:text-6xl font-black text-[#2B121C]">
                  {selectedMemberModal.callName}
                </h3>
              </div>

              {/* Photo & Stickers */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden mx-auto mb-6 border-4 border-pink-200 shadow-xl bg-cream">
                <img
                  src={selectedMemberModal.photo}
                  alt={selectedMemberModal.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 right-3 drop-shadow-md">
                  <CuteSticker type={selectedMemberModal.stickers[0] || 'flower_cute'} size={48} />
                </div>
              </div>

              <div className="bg-[#FFF8FA] p-6 md:p-8 rounded-3xl border-2 border-pink-200/60 text-base md:text-lg text-[#2B121C] leading-relaxed mb-6 font-bold text-left shadow-inner">
                {selectedMemberModal.message}
              </div>

              {/* Badge if available */}
              {selectedMemberModal.badge && (
                <div className="flex items-center gap-5 bg-pink-50/95 p-5 md:p-6 rounded-2xl border-2 border-pink-200/70 shadow-sm mb-7 text-left">
                  <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-7 h-7 text-accentPink" />
                  </div>
                  <div>
                    <h5 className="text-base md:text-lg font-black text-[#2B121C]">
                      {selectedMemberModal.badge.title}
                    </h5>
                    <p className="text-sm md:text-base text-[#4A2533] font-semibold mt-0.5">
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
