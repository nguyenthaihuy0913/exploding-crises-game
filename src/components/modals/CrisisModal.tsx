import React, { useState, useEffect, useRef } from 'react';
import { Card, Team } from '../../types/game';
import { ShieldCheck, Flame, ArrowDownCircle, Heart, Shuffle, ArrowUpCircle, Radio } from 'lucide-react';
import { sound } from '../../utils/sound';

interface CrisisModalProps {
  crisisCard: Card;
  currentTeam: Team;
  onDefuse: (insertPosition: 'top' | 'middle' | 'bottom' | 'random') => void;
  onFailedDefuse: () => void;
  isHostView?: boolean;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({
  crisisCard,
  currentTeam,
  onDefuse,
  onFailedDefuse,
  isHostView = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(18);
  const [hasDefused, setHasDefused] = useState<boolean>(false);
  const hasTriggeredFailedRef = useRef<boolean>(false);

  const isHostSpectator = Boolean(isHostView && currentTeam.connected);
  const hasBackupPlan = currentTeam.hand.some(c => c.name.includes('Backup Plan'));

  useEffect(() => {
    if (hasDefused) return;

    sound.playCrisisAlarm();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasTriggeredFailedRef.current && !hasDefused) {
            hasTriggeredFailedRef.current = true;
            // Only the client laptop or offline host triggers failure, never spectator host
            if (!isHostSpectator) {
              onFailedDefuse();
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasDefused, isHostSpectator, onFailedDefuse]);

  const handleSelectPosition = (pos: 'top' | 'middle' | 'bottom' | 'random') => {
    if (hasDefused || isHostSpectator) return;
    setHasDefused(true);
    hasTriggeredFailedRef.current = true;
    sound.playSuccess();
    onDefuse(pos);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[92vh] flex flex-col bg-white border border-rose-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Top Emergency Header (shrink-0) */}
        <div className="shrink-0 bg-rose-50 border-b border-rose-100 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-rose-100 text-rose-600 border border-rose-200">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 flex items-center space-x-1">
                {isHostSpectator ? (
                  <>
                    <Radio className="w-3.5 h-3.5 animate-pulse text-rose-600" />
                    <span>Màn hình máy chiếu lớp học</span>
                  </>
                ) : (
                  <span>Cảnh báo Khủng hoảng</span>
                )}
              </span>
              <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900">
                {isHostSpectator ? `${currentTeam.name.toUpperCase()} RÚT PHẢI CRISIS!` : 'RÚT PHẢI LÁ CRISIS!'}
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

        {/* Progress bar (shrink-0) */}
        <div className="shrink-0 w-full bg-slate-100 h-1.5">
          <div 
            className="bg-rose-500 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 18) * 100}%` }}
          />
        </div>

        {/* Modal Body - Scrollable (flex-1 overflow-y-auto) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-rose-700 uppercase tracking-wide">
                {crisisCard.name}
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-rose-100">
                {crisisCard.theoryRef}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {crisisCard.description}
            </p>
          </div>

          {/* Current team notice with 2 lives visualization */}
          <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span>Đội đối mặt: <strong className="text-slate-900 font-bold">{currentTeam.name}</strong></span>
            <div className="flex items-center space-x-1">
              <span>Trạng thái:</span>
              <div className="flex items-center space-x-1.5 ml-1">
                <div className="flex items-center space-x-0.5">
                  {[1, 2].map((i) => (
                    <Heart
                      key={i}
                      className={`w-4 h-4 ${
                        currentTeam.hp >= i
                          ? 'fill-rose-500 text-rose-500 animate-pulse'
                          : 'fill-slate-100 text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-extrabold text-rose-600">
                  {currentTeam.hp > 0 ? `${currentTeam.hp} Mạng (Trừ 1 nếu nổ)` : 'Đã bị loại'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Area: Broadcast Spectator for Admin OR Interactive for Player */}
          <div className="pt-1">
            {isHostSpectator ? (
              /* HOST PROJECTOR VIEW: Teacher and class observe the team without clicking anything */
              hasBackupPlan ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
                    <ShieldCheck className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-emerald-950">
                    🛡️ Đội {currentTeam.name} đang sở hữu thẻ bài "Backup Plan"!
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Nhóm đang chọn vị trí giấu lại thẻ Crisis trên laptop của đội. Cả lớp cùng chờ xem lá bài sẽ được giấu vào đâu nhé!
                  </p>
                  <div className="pt-1 text-[11px] text-emerald-600 font-semibold font-mono">
                    💻 Thao tác trực tiếp trên laptop của đội
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-2 animate-in fade-in">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-2xs">
                    <Flame className="w-6 h-6 animate-bounce" />
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-rose-950">
                    ⚠️ Đội {currentTeam.name} KHÔNG CÓ thẻ bài Backup Plan!
                  </div>
                  <p className="text-xs sm:text-sm text-rose-800 leading-relaxed max-w-md mx-auto">
                    Đội chuẩn bị bước vào Thử thách Câu hỏi 7 bước (SSA101) trên máy chiếu để tự cứu lấy mạng sống của mình!
                  </p>
                  <div className="pt-1 text-[11px] text-rose-600 font-semibold font-mono">
                    🎯 Nếu trả lời sai sẽ bị trừ 1 Mạng sống
                  </div>
                </div>
              )
            ) : (
              /* STUDENT LAPTOP VIEW: Interactive 1-click defuse buttons */
              hasBackupPlan ? (
                <div className="space-y-3 animate-in fade-in">
                  <div className="text-center p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Đội có lá Backup Plan! Bấm vị trí để gỡ bom ngay lập tức:</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      disabled={hasDefused}
                      onClick={() => handleSelectPosition('random')}
                      className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98]"
                    >
                      <Shuffle className="w-4 h-4" />
                      <span>🔀 Nhét Ngẫu Nhiên (Nhanh)</span>
                    </button>
                    <button
                      disabled={hasDefused}
                      onClick={() => handleSelectPosition('top')}
                      className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 border border-slate-300 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
                    >
                      <ArrowUpCircle className="w-4 h-4 text-rose-600" />
                      <span>⬆️ Nhét Trên Cùng (Cài Bẫy)</span>
                    </button>
                    <button
                      disabled={hasDefused}
                      onClick={() => handleSelectPosition('middle')}
                      className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 border border-slate-300 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
                    >
                      <span>↔️ Nhét Vào Giữa</span>
                    </button>
                    <button
                      disabled={hasDefused}
                      onClick={() => handleSelectPosition('bottom')}
                      className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 border border-slate-300 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
                    >
                      <ArrowDownCircle className="w-4 h-4 text-slate-600" />
                      <span>⬇️ Nhét Xuống Đáy</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2 space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-800 font-semibold">
                    ⚠️ Đội không còn lá Backup Plan nào trên tay!
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onFailedDefuse();
                    }}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-rose-600 hover:bg-rose-700 transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer active:scale-[0.98]"
                  >
                    <span>VÀO THỬ THÁCH 7 BƯỚC ĐỂ CỨU MẠNG (SAI SẼ BỊ TRỪ 1 MẠNG!)</span>
                  </button>
                </div>
              )
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
