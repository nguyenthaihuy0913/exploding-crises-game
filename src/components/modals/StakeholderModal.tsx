import React from 'react';
import { Team } from '../../types/game';
import { TeamIcon } from '../common/TeamIcon';
import { Users, Shield, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/sound';

interface StakeholderModalProps {
  currentTeam: Team;
  teams: Team[];
  onSelectTargetTeam: (targetTeamId: string) => void;
  onCancel: () => void;
}

export const StakeholderModal: React.FC<StakeholderModalProps> = ({
  currentTeam,
  teams,
  onSelectTargetTeam,
  onCancel,
}) => {
  const validOpponents = teams.filter(
    t => t.id !== currentTeam.id && t.isAlive && t.hp > 0 && t.hand.length > 0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4 mb-4">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              Stakeholder Empathy • Thấu hiểu & Đàm phán
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Chọn Đội Để Đàm Phán Lấy Thẻ Bài
            </h2>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Đại diện cho góc nhìn các bên liên quan (Stakeholders), hãy chọn một đội đối thủ để đàm phán chuyển giao 1 thẻ bài ngẫu nhiên:
        </p>

        {/* Teams List */}
        <div className="space-y-2.5 mb-6">
          {validOpponents.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">
              Không có đội đối thủ nào còn thẻ bài trên tay để đàm phán!
            </p>
          ) : (
            validOpponents.map((team) => (
              <button
                key={team.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTargetTeam(team.id);
                }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-indigo-600">
                    <TeamIcon name={team.avatar} className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-700">
                      {team.name}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {team.hand.length} lá bài • {team.hp} HP
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {team.hasShield && (
                    <span className="flex items-center space-x-1 text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      <Shield className="w-3 h-3" />
                      <span>Có Khiên</span>
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Cancel */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onCancel();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Hủy thao tác
          </button>
        </div>

      </div>
    </div>
  );
};
