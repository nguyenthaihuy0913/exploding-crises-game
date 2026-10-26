import { Card } from '../types/game';

// 1. Nhóm Lá Khủng hoảng (Crisis Cards) - 10 Lá
export const CRISIS_CARDS_DATA: Omit<Card, 'id'>[] = [
  {
    name: 'Coffee Shop Slip & Spill',
    type: 'crisis',
    description: 'Nhân viên trượt ngã, đổ tràn đồ uống, khách hàng tức giận và vận hành ngưng trệ!',
    theoryRef: 'Sự cố quán cà phê',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: 'Apollo 13 Oxygen Leak',
    type: 'crisis',
    description: 'Nổ bình oxy ngoài không gian, đe dọa trực tiếp tính mạng phi hành đoàn!',
    theoryRef: 'Thử thách Apollo 13',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: 'European Transit Strike',
    type: 'crisis',
    description: 'Đình công tàu xe diện rộng làm đứt gãy toàn bộ lịch trình chuyến đi đã định!',
    theoryRef: 'Đình công giao thông',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: 'The Cashless Car Breakdown',
    type: 'crisis',
    description: 'Xe hỏng hóc giữa đường vắng, cạn kiệt nhiên liệu nhưng ví hoàn toàn không có tiền mặt!',
    theoryRef: 'Hỏng xe & thanh toán',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: '3 Exams & Work Shift',
    type: 'crisis',
    description: 'Ba bài thi học phần quyết định trùng đúng vào ngày bạn phải trực ca làm việc bắt buộc!',
    theoryRef: 'Xung đột lịch trình',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: 'No-Cash Birthday Dilemma',
    type: 'crisis',
    description: 'Sinh nhật người quan trọng tối nay nhưng tài khoản ngân hàng và tiền mặt đều về số 0!',
    theoryRef: 'Tình huống sinh nhật',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: 'PE Running Test Crisis',
    type: 'crisis',
    description: 'Phải vượt qua bài thi chạy bền lấy điểm qua môn nhưng thể lực đang hoàn toàn kiệt quệ!',
    theoryRef: 'Thử thách thể lực',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: 'Limited Study Space Conflict',
    type: 'crisis',
    description: 'Thiếu phòng tự học và thảo luận nhóm trên trường dẫn đến xung đột gay gắt giữa các nhóm!',
    theoryRef: 'Xung đột không gian',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: 'Campus Schedule Overlap',
    type: 'crisis',
    description: 'Hệ thống mở cổng đăng ký môn học cùng lúc với cuộc họp phỏng vấn câu lạc bộ lớn!',
    theoryRef: 'Trùng lặp thời gian',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
  {
    name: 'EV Shift Supply Disruption',
    type: 'crisis',
    description: 'Đứt gãy nguồn cung linh kiện pin khi đang trong giai đoạn chuyển đổi dây chuyền xe điện!',
    theoryRef: 'Chuyển đổi công nghệ',
    badge: 'CRISIS',
    accentColor: 'rose',
  },
];

// 2. Nhóm Lá Phòng thủ (Defense Cards) - 12 Lá
export const DEFENSE_CARDS_DATA: { card: Omit<Card, 'id'>; count: number }[] = [
  {
    card: {
      name: 'Backup Plan: Plan B',
      type: 'defense',
      description: 'Vô hiệu hóa ngay lập tức 1 lá Exploding Crisis và giấu lại lá đó vào chồng bài.',
      theoryRef: 'Tầm quan trọng của Phương án Dự phòng',
      badge: 'DEFENSE',
      accentColor: 'emerald',
    },
    count: 8,
  },
  {
    card: {
      name: 'Resilience Shield',
      type: 'defense',
      description: 'Khiên kiên cường: Bảo vệ đội khỏi bị cướp bài hoặc bị NOPE trong 1 lượt.',
      theoryRef: 'Khả năng phục hồi & Kiểm soát',
      badge: 'SHIELD',
      accentColor: 'teal',
    },
    count: 4,
  },
];

// 3. Nhóm Lá Kỹ năng & Hành động (Skill Cards) - 28 Lá
export const SKILL_CARDS_DATA: { card: Omit<Card, 'id'>; count: number }[] = [
  {
    card: {
      name: 'Analytical Scan',
      type: 'skill',
      category: 'analytical',
      description: 'Soi bài: Được xem trước 3 lá bài đầu tiên của chồng bài rút để phát hiện rủi ro.',
      theoryRef: 'Analytical Thinking - Phân tích logic',
      badge: 'ANALYTICAL',
      accentColor: 'sky',
    },
    count: 4,
  },
  {
    card: {
      name: 'Creative Paradigm Shift',
      type: 'skill',
      category: 'creative',
      description: 'Xáo bài: Đảo lộn toàn bộ chồng bài rút chung, thay đổi trật tự rủi ro.',
      theoryRef: 'Creative Thinking - Tư duy sáng tạo',
      badge: 'CREATIVE',
      accentColor: 'violet',
    },
    count: 4,
  },
  {
    card: {
      name: 'Critical Objection (NOPE!)',
      type: 'skill',
      category: 'critical',
      description: 'Chặn đòn: Hủy bỏ ngay lập tức 1 lá bài kỹ năng vừa được đội khác kích hoạt.',
      theoryRef: 'Critical Thinking - Tư duy phản biện',
      badge: 'CRITICAL',
      accentColor: 'amber',
    },
    count: 4,
  },
  {
    card: {
      name: 'Stakeholder Empathy',
      type: 'skill',
      category: 'stakeholder',
      description: 'Thương lượng: Chỉ định 1 đội khác chuyển giao 1 lá bài trên tay theo góc nhìn dung hòa.',
      theoryRef: 'Recognize Perspectives - Góc nhìn các bên',
      badge: 'STAKEHOLDER',
      accentColor: 'indigo',
    },
    count: 4,
  },
  {
    card: {
      name: 'Skip Turn (Pass)',
      type: 'skill',
      category: 'action',
      description: 'Bỏ lượt: Kết thúc lượt của đội ngay lập tức mà KHÔNG cần phải rút bài từ chồng chung.',
      theoryRef: 'Action Steps - Tránh rủi ro',
      badge: 'ACTION',
      accentColor: 'slate',
    },
    count: 4,
  },
  {
    card: {
      name: 'Double Action',
      type: 'skill',
      category: 'action',
      description: 'Ép rút kép: Buộc đội kế tiếp phải thực hiện liên tiếp 2 lượt rút bài!',
      theoryRef: 'Multiple Solutions - Giải pháp đa chiều',
      badge: 'ACTION',
      accentColor: 'orange',
    },
    count: 4,
  },
  {
    card: {
      name: 'Brainstorm Surge',
      type: 'skill',
      category: 'action',
      description: 'Động não: Rút ngay 2 lá bài kỹ năng từ chồng bài mà không làm kết thúc lượt.',
      theoryRef: 'Brainstorming - Động não giải pháp',
      badge: 'ACTION',
      accentColor: 'cyan',
    },
    count: 4,
  },
];
