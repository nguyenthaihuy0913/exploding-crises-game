import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Play, Copy, Check, Tv, Users, Laptop, Wifi } from 'lucide-react';
import { Team } from '../../types/game';
import { TeamIcon } from '../common/TeamIcon';
import { sound } from '../../utils/sound';

interface HostWaitingRoomProps {
  roomCode: string;
  localIp: string;
  teams: Team[];
  onStartGame: () => void;
  onBackToMenu: () => void;
}

export const HostWaitingRoom: React.FC<HostWaitingRoomProps> = ({
  roomCode,
  localIp,
  teams,
  onStartGame,
  onBackToMenu,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Construct join URL using local network IP or window location
  const isLocalDev = typeof window !== 'undefined' && window.location.port === '3000';
  const joinUrl = typeof window !== 'undefined'
    ? (isLocalDev
        ? `${window.location.protocol}//${localIp || window.location.hostname}:3000/?room=${roomCode}`
        : `${window.location.origin}/?room=${roomCode}`)
    : `http://${localIp}:3000/?room=${roomCode}`;

  const handleCopyLink = () => {
    sound.playClick();
    navigator.clipboard.writeText(joinUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const connectedCount = teams.filter(t => t.connected).length;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 lg:py-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sound.playClick();
            if (window.confirm('Ông có chắc muốn đóng và hủy phòng chơi này không? Toàn bộ các máy đang kết nối sẽ được đưa về trang chủ.')) {
              onBackToMenu();
            }
          }}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center space-x-1.5 py-1.5 px-3 rounded-lg hover:bg-rose-50 transition-all cursor-pointer border border-rose-200"
        >
          <span>🔴 Đóng Phòng & Quay Lại Menu</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
          <Wifi className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Server Đồng Bộ Đang Hoạt Động</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Room Code & QR Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs text-center flex flex-col items-center">
          
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center mb-3">
            <Tv className="w-5 h-5" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Mã Phòng Chiếu
          </span>
          <div className="text-4xl sm:text-5xl font-mono font-extrabold text-slate-900 tracking-widest my-2 py-2 px-6 rounded-xl bg-slate-50 border border-slate-200">
            {roomCode}
          </div>
          <p className="text-xs text-slate-500 mb-5">
            Các nhóm mở trình duyệt trên laptop và quét mã hoặc truy cập link:
          </p>

          {/* QR Code SVG */}
          <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs mb-4">
            <QRCodeSVG
              value={joinUrl}
              size={180}
              level="M"
              includeMargin={false}
            />
          </div>

          {/* Direct link & Copy Button */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between text-xs font-mono text-slate-600 mb-2">
            <span className="truncate pr-2">{joinUrl}</span>
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 shrink-0 transition-all cursor-pointer shadow-2xs"
              title="Sao chép liên kết"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <span className="text-[10px] text-slate-400">
            💡 Laptop/Điện thoại các đội chỉ cần mở link hoặc quét mã QR để vào phòng
          </span>
        </div>

        {/* Right: Connected Teams Status Grid (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Danh Sách Laptop Các Đội</h2>
                  <p className="text-xs text-slate-500">
                    Đã kết nối: <strong className="text-emerald-700">{connectedCount} / {teams.length} Đội</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Teams Slot Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {teams.map((team, idx) => {
                return (
                  <div
                    key={team.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      team.connected
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                        team.connected
                          ? 'bg-white border-emerald-200 text-emerald-700 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}>
                        <TeamIcon name={team.avatar} className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${team.connected ? 'text-slate-900' : 'text-slate-500'}`}>
                          {team.name}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          Vị trí #{idx + 1}
                        </span>
                      </div>
                    </div>

                    <div>
                      {team.connected ? (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Laptop className="w-3 h-3" />
                          <span>Đã Online</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">
                          Chờ kết nối...
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Start CTA Button */}
          <div>
            <button
              disabled={connectedCount === 0}
              onClick={() => {
                if (connectedCount === 0) return;
                sound.playSuccess();
                onStartGame();
              }}
              className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base text-white transition-all shadow-sm flex items-center justify-center space-x-2 ${
                connectedCount > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed opacity-75'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>BẮT ĐẦU VÁN ĐẤU ({connectedCount} ĐỘI ONLINE)</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              {connectedCount === 0
                ? '⚠️ Vui lòng chờ ít nhất 1-2 đội quét mã kết nối để bắt đầu!'
                : connectedCount === 1
                ? 'ℹ️ Đang có 1 đội kết nối (khuyên dùng 2 đội trở lên để thi đấu).'
                : `✅ Ván đấu sẽ bắt đầu với đúng ${connectedCount} đội đã online (các đội vắng mặt sẽ được tự động bỏ qua).`}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
