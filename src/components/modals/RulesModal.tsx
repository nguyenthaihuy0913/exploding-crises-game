import React from 'react';
import { X, ShieldCheck, AlertTriangle, Eye, Ban, Shuffle, Users, Heart, Zap, Play, ShieldAlert } from 'lucide-react';
import { sound } from '../../utils/sound';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-sm shadow-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Luật Chơi & Hướng Dẫn Vận Hành SSA101
              </h2>
              <p className="text-xs text-slate-500">
                Mô phỏng tư duy xử lý rủi ro và giải quyết vấn đề lấy cảm hứng từ Exploding Kittens
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          
          {/* CRITICAL CORE RULES CALLOUT BOX */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50 border-2 border-rose-200/80 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-rose-900 font-black text-sm uppercase tracking-wide">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>3 NGUYÊN TẮC CỐT TỬ CẦN NẮM RÕ TRƯỚC KHI BẮT ĐẦU:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/90 p-3 rounded-xl border border-rose-200 text-xs">
                <div className="font-extrabold text-rose-700 flex items-center space-x-1.5 mb-1">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span>1 MẠNG SỐNG DUY NHẤT</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Mỗi đội bắt đầu với <strong>đúng 1 HP</strong>. Rút trúng lá Khủng hoảng (Crisis) mà không gỡ được là <strong>BỊ LOẠI KHỎI VÁN ĐẤU NGAY LẬP TỨC</strong>!
                </p>
              </div>

              <div className="bg-white/90 p-3 rounded-xl border border-amber-200 text-xs">
                <div className="font-extrabold text-amber-800 flex items-center space-x-1.5 mb-1">
                  <Users className="w-4 h-4 text-amber-700" />
                  <span>1 LAPTOP / BÀN HỌC</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Mỗi bàn 4–5 sinh viên chỉ mở <strong>1 laptop đại diện</strong>. Cả bàn cùng chụm lại bàn luận chiến thuật bí mật và thao tác.
                </p>
              </div>

              <div className="bg-white/90 p-3 rounded-xl border border-sky-200 text-xs">
                <div className="font-extrabold text-sky-800 flex items-center space-x-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                  <span>PHƯƠNG ÁN DỰ PHÒNG</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Mỗi đội được phát sẵn 1 lá <strong>Backup Plan</strong> khởi đầu. Đây là tấm bùa hộ mệnh duy nhất để vô hiệu hóa lá nổ Crisis!
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Detailed Game Flow */}
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-3 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>1. Tiến Trình Một Lượt Chơi (Game Loop)</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-slate-900">Bắt đầu lượt (Có chuông & Pop-up báo hiệu):</strong>
                  <p className="text-slate-600 mt-0.5">
                    Màn hình laptop của đội bạn sẽ phát tiếng chuông và hiện pop-up <em>"🎯 ĐẾN LƯỢT ĐỘI BẠN!"</em>. Cả nhóm có thể thoải mái bàn bạc và đưa ra quyết định chung.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-slate-900">Giai đoạn hành động (Đánh thẻ bài tùy ý):</strong>
                  <p className="text-slate-600 mt-0.5">
                    Đội được quyền đánh <strong>0, 1 hoặc nhiều lá bài kỹ năng</strong> trên tay (như Soi bài, Xáo bài, Cướp bài, Ép đối thủ rút 2 lượt...). Nếu không muốn đánh lá nào thì có thể chuyển thẳng sang bước rút bài.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-slate-900">Kết thúc lượt (Bắt buộc phải Rút 1 lá bài từ chồng chung):</strong>
                  <p className="text-slate-600 mt-0.5">
                    Trừ khi đội đã đánh lá <em>Skip Turn</em>, lượt chơi chỉ kết thúc khi đội bấm nút <strong>"Rút bài & Kết thúc lượt"</strong> từ chồng bài rút chung trên máy chiếu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Crisis & Lifesaver Rules */}
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-3 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span>2. Cơ Chế Khi Rút Trúng Lá Nổ (Exploding Crisis)</span>
            </h3>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <p className="font-semibold text-rose-950">
                Khi rút phải lá Crisis, còi báo động sẽ rú lên và đếm ngược 10 giây khẩn cấp. Sẽ có 2 kịch bản:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-700 block mb-1">
                    🟢 Trường hợp 1: Có thẻ "Backup Plan"
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Bấm nút <strong>"DÙNG LÁ BACKUP PLAN ĐỂ GỠ BÀI"</strong>. Bom được hóa giải ngay lập tức! Đội được quyền bí mật chọn nhét lại lá Crisis vào: <em>Trên cùng (để bẫy đội kế tiếp), Ở giữa, Dưới đáy hoặc Ngẫu nhiên</em>.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-rose-200 text-xs">
                  <span className="font-bold text-rose-700 block mb-1">
                    🔴 Trường hợp 2: HẾT thẻ "Backup Plan"
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Đội phải bước vào <strong>Thử thách 7 bước SSA101</strong> với 20 giây đếm ngược:
                    <br />• <strong>Trả lời ĐÚNG:</strong> Cứu mạng thành công, bảo toàn 1 HP!
                    <br />• <strong>Trả lời SAI hoặc HẾT GIỜ:</strong> Nổ tung, mất mạng và <strong>BỊ LOẠI KHỎI VÁN ĐẤU</strong>!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: All Card Types */}
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-3 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
              <span>3. Cẩm Nang Chi Tiết Các Loại Thẻ Bài</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <strong className="text-rose-900 flex items-center space-x-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Exploding Crisis (10–14 lá)</span>
                </strong>
                <p className="text-xs text-slate-600 mt-1">
                  Mô phỏng rủi ro thực tế (Sự cố cafe, Apollo 13, xe hỏng, thi trùng lịch làm...). Rút trúng là nguy cơ bị loại ngay lập tức.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <strong className="text-emerald-900 flex items-center space-x-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Backup Plan - Plan B (8 lá)</span>
                </strong>
                <p className="text-xs text-slate-600 mt-1">
                  Cứu nguy và giấu lại Crisis vào chồng bài. Thể hiện bài học: <em>Khi kế hoạch A đổ vỡ, kế hoạch dự phòng giúp giữ vững thế chủ động</em>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <strong className="text-sky-900 flex items-center space-x-1.5 text-xs">
                  <Eye className="w-4 h-4 text-sky-600" />
                  <span>Analytical Scan (4 lá)</span>
                </strong>
                <p className="text-xs text-slate-600 mt-1">
                  Soi trước 3 lá bài đầu của chồng rút để nhận diện nguy cơ trước khi quyết định rút hay bỏ lượt.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <strong className="text-purple-900 flex items-center space-x-1.5 text-xs">
                  <Shuffle className="w-4 h-4 text-purple-600" />
                  <span>Creative Shift (4 lá)</span>
                </strong>
                <p className="text-xs text-slate-600 mt-1">
                  Xáo trộn toàn bộ chồng bài rút chung, phá vỡ cạm bẫy do đối thủ vừa giấu bom ở trên cùng.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <strong className="text-amber-900 flex items-center space-x-1.5 text-xs">
                  <Ban className="w-4 h-4 text-amber-600" />
                  <span>Critical Objection - NOPE! (4 lá)</span>
                </strong>
                <p className="text-xs text-slate-600 mt-1">
                  Tư duy phản biện: Lập tức hủy bỏ đòn tấn công vừa nhắm vào đội bạn (như chặn đòn ép rút 2 lượt).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
                <strong className="text-orange-900 flex items-center space-x-1.5 text-xs">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span>Double Action (4 lá)</span>
                </strong>
                <p className="text-xs text-slate-600 mt-1">
                  Ép đội kế tiếp phải thực hiện liên tiếp 2 lượt rút bài đầy căng thẳng, nhân đôi nguy cơ rút trúng lá nổ!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                <strong className="text-indigo-900 flex items-center space-x-1.5 text-xs">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Stakeholder Empathy (4 lá)</span>
                </strong>
                <p className="text-xs text-slate-600 mt-1">
                  Chỉ định một đội đối thủ để đàm phán cướp lấy 1 thẻ bài ngẫu nhiên trên tay họ về tay mình.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                <strong className="text-slate-900 flex items-center space-x-1.5 text-xs">
                  <Play className="w-4 h-4 text-slate-600" />
                  <span>Skip Turn (4 lá)</span>
                </strong>
                <p className="text-xs text-slate-600 mt-1">
                  Bỏ lượt an toàn: Kết thúc ngay lượt chơi của đội mà không cần phải mạo hiểm rút bài từ chồng chung.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Winning Condition */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
            <div>
              <strong className="text-emerald-950 text-sm block mb-0.5">🏆 Điều Kiện Chiến Thắng Ván Đấu</strong>
              <p className="text-slate-600">
                Khi các đội khác lần lượt bị nổ tung và loại khỏi cuộc chơi, <strong>Đội sống sót duy nhất cuối cùng</strong> sẽ trở thành Nhà Vô Địch và nhận trọn điểm thưởng của buổi học!
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Bộ môn SSA101 • Kỹ Năng Giải Quyết Vấn Đề
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer shadow-sm hover:shadow"
          >
            ĐÃ HIỂU LUẬT & SẴN SÀNG CHIẾN
          </button>
        </div>

      </div>
    </div>
  );
};
