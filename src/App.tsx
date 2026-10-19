import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { initialContent } from './data/mockData';
import { Gate } from './components/Gate';
import { HeroSequence } from './components/HeroSequence';
import { MembersDepthSection } from './components/MembersDepthSection';
import { ClickSparkleEffect } from './components/ClickSparkleEffect';
import { AmbientBackground } from './components/AmbientBackground';
import { MiniMapNav } from './components/navigation/MiniMapNav';
import { soundFx } from './utils/audio';
import { signals } from './lib/signals';
import {
  Volume2,
  VolumeX,
  Heart,
  ChevronDown,
  Send,
  ArrowUp,
  Music,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [userReply, setUserReply] = useState('');
  const [replySent, setReplySent] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);

  // Synchronize window scroll progress
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const ratio = Math.max(0, Math.min(1, window.scrollY / maxScroll));
          signals.scrollProgress = ratio;
          setScrollRatio(ratio);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Toggle Audio
  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
  };

  const scrollToSection = (id: string) => {
    soundFx.playChime(800);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReply.trim()) return;
    const saved = JSON.parse(localStorage.getItem('user_replies_2010') || '[]');
    saved.push({ text: userReply, time: new Date().toISOString() });
    localStorage.setItem('user_replies_2010', JSON.stringify(saved));
    setReplySent(true);
    setUserReply('');
    soundFx.playChime(1200);
    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.7 },
        colors: ['#E8799A', '#FFB6C8', '#FFE8B8'],
      });
    } catch {
      // Fallback
    }
  };


  // If not logged in, show Gate
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen w-full bg-cream text-plumText flex flex-col justify-center">
        <AmbientBackground />
        <ClickSparkleEffect />
        <Gate onSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-cream text-plumText selection:bg-peachPink selection:text-plumText">
      {/* Ambient Lighting Glow Overlay */}
      <AmbientBackground />

      {/* Interactive Blossom Click Effect */}
      <ClickSparkleEffect />

      {/* Floating Mini-Map Navigation Rail */}
      <MiniMapNav currentProgress={scrollRatio} />

      {/* Floating Top Header: Made by Trung Quân & Audio Control */}
      <header className="fixed top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 z-50 flex items-center justify-between pointer-events-none">
        {/* Made by Trung Quân Badge (Preserved only at header) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-soft-pink border-2 border-white text-xs sm:text-sm font-bold text-[#2B121C] select-none hover:shadow-md transition-all max-w-[calc(100%-64px)] truncate"
        >
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-accentPink animate-ping shrink-0" />
          <span className="hidden sm:inline text-accentPink font-black">20/10 Gift</span>
          <span className="hidden sm:inline text-[#2B121C]/30">•</span>
          <span className="truncate">Made with ❤️ by <strong className="text-accentPink font-black">Trung Quân</strong></span>
        </motion.div>

        {/* Audio Toggle */}
        <div className="pointer-events-auto">
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full backdrop-blur-md shadow-soft-pink border transition-all flex items-center gap-1.5 cursor-pointer ${
              isMuted
                ? 'bg-white/85 border-peachPink/30 text-plumText hover:bg-peachPink hover:text-white'
                : 'bg-accentPink border-accentPink text-white shadow-lg animate-pulse'
            }`}
            title={isMuted ? 'Bật nhạc nền hộp nhạc du dương' : 'Tắt nhạc nền'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <Music className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              </>
            )}
          </button>
        </div>
      </header>

      {/* ================= SECTION 1: SCROLL-LINKED HERO SEQUENCE ================= */}
      <section id="hero" className="relative w-full">
        <HeroSequence
          mode="scroll"
          onScrollToNext={() => scrollToSection('general-letter')}
        />
      </section>

      {/* ================= SECTION 2: LỜI CHÚC CHUNG CHO CẢ NHÀ ================= */}
      <section
        id="general-letter"
        className="relative w-full max-w-4xl mx-auto py-24 px-4 min-h-[90vh] flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#FFFDF9]/98 backdrop-blur-md rounded-[40px] shadow-card-3d border-4 border-white p-8 md:p-14 relative text-center"
        >
          {/* Top Decorative Ribbon */}
          <div className="w-32 h-7 bg-peachPink/60 rounded-sm mx-auto -mt-12 md:-mt-17 mb-6 shadow-sm border-2 border-white" />

          <div className="w-16 h-16 rounded-full bg-peachPink/30 border-2 border-white flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Heart className="w-8 h-8 text-accentPink fill-accentPink animate-pulse" />
          </div>

          <span className="text-xs md:text-sm font-black text-accentPink uppercase tracking-widest block">
            Gửi Những Người Phụ Nữ Tuyệt Vời Của Gia Đình
          </span>
          <h2 className="font-handwriting text-4xl md:text-6xl text-[#2B121C] font-black mt-2 mb-6">
            Lời Chúc Yêu Thương
          </h2>

          <div className="text-left text-base md:text-xl text-[#2B121C] leading-relaxed md:leading-loose space-y-4 font-semibold bg-[#FFF8FA] p-7 md:p-10 rounded-3xl border-2 border-peachPink/30 shadow-inner">
            <p>{initialContent.generalLetter}</p>
            <p className="text-right font-handwriting text-2xl md:text-3xl text-accentPink font-black pt-3">
              Kính chúc cả nhà luôn bình an &amp; hạnh phúc! ❤️
            </p>
            <div className="text-right pt-2 border-t border-peachPink/20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-peachPink/20 text-accentPink text-xs md:text-sm font-black tracking-wide">
                — Lời chúc yêu thương từ: Trung Quân 🌸 —
              </span>
            </div>
          </div>

        </motion.div>

        {/* Scroll down prompt to 3D member stations */}
        <div className="text-center mt-12">
          <p className="text-sm font-bold text-[#2B121C] mb-2 bg-white/85 backdrop-blur-sm px-5 py-1.5 rounded-full inline-block shadow-sm">
            Tiếp tục cuộn xuống để ghé thăm từng trạm yêu thương 🌸
          </p>
          <ChevronDown className="w-6 h-6 text-accentPink mx-auto animate-bounce mt-2" />
        </div>
      </section>

      {/* ================= SECTION 3: TRẠM YÊU THƯƠNG ================= */}
      <MembersDepthSection members={initialContent.members} />

      {/* ================= SECTION 4: MÀN KẾT & GỬI LỜI NHẮN ================= */}
      <section
        id="finale"
        className="relative w-full max-w-2xl mx-auto py-24 px-4 text-center min-h-[85vh] flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="bg-white/95 backdrop-blur-md rounded-[40px] p-8 md:p-12 shadow-card-3d border-4 border-white text-left"
        >
          <div className="text-center mb-6">
            <Heart className="w-10 h-10 text-accentPink fill-accentPink mx-auto mb-2 animate-bounce" />
            <h3 className="font-handwriting text-4xl md:text-5xl text-[#2B121C] font-black">
              Hòm Thư Yêu Thương
            </h3>
            <p className="text-sm md:text-base text-[#4A2533] font-semibold mt-2">
              Gửi lại vài dòng cảm nghĩ hoặc lời nhắn ngọt ngào nhé 💌
            </p>
          </div>

          {!replySent ? (
            <form onSubmit={handleSendReply} className="space-y-4">
              <textarea
                value={userReply}
                onChange={(e) => setUserReply(e.target.value)}
                placeholder="Ví dụ: Chúc gia đình mình luôn vui vẻ và hạnh phúc!..."
                rows={4}
                className="w-full p-5 rounded-2xl bg-[#FFF8FA] border-2 border-peachPink/40 text-base md:text-lg text-[#2B121C] font-semibold focus:outline-none focus:border-accentPink transition-all"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-accentPink to-peachPink text-white font-black text-base md:text-lg shadow-soft-pink flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Gửi Lời Nhắn</span>
              </button>
            </form>
          ) : (
            <div className="bg-mintPale/60 border-2 border-mintPale p-6 rounded-2xl text-center text-base md:text-lg font-bold text-[#2B121C]">
              🌸 Cảm ơn người thương! Lời nhắn ấm áp đã được gửi và lưu trữ trong chiếc hộp bí mật rồi nhé!
            </div>
          )}
        </motion.div>

        {/* Back to top button */}
        <div className="mt-12 pb-10">
          <button
            onClick={() => {
              soundFx.playChime(600);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-7 py-3 rounded-full bg-white/90 backdrop-blur-md text-sm md:text-base font-black text-accentPink border-2 border-peachPink/40 shadow-soft-pink inline-flex items-center gap-2 hover:bg-peachPink hover:text-white transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Cuộn lên đầu trang</span>
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full py-8 md:py-10 text-center border-t-2 border-peachPink/30 bg-white/75 backdrop-blur-md">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-black text-[#2B121C]">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Món Quà Yêu Thương 20/10</span>
          </div>
          <p className="text-xs text-[#6B3A4F] font-semibold">
            Dành tặng trọn vẹn tình cảm đến những người phụ nữ tuyệt vời nhất của gia đình 🌸
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
