import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Send } from 'lucide-react';

interface GeneralLetterProps {
  letterText: string;
  onBackToPicker: () => void;
  onRestart: () => void;
}

export const GeneralLetter: React.FC<GeneralLetterProps> = ({
  letterText,
  onBackToPicker,
  onRestart,
}) => {
  const [userReply, setUserReply] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReply.trim()) return;

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('user_replies_2010') || '[]');
    saved.push({ text: userReply, time: new Date().toISOString() });
    localStorage.setItem('user_replies_2010', JSON.stringify(saved));

    setIsSent(true);
    setUserReply('');
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start px-4 py-8 max-w-xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between z-20">
        <button
          onClick={onBackToPicker}
          className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-plumText text-xs md:text-sm font-bold shadow-soft-pink border border-peachPink/30 flex items-center gap-1.5 hover:bg-peachPink hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bàn quà tặng</span>
        </button>
      </div>

      {/* Main Letter Parchment */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[#FFFDF9] rounded-card shadow-card-3d border-4 border-white p-6 md:p-10 relative overflow-hidden text-center"
      >
        {/* Ribbon decoration top */}
        <div className="w-20 h-6 bg-peachPink/50 rounded-sm mx-auto -mt-8 mb-6 shadow-sm border border-white" />

        <div className="w-14 h-14 rounded-full bg-peachPink/30 border-2 border-white flex items-center justify-center mx-auto mb-4">
          <Heart className="w-7 h-7 text-accentPink fill-accentPink" />
        </div>

        <h2 className="font-handwriting text-3xl md:text-4xl text-plumText font-bold mb-4">
          Lá Thư Yêu Thương
        </h2>

        <div className="text-left text-sm md:text-base text-plumText/90 leading-relaxed space-y-4 font-medium bg-cream/40 p-5 rounded-2xl border border-peachPink/20">
          <p>{letterText}</p>
          <p className="text-right font-handwriting text-xl text-accentPink font-bold pt-2">
            Mãi yêu thương cả nhà ❤️
          </p>
        </div>

        {/* Leave a note box */}
        <div className="mt-8 pt-6 border-t border-peachPink/30 text-left">
          <span className="text-xs font-bold text-accentPink uppercase tracking-wider block mb-2">
            Gửi lại lời nhắn cho em/con nhé 💌
          </span>

          {!isSent ? (
            <form onSubmit={handleSendFeedback} className="space-y-3">
              <textarea
                value={userReply}
                onChange={(e) => setUserReply(e.target.value)}
                placeholder="Gõ vài dòng cảm nghĩ hoặc lời nhắn ngọt ngào..."
                rows={3}
                className="w-full p-3 rounded-xl bg-cream border border-peachPink/40 text-xs md:text-sm text-plumText focus:outline-none focus:border-accentPink"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-accentPink text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Lời Nhắn Yêu Thương</span>
              </button>
            </form>
          ) : (
            <div className="bg-mintPale/40 border border-mintPale p-3 rounded-xl text-center text-xs font-bold text-plumText">
              🌸 Cảm ơn bạn! Lời nhắn đã được lưu lại trong chiếc hộp bí mật rồi nhé!
            </div>
          )}
        </div>
      </motion.div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="text-xs md:text-sm font-bold text-accentPink hover:underline pb-6"
      >
        🌸 Xem lại từ đầu (Hộp quà 3D)
      </button>
    </div>
  );
};
