import React, { useEffect } from 'react';
import { Team } from '../../types/game';
import { Trophy, RotateCcw, Lightbulb, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/sound';

interface WinnerModalProps {
  winner: Team;
  onRestart: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onRestart }) => {
  useEffect(() => {
    sound.playSuccess();

    // Trigger confetti cannon
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0284c7', '#059669', '#d97706', '#e11d48'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0284c7', '#059669', '#d97706', '#e11d48'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white border border-amber-200 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Top Winner Spotlight */}
        <div className="bg-amber-50/60 p-8 text-center border-b border-amber-100">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center mb-3 shadow-xs">
            <Trophy className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            ĐỘI CHIẾN THẮNG CHUNG CUỘC
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            {winner.name}
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            Đã xuất sắc quản trị rủi ro và làm chủ các phương án dự phòng!
          </p>
        </div>

        {/* Debrief Key Takeaways */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center space-x-2 text-slate-900 font-bold mb-1">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Tổng Kết Bài Học Cốt Lõi (Debrief SSA101)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold mb-1 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Giá trị của Backup Plans</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rủi ro bất ngờ luôn có thể làm sụp đổ kế hoạch ban đầu. Chuẩn bị nhiều giải pháp thay thế giúp tăng tính thích ứng linh hoạt và giữ vững cảm giác làm chủ tình huống.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2 text-sky-700 font-bold mb-1 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Phối hợp 3 Kiểu Tư duy</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Analytical</strong> soi trước dữ liệu, <strong>Creative</strong> mở ra góc nhìn mới, và <strong>Critical</strong> ngăn ngừa quyết định sai lầm.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-sky-600 hover:bg-sky-700 transition-all flex items-center space-x-2 shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>CHƠI LẠI VÁN MỚI (LOBBY)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
