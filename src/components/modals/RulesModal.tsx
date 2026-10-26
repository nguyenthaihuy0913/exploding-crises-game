import React from 'react';
import { X, ShieldCheck, AlertTriangle, Eye, Ban, Shuffle, Users } from 'lucide-react';
import { sound } from '../../utils/sound';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Luật Chơi & Căn Cứ Lý Thuyết SSA101
            </h2>
            <p className="text-xs text-slate-500">
              Chuyển thể cơ chế Mèo Nổ (Exploding Kittens) vào môn Tư duy Giải quyết Vấn đề
            </p>
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

        {/* Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          
          {/* Section 1: Objective */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span>1. Mục tiêu Ván đấu</span>
            </h3>
            <p>
              Tất cả các đội cùng rút bài từ một chồng bài chung (Draw Pile). Mục tiêu là sống sót đến cuối cùng bằng cách quản lý tài nguyên, phán đoán rủi ro và tận dụng tối đa các lá <strong>Backup Plan</strong>.
            </p>
          </div>

          {/* Section 2: Cards Taxonomy */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>2. Ý nghĩa các Nhóm Thẻ Bài</span>
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-800">Exploding Crisis (Khủng hoảng rủi ro):</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Mô phỏng các sự cố bất ngờ ngoài dự kiến (Sự cố cafe, Apollo 13, đình công, xe hỏng...). Mỗi đội chỉ sở hữu 1 mạng duy nhất! Rút trúng lá này mà không có Backup Plan sẽ phải giải cứu bằng câu hỏi tình huống 7 bước, nếu sai sẽ bị nổ tung và loại khỏi ván đấu ngay lập tức.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-800">Backup Plan: Plan B (Phương án dự phòng):</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Vô hiệu hóa ngay lập tức lá Crisis và cho phép giấu lại Crisis vào bất kỳ vị trí bí mật nào trong chồng bài. Minh chứng cho bài học: <em>Khi kế hoạch ban đầu gặp sự cố, phương án dự phòng giúp giữ vững sự chủ động và khả năng thích ứng</em>.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-start space-x-3">
                <Eye className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sky-800">Analytical Scan (Tư duy Phân tích):</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Soi trước 3 lá bài đầu của chồng rút để nhận diện rủi ro trước khi ra quyết định.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-start space-x-3">
                <Shuffle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-800">Creative Paradigm Shift (Tư duy Sáng tạo):</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Xáo trộn lại toàn bộ chồng bài chung, phá vỡ trật tự cũ để tạo cơ hội mới.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3">
                <Ban className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-800">Critical Objection - NOPE! (Tư duy Phản biện):</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Chặn đứng hành động của đội khác. Đội khác có thể đánh tiếp 1 lá NOPE để phản biện lại sự phản biện!
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 flex items-start space-x-3">
                <Users className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-800">Stakeholder Empathy (Dung hòa góc nhìn):</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Đàm phán lấy 1 lá bài từ đội khác dựa trên góc nhìn 4 bên: Sinh viên, Giảng viên, Nhân viên, Ban quản lý.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Game Flow */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>3. Tiến trình một lượt chơi</span>
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600">
              <li>Đến lượt: Cả đội có 20s để thảo luận chiến thuật.</li>
              <li>Có thể đánh 0 hoặc nhiều lá bài kỹ năng trên tay.</li>
              <li>Kết thúc lượt bằng cách bấm <strong>Rút 1 lá bài</strong> từ chồng chung (trừ khi dùng lá Skip Turn).</li>
            </ol>
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
            ĐÃ HIỂU LUẬT
          </button>
        </div>

      </div>
    </div>
  );
};
