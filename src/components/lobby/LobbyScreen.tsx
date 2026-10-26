import React, { useState } from 'react';
import { Users, Play, ShieldAlert, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { CardItem } from '../card/CardItem';
import { TeamIcon } from '../common/TeamIcon';
import { CRISIS_CARDS_DATA, DEFENSE_CARDS_DATA, SKILL_CARDS_DATA } from '../../data/cards';
import { sound } from '../../utils/sound';

interface LobbyScreenProps {
  onStartGame: (teamCount: number, teamNames: string[], teamIcons: string[]) => void;
}

const DEFAULT_TEAM_NAMES = [
  'Đội Tư Duy Phân Tích',
  'Đội Sáng Tạo Đột Phá',
  'Đội Phản Biện Sắc Bén',
  'Đội Đàm Phán Stakeholder',
  'Đội Thích Ứng Linh Hoạt',
  'Đội Phương Án Dự Phòng',
];

const TEAM_ICON_KEYS = ['compass', 'brain', 'target', 'users', 'shield', 'lightbulb'];
const TEAM_LIGHT_COLORS = [
  'bg-sky-50/70 border-sky-200 text-sky-800',
  'bg-purple-50/70 border-purple-200 text-purple-800',
  'bg-amber-50/70 border-amber-200 text-amber-900',
  'bg-indigo-50/70 border-indigo-200 text-indigo-800',
  'bg-emerald-50/70 border-emerald-200 text-emerald-800',
  'bg-rose-50/70 border-rose-200 text-rose-800',
];

export const LobbyScreen: React.FC<LobbyScreenProps> = ({ onStartGame }) => {
  const [teamCount, setTeamCount] = useState<number>(5);
  const [teamNames, setTeamNames] = useState<string[]>(DEFAULT_TEAM_NAMES);

  const handleNameChange = (index: number, val: string) => {
    const updated = [...teamNames];
    updated[index] = val;
    setTeamNames(updated);
  };

  const handleResetNames = () => {
    sound.playClick();
    setTeamNames(DEFAULT_TEAM_NAMES);
  };

  const handleStart = () => {
    sound.playSuccess();
    onStartGame(teamCount, teamNames.slice(0, teamCount), TEAM_ICON_KEYS.slice(0, teamCount));
  };

  // Sample preview cards
  const previewCards = [
    { ...CRISIS_CARDS_DATA[0], id: 'sample-1' },
    { ...DEFENSE_CARDS_DATA[0].card, id: 'sample-2' },
    { ...SKILL_CARDS_DATA[0].card, id: 'sample-3' },
    { ...SKILL_CARDS_DATA[2].card, id: 'sample-4' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 lg:py-10">
      
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Mô phỏng tư duy giải quyết vấn đề SSA101 • Dành cho lớp học 20–30 sinh viên</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
          EXPLODING CRISIS
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Trải nghiệm chiến thuật rủi ro dựa trên cơ chế Mèo Nổ. 
          Rút bài, đối mặt khủng hoảng bất ngờ và học cách xoay chuyển tình thế với <span className="text-emerald-700 font-semibold">Phương án dự phòng (Backup Plans)</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Team Setup (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-sky-50 border border-sky-100 text-sky-700">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Cấu hình Đội chơi</h2>
                <p className="text-xs text-slate-500">Phù hợp 4–6 đội (mỗi đội 4–5 bạn)</p>
              </div>
            </div>
            
            <button
              onClick={handleResetNames}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 py-1 px-2.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tên mặc định</span>
            </button>
          </div>

          {/* Team count selector */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Số lượng đội thi đấu: <span className="text-sky-700 font-bold">{teamCount} Đội</span>
            </label>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    sound.playClick();
                    setTeamCount(num);
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                    teamCount === num
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {num} Đội
                </button>
              ))}
            </div>
          </div>

          {/* Team names list */}
          <div className="space-y-3 mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Tên & Biểu tượng các Đội:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teamNames.slice(0, teamCount).map((name, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-3 rounded-xl border ${TEAM_LIGHT_COLORS[idx]}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                    <TeamIcon name={TEAM_ICON_KEYS[idx]} className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleNameChange(idx, e.target.value)}
                      placeholder={`Đội ${idx + 1}`}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">3 HP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Start CTA Button */}
          <button
            onClick={handleStart}
            className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm sm:text-base text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>BẮT ĐẦU VÁN ĐẤU TRÊN MÁY CHIẾU</span>
          </button>
        </div>

        {/* Right Column: Card Preview & Rules Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card Showcase */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Xem trước Thẻ bài Mẫu (Phong cách Tối giản)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {previewCards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  size="sm"
                  showDetails={false}
                />
              ))}
            </div>
          </div>

          {/* Quick Rules Snapshot */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Quy tắc Ván đấu Lớp học
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Mỗi đội khởi đầu với <strong>1 Backup Plan</strong> + 3 lá Kỹ năng.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                <span>Đến lượt: Cả đội hội ý 20s, đánh bài hoặc <strong>Rút bài</strong>.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                <span>Rút phải <strong>Crisis</strong>: Dùng Backup Plan trong 10s hoặc trả lời câu hỏi 7 bước để cứu nguy!</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
