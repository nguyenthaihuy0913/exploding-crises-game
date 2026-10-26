import React, { useState, useEffect } from 'react';
import { Card, Team } from '../../types/game';
import { ShieldCheck, Flame, ArrowDownCircle, Heart } from 'lucide-react';
import { sound } from '../../utils/sound';

interface CrisisModalProps {
  crisisCard: Card;
  currentTeam: Team;
  onDefuse: (insertPosition: 'top' | 'middle' | 'bottom' | 'random') => void;
  onFailedDefuse: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({
  crisisCard,
  currentTeam,
  onDefuse,
  onFailedDefuse,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [isDefusing, setIsDefusing] = useState<boolean>(false);

  const hasBackupPlan = currentTeam.hand.some(c => c.name.includes('Backup Plan'));

  useEffect(() => {
    if (isDefusing) return;

    sound.playCrisisAlarm();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onFailedDefuse();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDefusing, onFailedDefuse]);

  const handleUseBackupPlan = () => {
    sound.playSuccess();
    setIsDefusing(true);
  };

  const handleSelectPosition = (pos: 'top' | 'middle' | 'bottom' | 'random') => {
    sound.playClick();
    onDefuse(pos);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border border-rose-200 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Top Emergency Header */}
        <div className="bg-rose-50 border-b border-rose-100 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600 border border-rose-200">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                Cảnh báo Khủng hoảng
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                RÚT PHẢI LÁ CRISIS!
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="text-right">
            <div className="text-2xl font-mono font-extrabold text-rose-600">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Đếm ngược</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div 
            className="bg-rose-500 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">
                {crisisCard.name}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {crisisCard.theoryRef}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {crisisCard.description}
            </p>
          </div>

          {/* Current team notice */}
          <div className="text-xs text-slate-600 mb-6 flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span>Đội đối mặt: <strong className="text-slate-900">{currentTeam.name}</strong></span>
            <div className="flex items-center space-x-1">
              <span>Trạng thái:</span>
              <div className="flex items-center space-x-1.5 ml-1">
                <Heart
                  className={`w-3.5 h-3.5 ${
                    currentTeam.hp > 0
                      ? 'fill-rose-500 text-rose-500 animate-pulse'
                      : 'fill-slate-100 text-slate-300'
                  }`}
                />
                <span className="font-bold text-rose-600">
                  {currentTeam.hp > 0 ? '1 Mạng (Sẽ bị loại nếu thất bại!)' : 'Đã bị loại'}
                </span>
              </div>
            </div>
          </div>

          {!isDefusing ? (
            /* Action Choice */
            <div>
              {hasBackupPlan ? (
                <button
                  onClick={handleUseBackupPlan}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>DÙNG LÁ "BACKUP PLAN" ĐỂ GỠ BÀI</span>
                </button>
              ) : (
                <div className="text-center py-2">
                  <p className="text-xs text-amber-700 font-semibold mb-3">
                    ⚠️ Đội không còn lá Backup Plan nào trên tay!
                  </p>
                  <button
                    onClick={onFailedDefuse}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <span>VÀO THỬ THÁCH 7 BƯỚC ĐỂ CỨU MẠNG (SAI SẼ BỊ LOẠI!)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Secretly Insert Back position */
            <div className="space-y-3 animate-in fade-in">
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  Gỡ bom thành công!
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Chọn vị trí bí mật để nhét lại lá Crisis vào chồng bài:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleSelectPosition('top')}
                  className="py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <ArrowDownCircle className="w-4 h-4 text-rose-600" />
                  <span>Ngay Trên Cùng (Bẫy)</span>
                </button>
                <button
                  onClick={() => handleSelectPosition('middle')}
                  className="py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Ở Giữa Chồng Bài</span>
                </button>
                <button
                  onClick={() => handleSelectPosition('bottom')}
                  className="py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Ở Đáy Chồng Bài</span>
                </button>
                <button
                  onClick={() => handleSelectPosition('random')}
                  className="py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Ngẫu nhiên (Xáo đều)</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
