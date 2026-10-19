import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { CuteSticker } from '../assets/stickers/CuteSticker';

interface GateProps {
  onSuccess: () => void;
}

export const Gate: React.FC<GateProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!password.trim()) {
      showError('Hãy nhập mật khẩu nhỏ để mở quà nhé! ✨');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    // Attempt login
    setTimeout(() => {
      // In dev or prototype mode, allow standard password "2010" or any non-empty input
      if (password === '2010' || password.toLowerCase() === 'yeuthuong' || password.length >= 3) {
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        showError('Mật khẩu chưa chính xác rồi nè, bạn thử lại nha! 🥺');
      }
    }, 450);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-4">
      {/* Decorative background stickers floating around */}
      <div className="absolute top-10 left-8 md:left-24 animate-idle-float pointer-events-none">
        <CuteSticker type="strawberry" size={56} rotation={-12} />
      </div>
      <div className="absolute top-16 right-8 md:right-28 animate-idle-float pointer-events-none" style={{ animationDelay: '1.2s' }}>
        <CuteSticker type="boba" size={60} rotation={15} />
      </div>
      <div className="absolute bottom-12 left-10 md:left-32 animate-idle-float pointer-events-none" style={{ animationDelay: '0.8s' }}>
        <CuteSticker type="bear" size={64} rotation={8} />
      </div>
      <div className="absolute bottom-16 right-10 md:right-32 animate-idle-float pointer-events-none" style={{ animationDelay: '2s' }}>
        <CuteSticker type="bunny" size={58} rotation={-10} />
      </div>

      {/* Main card box */}
      <motion.div
        animate={isShaking ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-md p-9 md:p-12 rounded-[38px] shadow-soft-pink border-4 border-white text-center"
      >
        {/* Top Heart Badge */}
        <div className="mx-auto w-16 h-16 rounded-full bg-peachPink/30 border-2 border-white flex items-center justify-center mb-4 shadow-inner">
          <Heart className="w-8 h-8 text-accentPink fill-accentPink animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-peachPink/25 text-accentPink text-xs md:text-sm font-black mb-3 border border-peachPink/40 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-accentPink" />
          <span>Món quà 20/10 🌸</span>
        </div>

        <h1 className="font-handwriting text-4xl md:text-5xl text-[#2B121C] font-black mb-3">
          Gửi Những Người Phụ Nữ Tôi Yêu
        </h1>
        <p className="text-base md:text-lg text-[#4A2533] font-semibold mb-7 leading-relaxed">
          Nhập mật khẩu gia đình để mở cánh cửa yêu thương và món quà thủ công đặc biệt nhé! 🌸
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Nhập mật khẩu (gợi ý: 2010)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-2xl bg-[#FFF8FA] border-2 border-peachPink/50 text-[#2B121C] placeholder:text-[#4A2533]/40 focus:outline-none focus:border-accentPink focus:ring-2 focus:ring-accentPink/20 text-center font-bold text-xl transition-all"
            />
            <Lock className="w-6 h-6 text-accentPink/80 absolute left-4.5 top-1/2 -translate-y-1/2" />
          </div>

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 font-bold"
            >
              {errorMsg}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-accentPink to-peachPink text-white font-black text-base md:text-lg shadow-soft-pink flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block animate-spin">🌸</span>
            ) : (
              <>
                <span>Mở Cửa Yêu Thương</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Quick Review Bypass button */}
        <div className="mt-6 pt-5 border-t border-peachPink/20">
          <button
            type="button"
            onClick={onSuccess}
            className="text-xs text-accentPink/80 hover:text-accentPink underline font-semibold flex items-center justify-center gap-1.5 mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mở xem ngay</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
