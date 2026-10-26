import React, { useState, useEffect } from 'react';
import { Team, QnaItem } from '../../types/game';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Heart } from 'lucide-react';
import { sound } from '../../utils/sound';

interface QnaModalProps {
  currentTeam: Team;
  qnaItem: QnaItem;
  onComplete: (isCorrect: boolean) => void;
}

export const QnaModal: React.FC<QnaModalProps> = ({
  currentTeam,
  qnaItem,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(20);
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
    if (isSubmitted) return;

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
  }, [isSubmitted]);

  const handleSubmit = (optionId: string | null) => {
    if (isSubmitted) return;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-100">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                Thử thách 7 Bước Giải Quyết Vấn Đề
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {qnaItem.step}
              </h2>
            </div>
          </div>

          {/* Timer */}
          {!isSubmitted && (
            <div className="text-right">
              <div className="text-xl font-mono font-bold text-amber-700">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Thời gian</span>
            </div>
          )}
        </div>

        {/* Timer Bar */}
        {!isSubmitted && (
          <div className="w-full bg-slate-100 h-1">
            <div 
              className="bg-amber-500 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Team Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-600 mb-3 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
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
                  {currentTeam.hp > 0 ? '1 Mạng duy nhất' : '0 Mạng'}
                </span>
              </div>
            </div>
          </div>

          {/* Scenario */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4 text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Tình huống thực tế:</strong> {qnaItem.scenario}
          </div>

          {/* Question */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-4 leading-snug">
            {qnaItem.question}
          </h3>

          {/* Shuffled Options with dynamic letters */}
          <div className="space-y-2.5 mb-6">
            {shuffledOptions.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';

              if (isSubmitted) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isSubmitted}
                  onClick={() => handleSubmit(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start space-x-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="font-mono text-slate-600 font-bold">{letter}.</span>
                  <span className="flex-1 leading-relaxed">{opt.text}</span>
                  {isSubmitted && opt.isCorrect && (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result & Explanation */}
          {isSubmitted && (
            <div className="space-y-4 animate-in fade-in">
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="font-bold text-sm mb-1.5 flex items-center space-x-2">
                  <span>{isCorrect ? '🎉 Trả lời Chính Xác!' : '💥 Chưa chính xác!'}</span>
                  <span className="text-xs font-normal opacity-90">
                    {isCorrect ? '(Bảo toàn thành công 1 Mạng sống)' : '(Mất mạng duy nhất & bị loại khỏi ván đấu)'}
                  </span>
                </div>
                <p className="text-slate-800 leading-relaxed">
                  {chosenOption ? chosenOption.explanation : 'Hết thời gian trả lời! Bạn đã không kịp đưa ra quyết định.'}
                </p>
                {!isCorrect && correctOption && (
                  <div className="mt-2.5 pt-2 border-t border-rose-200/60 text-slate-700">
                    <strong className="text-rose-800">Phương án tối ưu:</strong> {correctOption.text}
                    <div className="text-[11px] text-slate-600 mt-1">{correctOption.explanation}</div>
                  </div>
                )}
              </div>

              <button
                onClick={() => onComplete(isCorrect)}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-sky-600 hover:bg-sky-700 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>TIẾP TỤC VÁN ĐẤU</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
