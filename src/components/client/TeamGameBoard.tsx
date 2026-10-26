import React, { useState, useEffect } from 'react';
import { Card, Team } from '../../types/game';
import { CardItem } from '../card/CardItem';
import { TeamIcon } from '../common/TeamIcon';
import { Heart, Play, Layers, Clock, AlertCircle, Zap, ShieldCheck, Info, Flame } from 'lucide-react';
import { sound } from '../../utils/sound';

interface TeamGameBoardProps {
  myTeam: Team;
  currentTeamName: string;
  isMyTurn: boolean;
  extraTurns?: number;
  drawPileCount: number;
  lastDiscardedCard: Card | null;
  onPlayCard: (card: Card) => void;
  onDrawCard: () => void;
  onPlayNope?: () => void;
  onDismissAlert?: () => void;
  onTabSwitch?: () => void;
}

export const TeamGameBoard: React.FC<TeamGameBoardProps> = ({
  myTeam,
  currentTeamName,
  isMyTurn,
  extraTurns = 0,
  drawPileCount,
  lastDiscardedCard,
  onPlayCard,
  onDrawCard,
  onPlayNope,
  onDismissAlert,
  onTabSwitch,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [tabSwitches, setTabSwitches] = useState<number>(myTeam.tabSwitches || 0);
  const [showCheatWarning, setShowCheatWarning] = useState<boolean>(false);
  const lastSwitchRef = React.useRef<number>(0);

  // Play sound when a new targeted attack/effect alert is received
  useEffect(() => {
    if (myTeam.targetedAlert) {
      sound.playCrisisAlarm();
    }
  }, [myTeam.targetedAlert?.id]);

  // Tab switch detection (Anti-cheat) with 2.5s debounce to prevent spam on rapid focus events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const now = Date.now();
        if (now - lastSwitchRef.current < 2500) return;
        lastSwitchRef.current = now;

        setTabSwitches((prev) => {
          const next = prev + 1;
          setShowCheatWarning(true);
          sound.playCrisisAlarm();
          if (onTabSwitch) onTabSwitch();
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onTabSwitch]);

  const selectedCard = myTeam.hand.find((c) => c.id === selectedCardId);
  const hasNopeCard = myTeam.hand.some((c) => c.name.includes('Critical Objection'));

  const handleCardClick = (card: Card) => {
    sound.playCardFlip();
    setSelectedCardId((prev) => (prev === card.id ? null : card.id));
  };

  const handlePlaySelected = () => {
    if (!selectedCard) return;

    if (selectedCard.name.includes('Critical Objection')) {
      if (isUnderDouble && onPlayNope) {
        sound.playSuccess();
        onPlayNope();
        setSelectedCardId(null);
        return;
      }
      alert('Lá "Critical Objection (NOPE!)" dùng để phản biện và hủy bỏ chiêu khi đội bạn bị đối thủ tấn công!');
      return;
    }

    sound.playClick();
    onPlayCard(selectedCard);
    setSelectedCardId(null);
  };

  const handleDrawClick = () => {
    sound.playCardFlip();
    onDrawCard();
  };

  const isUnderDouble = Boolean(myTeam.isUnderDoubleAction || (isMyTurn && extraTurns > 0));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 sm:py-6 flex flex-col gap-5">
      
      {/* 0. Targeted Attack / Action Alert Banner */}
      {myTeam.targetedAlert && (
        <div className={`p-4 rounded-2xl border flex items-start justify-between shadow-md animate-in slide-in-from-top-2 duration-200 ${
          myTeam.targetedAlert.type === 'attack'
            ? 'bg-amber-50 border-amber-400 text-amber-950'
            : myTeam.targetedAlert.type === 'stolen'
            ? 'bg-rose-50 border-rose-400 text-rose-950'
            : myTeam.targetedAlert.type === 'shield'
            ? 'bg-teal-50 border-teal-400 text-teal-950'
            : 'bg-sky-50 border-sky-400 text-sky-950'
        }`}>
          <div className="flex items-start space-x-3.5">
            <div className={`p-2.5 rounded-xl text-white shrink-0 shadow-xs ${
              myTeam.targetedAlert.type === 'attack' ? 'bg-amber-600' :
              myTeam.targetedAlert.type === 'stolen' ? 'bg-rose-600' :
              myTeam.targetedAlert.type === 'shield' ? 'bg-teal-600' : 'bg-sky-600'
            }`}>
              {myTeam.targetedAlert.type === 'attack' ? <Zap className="w-5 h-5 animate-pulse" /> :
               myTeam.targetedAlert.type === 'stolen' ? <Flame className="w-5 h-5" /> :
               myTeam.targetedAlert.type === 'shield' ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-white border border-current shadow-2xs">
                  {myTeam.targetedAlert.cardName}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {myTeam.targetedAlert.timestamp}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold mt-1 leading-snug">
                {myTeam.targetedAlert.message}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4 shrink-0">
            {hasNopeCard && onPlayNope && (
              <button
                onClick={() => {
                  sound.playSuccess();
                  onPlayNope();
                }}
                className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center space-x-1 animate-pulse"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Dùng NOPE! chặn đòn</span>
              </button>
            )}
            <button
              onClick={onDismissAlert}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 shadow-xs border border-slate-200 cursor-pointer text-slate-800 transition-transform active:scale-95"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      {/* Anti-Cheat Alert Banner */}
      {showCheatWarning && (
        <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-2xl flex items-center justify-between text-xs text-amber-900 shadow-2xs animate-in fade-in">
          <div className="flex items-center space-x-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Cảnh Báo Anti-Cheat:</strong> Bạn vừa chuyển tab hoặc rời màn hình game! (Đã ghi nhận <strong>{tabSwitches} lần vi phạm</strong> và báo cáo về máy chiếu của giảng viên/MC).
            </span>
          </div>
          <button
            onClick={() => setShowCheatWarning(false)}
            className="text-amber-800 hover:text-amber-950 font-bold ml-3 px-2 py-1 rounded hover:bg-amber-100 cursor-pointer text-xs"
          >
            Đã hiểu
          </button>
        </div>
      )}

      {/* 1. Team Laptop Status Banner */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isMyTurn
          ? isUnderDouble
            ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-200'
            : 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-100'
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-800">
            <TeamIcon name={myTeam.avatar} className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Laptop Của Nhóm
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                {myTeam.hand.length} Thẻ trên tay
              </span>
              {myTeam.hasShield && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 border border-teal-200 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>KHIÊN BẢO VỆ</span>
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              {myTeam.name}
            </h2>
          </div>
        </div>

        {/* Hearts and Turn status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3].map((heartIdx) => (
              <Heart
                key={heartIdx}
                className={`w-4 h-4 ${
                  heartIdx <= myTeam.hp
                    ? 'fill-rose-500 text-rose-500'
                    : 'fill-slate-100 text-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="pl-3 border-l border-slate-200">
            {isMyTurn ? (
              isUnderDouble ? (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-extrabold shadow-xs animate-pulse">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>LƯỢT {extraTurns > 0 ? '1/2' : '2/2'} (DOUBLE ACTION)</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs animate-pulse">
                  <span>🎯 LƯỢT CỦA BẠN</span>
                </span>
              )
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Chờ {currentTeamName}...</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Compact Match Overview (No match log on client - kept on Host/Projector screen only) */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        
        {/* Draw pile & discard quick indicator (5 Cols) */}
        <div className="sm:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-around shadow-xs">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Chồng bài rút
            </span>
            <div className="w-16 h-20 rounded-lg bg-sky-50 border border-sky-200 flex flex-col items-center justify-center mx-auto shadow-2xs">
              <Layers className="w-5 h-5 text-sky-600 mb-0.5" />
              <span className="font-mono text-xs font-extrabold text-sky-700">{drawPileCount}</span>
            </div>
          </div>

          <div className="text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Bài vừa đánh
            </span>
            {lastDiscardedCard ? (
              <div className="w-16 h-20 rounded-lg bg-slate-50 border border-slate-200 p-1 flex flex-col justify-between text-center mx-auto">
                <span className="text-[9px] font-bold text-slate-800 line-clamp-2 leading-tight">
                  {lastDiscardedCard.name}
                </span>
                <span className="text-[8px] font-mono text-slate-400">{lastDiscardedCard.badge}</span>
              </div>
            ) : (
              <div className="w-16 h-20 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-400 mx-auto">
                Trống
              </div>
            )}
          </div>
        </div>

        {/* Team Status & Tactical Overview (7 Cols - Replaces public logs to maintain deck secrecy) */}
        <div className="sm:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="uppercase text-[10px] text-slate-400 font-bold tracking-wider">
              Trạng thái & Lợi thế chiến thuật
            </span>
            <span className="text-[10px] text-slate-400 italic">Bảo mật thông tin</span>
          </div>

          <div className="space-y-2">
            {isUnderDouble && isMyTurn ? (
              <div className="flex items-center space-x-2 text-amber-900 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl text-xs font-semibold">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Đang chịu hiệu ứng Double Action: Bạn phải rút bài <strong>{extraTurns > 0 ? '2 lần' : 'thêm 1 lần nữa'}</strong> để kết thúc lượt!
                </span>
              </div>
            ) : myTeam.hasShield ? (
              <div className="flex items-center space-x-2 text-teal-900 bg-teal-50 border border-teal-200 px-3 py-2 rounded-xl text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Khiên Kiên Cường đang bảo vệ: Đội bạn miễn nhiễm đòn cướp bài tiếp theo!</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
                <Info className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Mẹo SSA101: Giữ kín bài trên tay, các lá bài rút chỉ hiển thị bí mật với đội bạn!</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 leading-tight">
              {isMyTurn
                ? '🎯 Đang là lượt của đội bạn. Thảo luận nội bộ rồi chọn đánh bài hoặc rút bài.'
                : `⏳ Đang là lượt của ${currentTeamName}. Hãy chuẩn bị sẵn sàng khi đến lượt.`}
            </p>
          </div>
        </div>

      </div>

      {/* 3. Team's Secret Hand Tray (Main Focus) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        
        {/* Hand Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              Bộ Bài Bí Mật Của Nhóm Bạn
            </h3>
            <p className="text-xs text-slate-500">
              Chỉ các bạn trong nhóm nhìn thấy màn hình này. Thảo luận và click chọn lá bài:
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              disabled={!isMyTurn || !selectedCard}
              onClick={handlePlaySelected}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                isMyTurn && selectedCard
                  ? 'bg-sky-600 hover:bg-sky-700 text-white'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Đánh lá đã chọn</span>
            </button>

            <button
              disabled={!isMyTurn}
              onClick={handleDrawClick}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                isMyTurn
                  ? isUnderDouble
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200 animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <span>
                {isMyTurn && isUnderDouble
                  ? `Rút bài (Lượt ${extraTurns > 0 ? '1/2' : '2/2'})`
                  : 'Rút bài & Kết thúc lượt'}
              </span>
            </button>
          </div>
        </div>

        {/* Cards Hand Grid */}
        <div className="flex items-center gap-3.5 overflow-x-auto py-2 px-1">
          {myTeam.hand.length === 0 ? (
            <div className="w-full py-12 text-center text-slate-400 italic">
              Đội bạn chưa có lá bài nào trên tay.
            </div>
          ) : (
            myTeam.hand.map((card) => (
              <div key={card.id} className="shrink-0">
                <CardItem
                  card={card}
                  size="md"
                  isSelected={selectedCardId === card.id}
                  onClick={() => handleCardClick(card)}
                />
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
