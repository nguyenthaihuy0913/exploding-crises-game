import React from 'react';
import { Tv, Laptop, Gamepad2, Sparkles, BookOpen, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { sound } from '../../utils/sound';

interface MainMenuProps {
  onSelectHostMode: () => void;
  onSelectJoinMode: () => void;
  onSelectPassAndPlay: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRules: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onSelectHostMode,
  onSelectJoinMode,
  onSelectPassAndPlay,
  soundEnabled,
  onToggleSound,
  onOpenRules,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 lg:py-12 flex flex-col items-center">
      
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-3 shadow-2xs">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Môn SSA101 • Tư Duy Giải Quyết Vấn Đề Trong Kỷ Nguyên Số</span>
        </div>
        
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-sm shadow-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            EXPLODING CRISES
          </h1>
        </div>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Chuyển thể Board Game Mèo Nổ vào lớp học đại học. Rèn luyện tư duy phân tích, sáng tạo, phản biện và làm chủ các <strong className="text-emerald-700">Phương án dự phòng (Backup Plans)</strong>.
        </p>
      </div>

      {/* 3 Main Mode Selection Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        
        {/* Card 1: Host Mode (Projector) */}
        <div
          onClick={() => {
            sound.playClick();
            onSelectHostMode();
          }}
          className="bg-white border border-slate-200 hover:border-sky-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group card-hover-effect"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <div className="flex items-center space-x-2 mb-1.5">
              <h2 className="text-base font-bold text-slate-900 group-hover:text-sky-700">
                Tạo Phòng Máy Chiếu
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 uppercase">
                Host
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Dành cho máy tính cắm dây vào máy chiếu lớp học. Hiển thị mã phòng & QR Code để các laptop nhóm kết nối vào chơi chung.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
            <span>Khởi tạo phòng chơi</span>
            <span>→</span>
          </div>
        </div>

        {/* Card 2: Team Laptop Mode */}
        <div
          onClick={() => {
            sound.playClick();
            onSelectJoinMode();
          }}
          className="bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group card-hover-effect"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Laptop className="w-6 h-6" />
            </div>
            <div className="flex items-center space-x-2 mb-1.5">
              <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-700">
                Tham Gia Bằng Laptop Đội
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                Team
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Dành cho laptop của từng nhóm để trên bàn. Nhập mã phòng 4 ký tự, chọn đội và giữ kín toàn bộ thẻ bài của nhóm mình.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Nhập mã vào phòng</span>
            <span>→</span>
          </div>
        </div>

        {/* Card 3: Single Device Pass & Play */}
        <div
          onClick={() => {
            sound.playClick();
            onSelectPassAndPlay();
          }}
          className="bg-white border border-slate-200 hover:border-purple-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group card-hover-effect"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div className="flex items-center space-x-2 mb-1.5">
              <h2 className="text-base font-bold text-slate-900 group-hover:text-purple-700">
                Chơi Nhanh Trên 1 Máy
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 uppercase">
                Offline
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Chế độ Pass & Play truyền thống. Không cần kết nối mạng Wi-Fi giữa các máy, điều khiển tập trung ngay trên 1 màn hình.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
            <span>Bắt đầu ván Offline</span>
            <span>→</span>
          </div>
        </div>

      </div>

      {/* Classroom Rules & Quick Overview Banner */}
      <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs mb-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
              QUY TẮC PHÒNG HỌC & LUẬT CHƠI CỐT LÕI
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onOpenRules();
            }}
            className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center space-x-1 hover:underline cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Xem chi tiết luật</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-900 block font-bold mb-1">💻 1 Laptop / Bàn (4–5 SV)</strong>
            <p className="text-slate-600 leading-relaxed">
              Mỗi bàn chỉ dùng 1 máy tính đại diện. Khi 1 máy chọn đội, slot đó sẽ tự động <strong>khóa lại (🔒)</strong> trên các máy khác để tránh trùng lặp.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80">
            <strong className="text-rose-900 block font-bold mb-1">❤️ 1 Mạng Duy Nhất (1 HP)</strong>
            <p className="text-slate-600 leading-relaxed">
              Mỗi đội chỉ có 1 mạng sống. Rút trúng Crisis mà không có <strong>Backup Plan</strong> hoặc trả lời sai thử thách 7 bước là <strong>BỊ LOẠI NGAY</strong>!
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <strong className="text-amber-900 block font-bold mb-1">💣 Mật Độ Nổ Cao (10–14 Lá)</strong>
            <p className="text-slate-600 leading-relaxed">
              Chồng bài rút chứa từ 10–14 lá Khủng hoảng rình rập. Hãy dùng lá <em>Soi bài, Xáo bài, Skip</em> hoặc <em>Cướp bài</em> để bảo vệ mạng sống!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Settings & Rules Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => {
            sound.playClick();
            onOpenRules();
          }}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>Hướng dẫn Luật chơi & Bài học SSA101</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onToggleSound();
          }}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Âm thanh: BẬT</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Âm thanh: TẮT</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
