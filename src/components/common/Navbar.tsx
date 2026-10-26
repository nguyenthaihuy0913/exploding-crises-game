import React from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw, ShieldAlert, Maximize2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRules: () => void;
  onResetGame: () => void;
  isGameActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenRules,
  onResetGame,
  isGameActive,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 lg:px-8 py-3 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-sm shadow-rose-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-tight text-lg text-slate-900">
                EXPLODING CRISES
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                SSA101 Edition
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Tư duy giải quyết vấn đề trong kỷ nguyên số • Mô phỏng Mèo Nổ
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-200'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">Âm thanh</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline">Đã tắt</span>
              </>
            )}
          </button>

          {/* Rules Guide */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenRules();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">Luật chơi & Lý thuyết</span>
          </button>

          {/* Fullscreen Toggle for Projector */}
          <button
            onClick={() => {
              sound.playClick();
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else {
                document.exitFullscreen().catch(() => {});
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
            title="Bật/Tắt Toàn Màn Hình Máy Chiếu"
          >
            <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">Toàn màn hình</span>
          </button>

          {/* Reset / Home */}
          {isGameActive && (
            <button
              onClick={() => {
                sound.playClick();
                if (window.confirm('Ông có chắc muốn kết thúc ván này và quay về trang chủ không?')) {
                  onResetGame();
                }
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Về Menu</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
