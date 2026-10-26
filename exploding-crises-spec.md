# 📄 BẢN THIẾT KẾ CHI TIẾT GAME WEB: "EXPLODING CRISES" (PROBLEM SOLVER EDITION)
> **Chuyển thể từ Game Mèo Nổ (Exploding Kittens)**  
> *Dành cho lớp học 20–30 người (5–6 Đội chơi qua điện thoại + 1 Màn hình chiếu chính)*

---

## 📑 MỤC LỤC
1. [Tổng quan Dự án & Giá trị Bài học](#1-tổng-quan-dự-án--giá-trị-bài-học)
2. [Thiết kế Giao diện & Tông màu (UI/UX & Color Palette)](#2-thiết-kế-giao-diện--tông-màu-uiux--color-palette)
3. [Luồng Hệ thống & Tiến trình Game (Game Architecture & Flow)](#3-luồng-hệ-thống--tiến-trình-game-game-architecture--flow)
4. [Hệ thống Lá bài & Kho Item (Card Taxonomy & Mechanics)](#4-hệ-thống-lá-bài--kho-item-card-taxonomy--mechanics)
5. [Luật chơi & Cơ chế Xử lý Chi tiết (Game Rules & Edge Cases)](#5-luật-chơi--cơ-chế-xử-lý-chi-tiết-game-rules--edge-cases)
6. [Hướng dẫn Triển khai với AI Coding Agent (Prompts & Tech Stack)](#6-hướng-dẫn-triển-khai-với-ai-coding-agent-prompts--tech-stack)

---

## 1. TỔNG QUAN DỰ ÁN & GIÁ TRỊ BÀI HỌC

### 1.1. Mục tiêu
Tạo ra một **Web Game Tương tác Tập thể (Mass Interactive Web Game)** kịch tính, cuốn hút dành cho lớp học sĩ số 20–30 người, vận hành hoàn toàn trên trình duyệt (máy chiếu + điện thoại cá nhân). Game giúp biến các lý thuyết giải quyết vấn đề thành trải nghiệm chiến thuật thực tế.

### 1.2. Mối liên hệ với Lý thuyết Bài học (Grounded Knowledge)
* **Tầm quan trọng của Phương án Dự phòng (Backup Plans):** Rút trúng lá *Exploding Crisis* mô phỏng rủi ro ngoài dự kiến trong đời sống [15]. Việc sử dụng lá *Backup Plan* minh họa bài học: *khi kế hoạch ban đầu gặp sự cố, việc có sẵn nhiều giải pháp thay thế giúp tăng tính linh hoạt, chủ động thích ứng và giữ cảm giác kiểm soát tình hình* [15, 16, 17].
* **3 Kiểu tư duy cốt lõi:**
  * **Analytical Thinking (Phân tích):** Bóc tách thông tin, nhận diện mẫu hình, soi trước các rủi ro [7, 8].
  * **Creative Thinking (Sáng tạo):** Tạo ra ý tưởng mới, phi truyền thống, xáo trộn tình thế [7, 8].
  * **Critical Thinking (Phản biện):** Đánh giá tính logic, chỉ ra giả định sai lầm và ngăn chặn quyết định rủi ro [7, 8].
* **Dung hòa Góc nhìn Stakeholders:** Nhận diện và đàm phán dựa trên góc nhìn của 4 bên (*Sinh viên, Giảng viên, Nhân viên, Ban quản lý*) [24].
* **Quy trình 7 bước giải quyết vấn đề:** Làm khung cho các câu hỏi ứng biến khi đội chơi gặp sự cố mà không có lá gỡ bài [5, 6, 24-26].

---

## 2. THIẾT KẾ GIAO DIỆN & TÔNG MÀU (UI/UX & COLOR PALETTE)

### 2.1. Tông màu Giao diện (Color Palette - Tailwind CSS Theme)
Giao diện sử dụng phong cách **Dark Cyberpunk Arcade / Modern Dashboard** để tạo độ phản quang sắc nét trên máy chiếu hội trường:

* **Nền chủ đạo (Background):** `Slate-950` (`#020617`) & `Zinc-900` (`#18181b`) – Giúp dịu mắt và nổi bật thẻ bài.
* **Màu Khủng hoảng (Crisis Red):** `Crimson-500` (`#ef4444`) & `Orange-500` (`#f97316`) – Dùng cho lá sự cố, đồng hồ đếm ngược, chuông báo động.
* **Màu Phòng thủ / Dự phòng (Defense Green):** `Emerald-500` (`#10b981`) & `Mint-400` (`#34d399`) – Dùng cho lá *Backup Plan* và chỉ số sinh tồn.
* **Màu Kỹ năng Tư duy (Skill Accent Colors):**
  * **Analytical Blue:** `Sky-400` (`#38bdf8`) – Ánh sáng tri thức phân tích.
  * **Creative Violet:** `Purple-500` (`#a855f7`) – Sắc màu sáng tạo đột phá.
  * **Critical Amber:** `Amber-500` (`#f59e0b`) – Cảnh báo phản biện & logic.
  * **Stakeholder Cyan:** `Cyan-400` (`#22d3ee`) – Sự kết nối và dung hòa.
* **Chữ & Text:** `Slate-50` (`#f8fafc`) cho tiêu đề, `Slate-300` cho mô tả.

### 2.2. Khung Bố cục (Layout Architecture)
Hệ thống gồm 2 chế độ hiển thị song song (Dual-View System):

1. **Main Presenter View (Màn hình Máy chiếu 16:9):**
   * **Header:** Tên Game, Vòng chơi (Round N), Đồng hồ đếm ngược lượt (Turn Timer 20s).
   * **Center Arena:** Chồng bài chung (Draw Pile) ở giữa, Thẻ bài vừa được đánh (Played Card Stack) bên cạnh hiệu ứng động.
   * **Sidebar / Bottom Bar:** Bảng xếp hạng 5–6 Đội (Team HP, Số lá bài đang giữ, Trạng thái Sống/Bị loại).
   * **Ticker Log:** Dòng chữ chạy thời gian thực ghi lại hành động của các đội.

2. **Mobile Controller View (Màn hình Điện thoại Đội chơi - Responsive 390px):**
   * **Top Status:** Tên đội, Lượng HP còn lại (3 tim), Chỉ số lật bài.
   * **Hand View:** Dãy thẻ bài dạng quạt 3D mượt mà.
   * **Action Area:** Nút "Đánh lá bài" và nút "Rút bài từ chồng chung".

---

## 3. LUỒNG HỆ THỐNG & TIẾN TRÌNH GAME (GAME ARCHITECTURE & FLOW)

```
[Màn hình Máy chiếu]                      [Màn hình Điện thoại các Đội]
       │                                              │
       ├───► Phase 1: Lobby & Quét mã QR ────────────►│ Khởi tạo Đội chơi
       │                                              │
       ├───► Phase 2: Main Game Loop ─────────────────►│ Thảo luận & Đánh bài / Rút bài
       │           │                                  │
       │           ├─► Rút Bài Thường ────────────────►│ Lượt chuyển sang Đội tiếp
       │           │                                  │
       │           └─► Rút Bài CRISIS! ───────────────►│ Báo động 10s: Dùng Backup Plan?
       │                    │                         │
       │                    ├─► Có Backup Plan ───────►│ Gỡ bài an toàn, nhét Crisis lại
       │                    │                         │
       │                    └─► Không có ─────────────►│ Bị trừ 1 HP + Trả lời Q&A 7 bước
       │                                              │
       └───► Phase 3: Game Over & Debrief ───────────►│ Bảng Bảng Vàng & Tổng kết Bài học
```

### Chi tiết các Pha (Phases):
* **Pha 1: Khởi tạo (Lobby):** Máy chiếu hiện QR Code. Các đội (5–6 đội) quét mã, nhập Tên đội và chọn Avatar. Máy chiếu cập nhật danh sách đội Realtime.
* **Pha 2: Vòng lặp Trận đấu (Game Loop):** 
  1. Đến lượt Đội A: Có 20 giây để đánh 1 hoặc nhiều lá kỹ năng (*Analytical*, *Creative*, *Critical*, *Stakeholder*).
  2. Kết thúc lượt bằng cách bấm nút **"Rút 1 lá bài từ chồng chung"**.
* **Pha 3: Xử lý Khủng hoảng (Crisis Event):** Nếu rút trúng lá *Exploding Crisis*:
  * Màn hình chính nhấp nháy đỏ + âm thanh báo động.
  * Đồng hồ 10 giây đếm ngược trên điện thoại Đội A.
  * Đội A bấm dùng lá **Backup Plan** \\(\rightarrow\\) Giải nguy thành công, được nhét lại lá *Exploding Crisis* vào một vị trí bí mật trong chồng bài.
  * Nếu không có **Backup Plan** \\(\rightarrow\\) Đội A bị trừ 1 HP, màn hình hiện 1 câu hỏi ứng biến nhanh (Trích từ quy trình 7 bước giải quyết vấn đề). Trả lời đúng sẽ được phục hồi 1 HP hoặc nhận lại lá bài phòng thủ!
* **Pha 4: Bảng Vàng & Tổng kết (Game Over & Debrief):** Game kết thúc khi chỉ còn 1 Đội sống sót hoặc hết 10 vòng chơi. Màn hình chiếu hiệu ứng Confetti, vinh danh Đội vô địch và đúc kết các thông điệp cốt lõi từ slide bài giảng.

---

## 4. HỆ THỐNG LÁ BÀI & KHO ITEM (CARD TAXONOMY & MECHANICS)

Tổng số lá bài trong Deck: **50 Lá** (Được cân bằng cho 5–6 đội chơi).

### 4.1. Nhóm Lá Rủi ro (Crisis Cards) – 10 Lá
*Khi rút trúng, nếu không có lá Backup Plan sẽ bị mất 1 HP.*

| STT | Tên Lá Bài | Tình huống Trích từ Nguồn Bài giảng | Mô tả Rủi ro |
| :---: | :--- | :--- | :--- |
| 1 | **Coffee Shop Slip & Spill** | Sự cố quán cà phê [6] | Nhân viên trượt ngã, đổ đồ uống, khách hàng tức giận, vận hành ngưng trệ! |
| 2 | **Apollo 13 Oxygen Leak** | Thử thách Apollo 13 [14] | Nổ bình oxy ngoài không gian, đe dọa tính mạng phi hành đoàn! |
| 3 | **European Transit Strike** | Đình công giao thông [15] | Đình công kéo dài làm đứt gãy toàn bộ lịch trình chuyến đi đã lên kế hoạch! |
| 4 | **The Cashless Car Breakdown** | Xe hỏng không tiền mặt [17] | Xe hỏng lốp, hết dầu và hết xăng nhưng bạn hoàn toàn không có tiền mặt! |
| 5 | **3 Exams & Work Shift** | Trùng lịch thi & đi làm [17] | Có 3 bài thi quan trọng trùng đúng vào ngày bạn phải đi ca làm việc! |
| 6 | **No-Cash Birthday Dilemma** | Quà sinh nhật 0 đồng [16] | Sinh nhật người yêu nhưng ví tiền hoàn toàn trống rỗng! |
| 7 | **PE Running Test Crisis** | Bài thi thể lực [17] | Phải qua bài thi chạy thể dục bắt buộc nhưng thể trạng đang hoàn toàn out-of-shape! |
| 8 | **Limited Study Space Conflict** | Bế tắc không gian học nhóm [23] | Thiếu phòng học nhóm trên campus dẫn đến tranh chấp gay gắt giữa các nhóm! |
| 9 | **Campus Schedule Overlap** | Xung đột lịch trình campus [23] | Trùng lịch đăng ký môn học và sự kiện câu lạc bộ quan trọng! |
| 10 | **EV Shift Supply Disruption** | Chuyển đổi xe điện [14] | Đứt gãy chuỗi cung ứng pin khi chuyển dịch từ xe xăng sang xe điện! |

---

### 4.2. Nhóm Lá Gỡ Bố & Phòng thủ (Defense Cards) – 12 Lá

| STT | Tên Lá Bài | Tỷ lệ trong Deck | Tác dụng Game | Cơ sở Lý thuyết |
| :---: | :--- | :---: | :--- | :--- |
| 1 | **Backup Plan: Plan B** | 8 lá | Vô hiệu hóa ngay lập tức 1 lá *Exploding Crisis*. | Có giải pháp thay thế giúp chủ động thích ứng khi kế hoạch cũ gặp sự cố [15, 16]. |
| 2 | **Resilience Shield** | 4 lá | Bảo vệ đội khỏi bị đội khác vô hiệu hóa (Nope) hoặc đòi bài trong 1 lượt. | Giữ vững tính chủ động và cảm giác kiểm soát tình hình [17]. |

---

### 4.3. Nhóm Lá Kỹ năng & Tác động (Skill & Action Cards) – 28 Lá

| STT | Tên Lá Bài | Loại Tư duy / Kỹ năng | Tác dụng Game |
| :---: | :--- | :--- | :--- |
| 1 | **Analytical Scan** *(4 lá)* | Analytical Thinking [7] | **Soi bài:** Được xem trước 3 lá bài đầu tiên của chồng bài chung để nhận diện rủi ro. |
| 2 | **Creative Paradigm Shift** *(4 lá)* | Creative Thinking [7] | **Xáo bài:** Xáo trộn lại toàn bộ chồng bài chung, phá vỡ trật tự rủi ro hiện tại. |
| 3 | **Critical Objection (NOPE!)** *(4 lá)* | Critical Thinking [7] | **Chặn đòn:** Đánh lá này để hủy bỏ lập tức hành động vừa chơi của một đội khác. |
| 4 | **Stakeholder Empathy** *(4 lá)* | Stakeholder Alignment [24] | **Thương lượng:** Yêu cầu 1 đội khác chuyển giao 1 lá bài trên tay theo góc nhìn dung hòa. |
| 5 | **Skip Turn (Pass)** *(4 lá)* | Step 7: Action Steps [26] | **Bỏ lượt:** Kết thúc lượt ngay lập tức mà KHÔNG cần rút bài từ chồng chung. |
| 6 | **Double Action** *(4 lá)* | Multiple Solutions [5] | **Buộc rút 2 lần:** Bắt đội kế tiếp phải thực hiện 2 lượt chơi liên tiếp! |
| 7 | **Brainstorm Surge** *(4 lá)* | Step 3: Brainstorming [24] | **Rút thêm:** Rút ngay 2 lá bài kỹ năng từ chồng bài mà không phải kết thúc lượt. |

---

## 5. LUẬT CHƠI & CƠ CHẾ XỬ LÝ CHI TIẾT (GAME RULES & EDGE CASES)

### 5.1. Luật Chia bài Ban đầu (Setup)
* Mỗi đội được phát sẵn: **1 lá Backup Plan** + **3 lá Kỹ năng ngẫu nhiên**.
* Xáo 10 lá *Exploding Crisis* vào chồng bài chung (số lá Crisis = Số đội + 3).

### 5.2. Cơ chế Xử lý khi Hết Máu / Trả lời Q&A 7 Bước
Khi Đội A rút phải Crisis mà **không có lá Backup Plan**:
* Đội A mất 1 HP.
* Màn hình chiếu hiện 1 Câu hỏi Tình huống thuộc **7 Bước Giải quyết Vấn đề**:
  * *Ví dụ:* *"Khi nhân viên quán cà phê bị trượt ngã, việc đầu tiên Quản lý cần làm theo Bước 1 & Bước 7 là gì?"*
  * **Đáp án A:** Sơ cứu nhân viên & Phân công lại nhân sự (Đúng - Ưu tiên an toàn & vận hành) [6].
  * **Đáp án B:** Mắng nhân viên vì làm đổ đồ (Sai).
* Nếu Đội A chọn đúng đáp án trong 15 giây: Được nhận thưởng 1 lá bài kỹ năng bảo vệ cho lượt sau!

### 5.3. Xử lý các Tình huống Đặc biệt (Edge Cases)
* **Trường hợp lá NOPE bị NOPE:** Đội B đánh *Critical Objection (NOPE)* để chặn Đội A, Đội A có thể đánh tiếp 1 lá *NOPE* thứ hai để đè lá *NOPE* của Đội B (Phản biện lại sự phản biện).
* **Trường hợp nhét lại lá Crisis:** Sau khi gỡ Crisis bằng *Backup Plan*, đại diện Đội A được quyền chọn bảo mật vị trí nhét lá Crisis đó lại vào chồng bài (ví dụ: nhét ngay lên trên cùng để bẫy đội kế tiếp!).

---

## 6. HƯỚNG DẪN TRIỂN KHAI VỚI AI CODING AGENT (PROMPTS & TECH STACK)

### 6.1. Stack Khuyên Dùng cho AI Coding Agent
* **Frontend Framework:** React (Next.js hoặc Vite)
* **Styling & UI:** Tailwind CSS, Lucide React Icons, Framer Motion (hiệu ứng lật bài)
* **Animation & Visual:** `canvas-confetti` (khi thắng cuộc)
* **State Management / Sync:** LocalStorage / BroadcastChannel (nếu chạy demo trên 1 trình duyệt nhiều tab) hoặc Supabase / Firebase Realtime (nếu kết nối điện thoại thật).

---

### 6.2. PROMPT MASTER (Sao chép dán trực tiếp vào v0.dev / Bolt.new / Lovable)

```markdown
Build a highly interactive, multiplayer turn-based web card game in React and Tailwind CSS titled "Exploding Crises: Problem Solver Edition", inspired by Exploding Kittens and grounded in Problem-Solving course concepts.

### 1. UI & Aesthetics
- Dark Cyberpunk Arcade theme using Slate-950 (`#020617`), Crimson Red (`#ef4444`), Emerald Green (`#10b981`), Sky Blue (`#38bdf8`), and Purple (`#a855f7`).
- Dual-View Layout: 
  a) Presenter View (16:9 Projector Screen): Shows central Draw Pile, Discard Stack, Realtime Action Ticker, and Leaderboard for 5 Teams with Health Hearts (3 HP each).
  b) Mobile Controller View (Responsive 390px): Displays team hand with smooth card hover animations, "Play Card" and "Draw Card" buttons.

### 2. Card Deck Mechanics (Total 50 Cards)
- **Crisis Cards (Exploding Kittens):** "Coffee Shop Slip & Spill", "Apollo 13 Oxygen Leak", "European Transit Strike", "No-Cash Car Breakdown", "3 Exams & Work Shift Collision", "Limited Study Space Conflict".
- **Defense Cards:** "Backup Plan: Plan B" (Defuses Crisis), "Resilience Shield".
- **Skill Cards:** 
  - "Analytical Scan" (See the future: View top 3 cards)
  - "Creative Paradigm Shift" (Shuffle draw pile)
  - "Critical Objection - NOPE!" (Cancel opponent's move)
  - "Stakeholder Empathy" (Request 1 card from another team)
  - "Skip Turn" & "Double Action"

### 3. Core Gameplay Loop & State
- Teams take turns playing skill cards or clicking "Draw Card".
- Drawing a Crisis Card triggers a 10-second Red Emergency Alert with alarm sound effects.
- If the team has a "Backup Plan" card, allow them to play it to defuse the crisis and secretly insert the Crisis card back into the deck.
- If no "Backup Plan", reduce Team HP by 1 and display a 7-Step Problem Solving Q&A modal with a 15-second countdown.
- Include confetti animation on victory and a final summary slide explaining how Backup Plans create flexibility, preparedness, and active control during unexpected disruptions.
```

---
*Tệp thiết kế chi tiết này đã được lưu và xuất bản dạng tài liệu `.md` sẵn sàng cho việc triển khai lập trình web game.*