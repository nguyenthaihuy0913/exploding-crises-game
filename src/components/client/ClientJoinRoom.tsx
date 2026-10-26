import React, { useState, useEffect } from 'react';
import { Laptop, ArrowRight, CheckCircle2, Clock, ShieldCheck, AlertCircle, Users, Lock, BookOpen } from 'lucide-react';
import { Team, RoomState } from '../../types/game';
import { TeamIcon } from '../common/TeamIcon';
import { sound } from '../../utils/sound';
import { socket } from '../../utils/socket';

interface ClientJoinRoomProps {
  initialRoomCode?: string;
  onJoinRoom: (roomCode: string, teamId: string) => void;
  onBackToMenu: () => void;
  onOpenRules?: () => void;
  roomState: RoomState | null;
  selectedTeam: Team | null;
}

export const ClientJoinRoom: React.FC<ClientJoinRoomProps> = ({
  initialRoomCode = '',
  onJoinRoom,
  onBackToMenu,
  onOpenRules,
  roomState,
  selectedTeam,
}) => {
  const [inputCode, setInputCode] = useState<string>(initialRoomCode);
  const [chosenTeamId, setChosenTeamId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [liveRoom, setLiveRoom] = useState<RoomState | null>(roomState);

  useEffect(() => {
    if (initialRoomCode) {
      setInputCode(initialRoomCode.toUpperCase());
    }
  }, [initialRoomCode]);

  useEffect(() => {
    if (roomState) setLiveRoom(roomState);
  }, [roomState]);

  // Query live room state when 4-letter code is entered or changes
  useEffect(() => {
    const cleanCode = inputCode.trim().toUpperCase();
    if (cleanCode.length === 4) {
      socket.emit('room:get_state', { roomCode: cleanCode }, (res: { success: boolean; roomState?: RoomState }) => {
        if (res?.success && res.roomState) {
          setLiveRoom(res.roomState);
          setErrorMsg(null);
        }
      });
    }
  }, [inputCode]);

  // Listen to real-time room updates (so slots lock live as other tables join)
  useEffect(() => {
    const handleRoomUpdated = (updated: RoomState) => {
      if (updated.code === inputCode.trim().toUpperCase()) {
        setLiveRoom(updated);
      }
    };
    socket.on('room:updated', handleRoomUpdated);
    return () => {
      socket.off('room:updated', handleRoomUpdated);
    };
  }, [inputCode]);

  const handleSelectTeam = (team: Team) => {
    if (team.connected) {
      sound.playCrisisAlarm();
      setErrorMsg(`Đội "${team.name}" đã có bàn khác kết nối! Mỗi bàn 4-5 bạn chỉ dùng 1 laptop đại diện.`);
      return;
    }
    sound.playClick();
    setChosenTeamId(team.id);
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
      <div className="w-full max-w-md mx-auto px-4 py-8 sm:py-12 text-center animate-in fade-in">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          
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

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center space-x-2 text-xs text-slate-600 mb-5">
            <Clock className="w-4 h-4 text-sky-600 animate-spin" />
            <span>Đang chờ Host bắt đầu ván đấu trên máy chiếu...</span>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-left text-xs text-sky-900 leading-relaxed mb-6">
            <div className="flex items-center space-x-1.5 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              <span>Gợi ý chiến thuật SSA101:</span>
            </div>
            <span>Các bạn trong nhóm hãy chụm lại bàn bạc. Mỗi đội chỉ có <strong>1 Mạng duy nhất</strong>! Hãy tranh thủ đọc nhanh luật chơi và tác dụng các thẻ bài bên dưới.</span>
          </div>

          {/* Action button to view rules while waiting */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenRules?.();
            }}
            className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-600/25 flex items-center justify-center space-x-2.5 cursor-pointer transition-all active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Xem Luật Chơi & Chiến Thuật (Khuyên Đọc)</span>
          </button>

          <p className="text-[11px] text-slate-400 mt-3">
            💡 Tranh thủ lúc chờ giảng viên bấm bắt đầu, hãy đọc nhanh luật chơi và chức năng các lá bài nhé!
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8 lg:py-12">
      
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sound.playClick();
            onBackToMenu();
          }}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
        >
          <span>← Quay lại Menu</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenRules?.();
          }}
          className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center space-x-1.5 py-1.5 px-3 rounded-lg hover:bg-sky-50 transition-all cursor-pointer border border-sky-200"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Xem Luật Chơi</span>
        </button>
      </div>

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

        {/* Table Rule Notice */}
        <div className="mb-5 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-start space-x-2.5 text-xs text-amber-900 leading-relaxed shadow-2xs">
          <Users className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Quy tắc lớp học:</strong> Mỗi bàn (4–5 sinh viên) chỉ sử dụng <strong>1 laptop duy nhất</strong> đại diện cho nhóm. Khi một bàn đã chọn đội, slot đó sẽ <strong>tự động khóa lại (🔒)</strong> trên các máy khác để tránh trùng lặp!
          </span>
        </div>

        {/* Team Selection Slots */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Chọn Đội Của Nhóm Mình:
          </label>

          {liveRoom?.teams ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {liveRoom.teams.map((team) => {
                const isSelected = chosenTeamId === team.id;
                const isTaken = Boolean(team.connected);
                return (
                  <button
                    key={team.id}
                    type="button"
                    disabled={isTaken}
                    onClick={() => handleSelectTeam(team)}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                      isTaken
                        ? 'bg-slate-100/80 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed select-none'
                        : isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-100 text-emerald-950 shadow-2xs cursor-pointer'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 cursor-pointer'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      {isTaken ? (
                        <Lock className="w-4 h-4 text-slate-400" />
                      ) : (
                        <TeamIcon name={team.avatar} className="w-4 h-4 text-slate-700" />
                      )}
                    </div>
                    <div className="flex-1 truncate">
                      <div className={`text-xs font-bold truncate ${isTaken ? 'line-through text-slate-400' : ''}`}>
                        {team.name}
                      </div>
                      <span className={`text-[10px] font-semibold ${
                        isTaken ? 'text-rose-600 font-bold' : isSelected ? 'text-emerald-700 font-bold' : 'text-slate-500'
                      }`}>
                        {isTaken ? '🔒 Đã có bàn chọn' : isSelected ? '✓ Đang chọn đội này' : '🟢 Đang trống (Bấm chọn)'}
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
                { id: 'team-1', name: 'Đội Tư Duy Phân Tích', avatar: 'compass' },
                { id: 'team-2', name: 'Đội Sáng Tạo Đột Phá', avatar: 'brain' },
                { id: 'team-3', name: 'Đội Phản Biện Sắc Bén', avatar: 'target' },
                { id: 'team-4', name: 'Đội Đàm Phán Stakeholder', avatar: 'users' },
                { id: 'team-5', name: 'Đội Phương Án Dự Phòng', avatar: 'shield' },
              ].map((team) => {
                const isSelected = chosenTeamId === team.id;
                return (
                  <button
                    key={team.id}
                    type="button"
                    onClick={() => handleSelectTeam(team as Team)}
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
