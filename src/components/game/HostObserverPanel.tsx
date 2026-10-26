import React, { useState } from 'react';
import { Team, Card } from '../../types/game';
import { TeamIcon } from '../common/TeamIcon';
import { CardItem } from '../card/CardItem';
import { 
  ShieldAlert, 
  Eye, 
  FastForward, 
  Plus, 
  Minus, 
  X, 
  Laptop, 
  AlertTriangle 
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface HostObserverPanelProps {
  teams: Team[];
  currentTeamIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onForceSkip: () => void;
  onAdjustHp: (teamId: string, delta: number) => void;
}

export const HostObserverPanel: React.FC<HostObserverPanelProps> = ({
  teams,
  currentTeamIndex,
  isOpen,
  onClose,
  onForceSkip,
  onAdjustHp,
}) => {
  const [inspectTeamId, setInspectTeamId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Bảng Giám Sát & Điều Khiển Chủ Phòng
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 uppercase">
                  Host Admin
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Theo dõi phát hiện chuyển tab (Anti-cheat), soi bài bí mật và can thiệp ván đấu
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Host Actions Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-700">
              Đội đang tới lượt: <strong className="text-slate-900 font-bold">{teams[currentTeamIndex]?.name}</strong>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onForceSkip();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
                title="Bỏ lượt của đội hiện tại nếu đội đó câu giờ"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Cưỡng Chế Bỏ Lượt</span>
              </button>
            </div>
          </div>

          {/* Teams Monitoring Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Giám Sát Trạng Thái & Chống Gian Lận (Anti-Cheat):
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {teams.map((team, idx) => {
                const isCurrent = idx === currentTeamIndex;
                const tabCount = team.tabSwitches || 0;
                const hasCheated = tabCount > 0;

                return (
                  <div
                    key={team.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      hasCheated
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-white border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                          <TeamIcon name={team.avatar} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                            <span>{team.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-700 uppercase">
                                Lượt này
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {team.hand.length} thẻ bài • {team.hp} HP
                          </span>
                        </div>
                      </div>

                      {/* Anti-Cheat Tab-Switch Indicator */}
                      <div>
                        {hasCheated ? (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-amber-700" />
                            <span>Rời tab: {tabCount} lần!</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Laptop className="w-3 h-3" />
                            <span>Tập trung 100%</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Controls per Team: HP adjust & Inspect cards */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] text-slate-500 mr-1">Chỉnh HP:</span>
                        <button
                          onClick={() => {
                            sound.playClick();
                            onAdjustHp(team.id, -1);
                          }}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 border border-slate-200 flex items-center justify-center cursor-pointer"
                          title="Trừ 1 HP"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-slate-900 px-1">{team.hp}</span>
                        <button
                          onClick={() => {
                            sound.playClick();
                            onAdjustHp(team.id, 1);
                          }}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 border border-slate-200 flex items-center justify-center cursor-pointer"
                          title="Cộng 1 HP"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Inspect cards button */}
                      <button
                        onClick={() => {
                          sound.playClick();
                          setInspectTeamId(inspectTeamId === team.id ? null : team.id);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border flex items-center space-x-1 transition-all cursor-pointer ${
                          inspectTeamId === team.id
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>{inspectTeamId === team.id ? 'Ẩn bài' : 'Soi bài bí mật'}</span>
                      </button>
                    </div>

                    {/* Inspected Cards Drawer */}
                    {inspectTeamId === team.id && (
                      <div className="mt-3 pt-3 border-t border-dashed border-slate-200 animate-in fade-in">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                          Thẻ bài trên tay {team.name} ({team.hand.length} lá):
                        </span>
                        {team.hand.length === 0 ? (
                          <p className="text-[11px] text-slate-400 italic">Đội chưa có thẻ bài nào.</p>
                        ) : (
                          <div className="flex items-center gap-2 overflow-x-auto py-1">
                            {team.hand.map((card: Card) => (
                              <div key={card.id} className="shrink-0 scale-90 origin-left">
                                <CardItem card={card} size="sm" showDetails={false} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer shadow-xs"
          >
            ĐÓNG BẢNG ĐIỀU KHIỂN
          </button>
        </div>

      </div>
    </div>
  );
};
