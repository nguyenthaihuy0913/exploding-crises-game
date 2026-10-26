import React, { useState, useEffect } from 'react';
import { Card, Team, ActionLog } from '../../types/game';
import { CardItem } from '../card/CardItem';
import { TeamIcon } from '../common/TeamIcon';
import { 
  Heart, 
  Layers, 
  Clock, 
  Eye, 
  EyeOff, 
  Play, 
  AlertCircle,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { HostObserverPanel } from './HostObserverPanel';
import { sound } from '../../utils/sound';

interface GameBoardProps {
  teams: Team[];
  currentTeamIndex: number;
  drawPile: Card[];
  discardPile: Card[];
  actionLogs: ActionLog[];
  onPlayCard: (card: Card) => void;
  onDrawCard: () => void;
  isHost?: boolean;
  onForceSkip?: () => void;
  onAdjustHp?: (teamId: string, delta: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  teams,
  currentTeamIndex,
  drawPile,
  discardPile,
  actionLogs,
  onPlayCard,
  onDrawCard,
  isHost = false,
  onForceSkip,
  onAdjustHp,
}) => {
  const currentTeam = teams[currentTeamIndex];
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isHandHidden, setIsHandHidden] = useState<boolean>(isHost);
  const [turnTimer, setTurnTimer] = useState<number>(20);
  const [isObserverOpen, setIsObserverOpen] = useState<boolean>(false);

  // Turn timer countdown
  useEffect(() => {
    setTurnTimer(20);
    setSelectedCardId(null);

    const timer = setInterval(() => {
      setTurnTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTeamIndex]);

  const selectedCard = currentTeam?.hand.find(c => c.id === selectedCardId);

  const handleCardClick = (card: Card) => {
    sound.playCardFlip();
    setSelectedCardId(prev => (prev === card.id ? null : card.id));
  };

  const handlePlaySelected = () => {
    if (!selectedCard) return;
    sound.playClick();
    onPlayCard(selectedCard);
    setSelectedCardId(null);
  };

  const handleDrawClick = () => {
    sound.playCardFlip();
    onDrawCard();
  };

  const lastDiscardedCard = discardPile.length > 0 ? discardPile[discardPile.length - 1] : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col gap-5">
      
      {/* Host Control Bar */}
      {isHost && (
        <div className="flex items-center justify-between bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-2xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Màn Hình Máy Chiếu (Host) • Đang giám sát {teams.length} đội</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsObserverOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Bảng Giám Sát & Chống Gian Lận (Host Panel)</span>
          </button>
        </div>
      )}

      {/* 1. Teams Status Header Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {teams.map((team, idx) => {
          const isCurrent = idx === currentTeamIndex;
          const isDead = !team.isAlive || team.hp <= 0;
          const tabCount = team.tabSwitches || 0;

          return (
            <div
              key={team.id}
              className={`p-3 rounded-xl border transition-all duration-200 relative overflow-hidden bg-white ${
                isDead
                  ? 'border-slate-200 opacity-40 bg-slate-50'
                  : isCurrent
                  ? 'border-sky-500 ring-2 ring-sky-100 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500" />
              )}
              
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                  <TeamIcon name={team.avatar} className="w-4 h-4" />
                </div>
                <div className="flex items-center space-x-0.5">
                  {[1, 2, 3].map((heartIdx) => (
                    <Heart
                      key={heartIdx}
                      className={`w-3.5 h-3.5 ${
                        heartIdx <= team.hp
                          ? 'fill-rose-500 text-rose-500'
                          : 'fill-slate-100 text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="font-bold text-xs text-slate-900 truncate mb-1" title={team.name}>
                {team.name}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center space-x-1">
                  <Layers className="w-3 h-3 text-slate-400" />
                  <span>{team.hand.length} lá</span>
                </span>
                
                {tabCount > 0 && (
                  <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300 animate-pulse" title={`Đã chuyển tab ${tabCount} lần`}>
                    ⚠️ {tabCount}
                  </span>
                )}

                {isCurrent && (
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                    Đến Lượt
                  </span>
                )}
                {isDead && (
                  <span className="text-[10px] font-bold text-rose-600 uppercase">
                    Bị Loại
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Central Tabletop (Arena) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Left: Action Ticker Log (3 Cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 h-64 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Nhật ký trận đấu
            </span>
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
            {actionLogs.length === 0 ? (
              <p className="text-slate-400 italic text-center py-8">Chưa có hành động nào...</p>
            ) : (
              actionLogs.map((log) => (
                <div key={log.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 leading-snug">
                  <span className="text-[10px] text-slate-400 font-mono block">{log.timestamp}</span>
                  <strong className="text-slate-900">{log.teamName}:</strong> <span className="text-slate-600">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Center: Draw Pile & Discard Pile (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-100/60 border border-slate-200 rounded-2xl p-6 sm:p-8 flex items-center justify-around relative">
          
          {/* Turn timer badge */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono shadow-2xs">
            <Clock className={`w-3.5 h-3.5 ${turnTimer <= 5 ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`} />
            <span className={turnTimer <= 5 ? 'text-rose-600 font-bold' : 'text-slate-700 font-medium'}>
              00:{turnTimer < 10 ? `0${turnTimer}` : turnTimer}
            </span>
          </div>

          {/* Central Draw Pile */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleDrawClick}
              className="w-40 h-56 rounded-xl border-2 border-dashed border-sky-300 bg-white p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-500 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-sm text-slate-800">
                CHỒNG BÀI RÚT
              </span>
              <span className="text-xs font-mono text-sky-700 font-bold mt-1">
                {drawPile.length} Lá còn lại
              </span>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Bấm để rút bài
              </span>
            </button>
          </div>

          {/* Discard Pile */}
          <div className="flex flex-col items-center">
            {lastDiscardedCard ? (
              <div className="w-40 h-56">
                <CardItem card={lastDiscardedCard} size="sm" showDetails={false} />
              </div>
            ) : (
              <div className="w-40 h-56 rounded-xl border border-slate-200 bg-white p-4 flex flex-col items-center justify-center text-center text-slate-400">
                <span className="text-xs font-mono">Chưa có bài bỏ</span>
              </div>
            )}
            <span className="text-[11px] font-mono text-slate-500 mt-2 font-medium">
              Bài vừa đánh ({discardPile.length})
            </span>
          </div>

        </div>

        {/* Right: Quick Guidance (3 Cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 h-64 flex flex-col justify-between text-xs text-slate-600 shadow-xs">
          <div>
            <div className="flex items-center space-x-1.5 text-slate-900 font-bold border-b border-slate-100 pb-2 mb-2">
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>Gợi ý Chiến thuật</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              • Đánh lá <strong className="text-sky-700">Analytical Scan</strong> để soi trước 3 lá bài đầu.<br/>
              • Nếu linh cảm rủi ro cao, dùng <strong className="text-purple-700">Paradigm Shift</strong> để xáo bài hoặc <strong className="text-slate-800">Skip</strong> để nhường lượt cho đội sau!
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800">
            🛡️ Nhớ giữ lá <strong>Backup Plan</strong> để phòng ngừa bất ngờ!
          </div>
        </div>

      </div>

      {/* 3. Bottom Player Hand Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        
        {/* Hand Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
              <TeamIcon name={currentTeam?.avatar || 'users'} className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {currentTeam?.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                  {currentTeam?.hand.length} Thẻ bài trên tay
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Thảo luận cùng nhóm và chọn lá bài phù hợp
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Privacy toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setIsHandHidden(!isHandHidden);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              {isHandHidden ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-sky-600" />
                  <span>Hiện bài</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ẩn bài (Bí mật)</span>
                </>
              )}
            </button>

            {/* Play Selected Card Button - Only for Pass & Play */}
            {!isHost && (
              <>
                <button
                  disabled={!selectedCard}
                  onClick={handlePlaySelected}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    selectedCard
                      ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs cursor-pointer'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Đánh lá đã chọn</span>
                </button>

                <button
                  onClick={handleDrawClick}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Rút bài & Kết thúc lượt</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Cards Hand Tray */}
        {isHandHidden ? (
          <div className="py-10 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <EyeOff className="w-7 h-7 mx-auto mb-2 text-slate-400" />
            <p className="text-xs font-medium">
              {isHost
                ? "Bài của nhóm đang được bảo mật trên laptop riêng của đội. Giảng viên/MC có thể bấm 'Hiện bài' để xem trên máy chiếu nếu cần."
                : "Bài của đội đang được ẩn để giữ bí mật chiến thuật. Bấm 'Hiện bài' để mở."}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 overflow-x-auto py-2 px-1">
            {currentTeam?.hand.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6">Đội chưa có thẻ bài nào trên tay.</p>
            ) : (
              currentTeam?.hand.map((card) => (
                <div key={card.id} className="shrink-0">
                  <CardItem
                    card={card}
                    size="sm"
                    isSelected={selectedCardId === card.id}
                    onClick={() => handleCardClick(card)}
                  />
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* Host Observer Panel Drawer */}
      {isHost && (
        <HostObserverPanel
          isOpen={isObserverOpen}
          onClose={() => setIsObserverOpen(false)}
          teams={teams}
          currentTeamIndex={currentTeamIndex}
          onForceSkip={onForceSkip || (() => {})}
          onAdjustHp={onAdjustHp || (() => {})}
        />
      )}

    </div>
  );
};
