import React from 'react';
import { Sparkles } from 'lucide-react';

export type ScreenState = 'gate' | 'intro' | 'picker' | 'card' | 'quiz' | 'letter';

interface PrototypeNavProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
}

export const PrototypeNav: React.FC<PrototypeNavProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const screens: { id: ScreenState; label: string; icon: string }[] = [
    { id: 'gate', label: 'Cổng vào', icon: '🚪' },
    { id: 'intro', label: 'Hộp 3D', icon: '🎁' },
    { id: 'picker', label: 'Bàn quà', icon: '🗂️' },
    { id: 'card', label: 'Thiệp chi tiết', icon: '💌' },
    { id: 'quiz', label: 'Minigame', icon: '🎮' },
    { id: 'letter', label: 'Thư chung', icon: '📜' },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]">
      <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-peachPink/50 flex items-center gap-1 overflow-x-auto">
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-accentPink px-2 border-r border-peachPink/30">
          <Sparkles className="w-3 h-3" /> Duyệt nhanh:
        </span>

        {screens.map((s) => {
          const isActive = currentScreen === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                isActive
                  ? 'bg-accentPink text-white shadow-sm'
                  : 'text-plumText/80 hover:bg-peachPink/20'
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden md:inline">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
