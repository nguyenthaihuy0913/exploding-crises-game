import React, { useState, useEffect } from 'react';
import { Team, QnaItem } from '../../types/game';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Heart, Radio } from 'lucide-react';
import { sound } from '../../utils/sound';

interface QnaModalProps {
  currentTeam: Team;
  qnaItem: QnaItem;
  onComplete: (isCorrect: boolean) => void;
  readOnly?: boolean;
}

export const QnaModal: React.FC<QnaModalProps> = ({
  currentTeam,
  qnaItem,
  onComplete,
  readOnly = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Shuffle options so correct answer is NEVER in a fixed predictable slot
  const shuffledOptions = React.useMemo(() => {
    const list = [...qnaItem.options];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [qnaItem.id]);

  useEffect(() => {
    if (isSubmitted || readOnly) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, readOnly]);

  const handleSubmit = (optionId: string | null) => {
    if (isSubmitted || readOnly) return;
    setIsSubmitted(true);
    setSelectedOptionId(optionId);

    const chosen = qnaItem.options.find(o => o.id === optionId);
    if (chosen && chosen.isCorrect) {
      sound.playSuccess();
    } else {
      sound.playCrisisAlarm();
    }
  };

  const chosenOption = qnaItem.options.find(o => o.id === selectedOptionId);
  const correctOption = qnaItem.options.find(o => o.isCorrect);
  const isCorrect = chosenOption ? chosenOption.isCorrect : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[92vh] flex flex-col bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header - Fixed Top (shrink-0) */}
        <div className="shrink-0 bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-100">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center space-x-1">
                {readOnly ? (
                  <>
                    <Radio className="w-3.5 h-3.5 animate-pulse text-sky-600" />
                    <span>Màn hình máy chiếu lớp học</span>
                  </>
                ) : (
                  <span>Thử thách 7 Bước Giải Quyết Vấn Đề (SSA101)</span>
                )}
              </span>
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900">
                {qnaItem.step}
              </h2>
            </div>
          </div>

          {/* Timer */}
          {!isSubmitted && (
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-amber-700">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Thời gian</span>
            </div>
          )}
        </div>

        {/* Timer Bar - Fixed (shrink-0) */}
        {!isSubmitted && (
          <div className="shrink-0 w-full bg-slate-100 h-1.5">
            <div 
              className="bg-amber-500 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body - Scrollable (flex-1 overflow-y-auto) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Read-Only Projector Banner for Host Screen */}
          {readOnly && (
            <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 animate-pulse">
              <span>📺 Màn hình máy chiếu: Đang chờ đội <strong>{currentTeam.name}</strong> thảo luận và chọn đáp án trên laptop của họ...</span>
            </div>
          )}

          {/* Team Indicator with 2 lives visualization */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200">
            <span>Đội đối mặt: <strong className="text-slate-900 font-bold">{currentTeam.name}</strong></span>
            <div className="flex items-center space-x-1.5">
              <span>Trạng thái:</span>
              <div className="flex items-center space-x-1 ml-1">
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
                  {currentTeam.hp > 0 ? `${currentTeam.hp} Mạng` : '0 Mạng (Đã loại)'}
                </span>
              </div>
            </div>
          </div>

          {/* Scenario */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold block mb-1">📖 Tình huống thực tế (Case Scenario):</strong>
            <span>{qnaItem.scenario}</span>
          </div>

          {/* Question (Enlarged for readability) */}
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg lg:text-xl leading-snug pt-1">
            {qnaItem.question}
          </h3>

          {/* Shuffled Options with dynamic letters (Enlarged font & padding) */}
          <div className="space-y-3 pt-1 pb-2">
            {shuffledOptions.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'bg-white border-slate-200 text-slate-800';

              if (isSubmitted) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-300';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-950 ring-1 ring-rose-200';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                }
              } else if (!readOnly) {
                btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 cursor-pointer active:scale-[0.99]';
              } else {
                btnStyle = 'bg-white border-slate-200 text-slate-800 cursor-default';
              }

              return (
                <button
                  key={opt.id}
                  disabled={isSubmitted || readOnly}
                  onClick={() => handleSubmit(opt.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm sm:text-base transition-all flex items-start space-x-3 ${btnStyle}`}
                >
                  <span className="font-mono text-slate-600 font-extrabold text-base sm:text-lg mt-0.5">{letter}.</span>
                  <span className="flex-1 leading-relaxed font-medium">{opt.text}</span>
                  {isSubmitted && opt.isCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result & Explanation */}
          {isSubmitted && (
            <div className="animate-in fade-in space-y-3 pt-2">
              <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <div className="font-bold text-sm sm:text-base mb-1.5 flex items-center space-x-2">
                  <span>{isCorrect ? '🎉 Trả lời Chính Xác!' : '💥 Chưa chính xác!'}</span>
                  <span className="text-xs font-normal opacity-90">
                    {isCorrect
                      ? `(Bảo toàn thành công ${currentTeam.hp} Mạng sống)`
                      : `(Bị trừ 1 Mạng! Còn ${Math.max(0, currentTeam.hp - 1)} Mạng)`}
                  </span>
                </div>
                <p className="text-slate-800 leading-relaxed font-normal">
                  {chosenOption ? chosenOption.explanation : 'Hết thời gian trả lời! Đội đã không kịp đưa ra quyết định.'}
                </p>
                {!isCorrect && correctOption && (
                  <div className="mt-3 pt-2.5 border-t border-rose-200 text-slate-800">
                    <strong className="text-rose-900 font-bold">Phương án tối ưu:</strong> {correctOption.text}
                    <div className="text-xs text-slate-600 mt-1">{correctOption.explanation}</div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Sticky Footer */}
        {readOnly ? (
          <div className="shrink-0 bg-slate-50 border-t border-slate-200 p-3 sm:p-3.5 text-center">
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              👀 Màn hình máy chiếu: Kết quả và bước giải quyết sẽ cập nhật khi đội chốt phương án trên laptop.
            </span>
          </div>
        ) : isSubmitted ? (
          <div className="shrink-0 bg-slate-50 border-t border-slate-200 p-3.5 sm:p-4 shadow-xs">
            <button
              onClick={() => onComplete(isCorrect)}
              className="w-full py-3.5 px-5 rounded-xl font-extrabold text-sm sm:text-base text-white bg-sky-600 hover:bg-sky-700 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-sky-600/20 active:scale-[0.99]"
            >
              <span>TIẾP TỤC VÁN ĐẤU</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : null}

      </div>
    </div>
  );
};
