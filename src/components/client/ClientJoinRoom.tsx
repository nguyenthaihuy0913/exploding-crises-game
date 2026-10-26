import React, { useState, useEffect } from 'react';
import { Laptop, ArrowRight, CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { Team, RoomState } from '../../types/game';
import { TeamIcon } from '../common/TeamIcon';
import { sound } from '../../utils/sound';

interface ClientJoinRoomProps {
  initialRoomCode?: string;
  onJoinRoom: (roomCode: string, teamId: string) => void;
  onBackToMenu: () => void;
  roomState: RoomState | null;
  selectedTeam: Team | null;
}

export const ClientJoinRoom: React.FC<ClientJoinRoomProps> = ({
  initialRoomCode = '',
  onJoinRoom,
  onBackToMenu,
  roomState,
  selectedTeam,
}) => {
  const [inputCode, setInputCode] = useState<string>(initialRoomCode);
  const [chosenTeamId, setChosenTeamId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialRoomCode) {
      setInputCode(initialRoomCode.toUpperCase());
    }
  }, [initialRoomCode]);

  const handleSelectTeam = (teamId: string) => {
    sound.playClick();
    setChosenTeamId(teamId);
    setErrorMsg(null);
  };

  const handleConfirmJoin = () => {
    if (!inputCode.trim()) {
      setErrorMsg('Vui lòng nhập mã phòng!');
      return;
    }
    if (!chosenTeamId) {
      setErrorMsg('Vui lòng chọn đội của nhóm mình!');
      return;
    }

    sound.playSuccess();
    onJoinRoom(inputCode.trim().toUpperCase(), chosenTeamId);
  };

  // If already joined and waiting for Host to start
  if (selectedTeam && roomState?.phase === 'lobby') {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-12 text-center animate-in fade-in">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-2xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Đã Kết Nối Thành Công
          </span>

          <h2 className="text-xl font-extrabold text-slate-900 mt-3 mb-1">
            {selectedTeam.name}
          </h2>
          <p className="text-xs text-slate-500 font-mono mb-6">
            Phòng: <strong>{roomState.code}</strong> • Laptop Nhóm
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center space-x-2 text-xs text-slate-600 mb-6">
            <Clock className="w-4 h-4 text-sky-600 animate-spin" />
            <span>Đang chờ Host bắt đầu ván đấu trên máy chiếu...</span>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-left text-xs text-sky-900 leading-relaxed">
            <div className="flex items-center space-x-1.5 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              <span>Gợi ý chiến thuật SSA101:</span>
            </div>
            <span>Các bạn trong nhóm hãy chụm lại bàn bạc. Mỗi đội sẽ nhận 1 lá <strong>Backup Plan</strong>, hãy giữ thật chặt để phòng thân!</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8 lg:py-12">
      
      {/* Top Back Navigation */}
      <button
        onClick={() => {
          sound.playClick();
          onBackToMenu();
        }}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-all mb-6 cursor-pointer"
      >
        <span>← Quay lại Menu</span>
      </button>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Kết Nối Laptop Của Đội</h1>
            <p className="text-xs text-slate-500">Tham gia phòng chơi đang hiển thị trên máy chiếu</p>
          </div>
        </div>

        {/* Room Code Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Mã phòng (4 ký tự trên máy chiếu):
          </label>
          <input
            type="text"
            maxLength={6}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="VD: SSA1"
            className="w-full text-center font-mono font-extrabold text-2xl tracking-widest bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 focus:outline-none focus:border-emerald-500 transition-all uppercase"
          />
        </div>

        {/* Team Selection Slots */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Chọn Đội Của Nhóm Mình:
          </label>

          {roomState?.teams ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {roomState.teams.map((team) => {
                const isSelected = chosenTeamId === team.id;
                return (
                  <button
                    key={team.id}
                    onClick={() => handleSelectTeam(team.id)}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-100 text-emerald-950 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <TeamIcon name={team.avatar} className="w-4 h-4 text-slate-700" />
                    </div>
                    <div className="flex-1 truncate">
                      <div className="text-xs font-bold truncate">{team.name}</div>
                      <span className="text-[10px] text-slate-400">
                        {team.connected ? '(Đang có máy kết nối)' : 'Sẵn sàng'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Fallback generic 5 teams selection if roomState not fetched yet */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'team-1', name: 'Đội Tư Duy Phân Tích', icon: 'compass' },
                { id: 'team-2', name: 'Đội Sáng Tạo Đột Phá', icon: 'brain' },
                { id: 'team-3', name: 'Đội Phản Biện Sắc Bén', icon: 'target' },
                { id: 'team-4', name: 'Đội Đàm Phán Stakeholder', icon: 'users' },
                { id: 'team-5', name: 'Đội Phương Án Dự Phòng', icon: 'shield' },
              ].map((team) => {
                const isSelected = chosenTeamId === team.id;
                return (
                  <button
                    key={team.id}
                    onClick={() => handleSelectTeam(team.id)}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-100 text-emerald-950 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <TeamIcon name={team.icon} className="w-4 h-4 text-slate-700" />
                    </div>
                    <div className="flex-1 truncate">
                      <div className="text-xs font-bold truncate">{team.name}</div>
                      <span className="text-[10px] text-slate-400">Chọn vị trí này</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Confirm Join Button */}
        <button
          onClick={handleConfirmJoin}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>VÀO PHÒNG CHỜ CỦA ĐỘI</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
