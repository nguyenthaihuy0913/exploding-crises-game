# 💣 Exploding Crises: Problem Solver Edition

> **Game thẻ bài giáo dục tương tác thời gian thực** lấy cảm hứng từ cơ chế kinh điển của *Exploding Kittens*, được thiết kế riêng cho môn học **Kỹ năng giải quyết vấn đề & Tư duy phản biện (SSA101)**.

[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-v4-black?logo=socketdotio)](https://socket.io/)
[![Express 5](https://img.shields.io/badge/Express-5-green?logo=express)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Lượt Xem](https://hits.sh/github.com/nguyenthaihuy0913/exploding-crises-game.svg?style=flat&label=%F0%9F%91%81%EF%B8%8F+L%C6%B0%E1%BB%A3t+xem&color=007ec6)](https://hits.sh/github.com/nguyenthaihuy0913/exploding-crises-game/)

---

## 📖 Giới thiệu Dự án

**Exploding Crises** là nền tảng trò chơi phòng học đa thiết bị (Multi-device Classroom Game), giải quyết bài toán biến các giờ học lý thuyết kỹ năng mềm khô khan thành những cuộc đấu trí kịch tính và hào hứng:
* **Màn hình Chủ phòng (Host / Máy chiếu):** Được trình chiếu trên màn hình lớn của giảng đường, hiển thị sàn đấu chung, đồng hồ đếm ngược, chồng bài rút, chồng bài bỏ và nhật ký diễn biến trận đấu.
* **Màn hình Nhóm sinh viên (Clients / Laptop & Mobile):** Sinh viên quét mã QR hoặc nhập mã phòng 4 ký tự để tham gia, mỗi nhóm sở hữu khay bài bí mật riêng, cùng thảo luận và ra quyết định chiến thuật.

---

## ✨ Tính Năng Nổi Bật

### 🖥️ 1. Kiến trúc Đa Nền tảng & Realtime
* **Đồng bộ WebSockets độ trễ siêu thấp (<50ms):** Từng thao tác đánh bài, rút bài, nổ khủng hoảng hay hóa giải đều được cập nhật tức thì đến toàn bộ phòng học.
* **Quét mã QR vào phòng nhanh:** Host tạo phòng phát sinh mã phòng ngắn và mã QR tương ứng, sinh viên dùng điện thoại hoặc laptop quét là vào ngay.
* **Tự động khôi phục phiên (Auto-Reconnect):** Cơ chế lưu phiên thông minh qua `sessionStorage` giúp sinh viên lỡ tay F5 hay vuốt reload trên điện thoại không bao giờ bị văng khỏi phòng chơi.

### 🎴 2. Bộ Bài 50 Lá Gắn Liền Thực Tế SSA101
| Nhóm Bài | Số Lượng | Ý Nghĩa Kỹ Năng | Tác Dụng Trong Game |
| :--- | :---: | :--- | :--- |
| **Exploding Crisis** | 10 lá | Tình huống rủi ro bất ngờ | Bốc trúng sẽ kích hoạt đếm ngược khẩn cấp! Mất 1 HP nếu không có giải pháp phòng ngừa. |
| **Backup Plan** | 8 lá | Kế hoạch dự phòng (Plan B) | Vô hiệu hóa ngay lập tức lá Crisis và giấu kín lại lá Crisis đó vào chồng bài để bẫy đối thủ. |
| **Resilience Shield** | 4 lá | Khả năng phục hồi & Kiểm soát | Kích hoạt khiên bảo vệ, miễn nhiễm hoàn toàn đòn cướp bài tiếp theo. |
| **Analytical Scan** | 4 lá | Analytical Thinking (Phân tích) | Soi trước 3 lá bài đầu tiên của chồng rút để nhận diện rủi ro trước khi ra quyết định. |
| **Creative Shift** | 4 lá | Creative Thinking (Sáng tạo) | Xáo trộn lại toàn bộ chồng bài rút chung, phá vỡ trật tự rủi ro cũ. |
| **Critical Objection (NOPE!)** | 4 lá | Critical Thinking (Phản biện) | Phản biện đòn tấn công của đối thủ, lập tức hủy bỏ hiệu ứng vừa bị nhắm tới! |
| **Stakeholder Empathy** | 4 lá | Góc nhìn các bên liên quan | Chỉ định một đội đối thủ để đàm phán cướp lấy 1 thẻ bài ngẫu nhiên. |
| **Double Action** | 4 lá | Đa dạng hóa giải pháp | Ép đội kế tiếp phải thực hiện liên tiếp 2 lượt rút bài đầy căng thẳng! |
| **Skip Turn** | 4 lá | Tránh rủi ro trực tiếp | Bỏ lượt an toàn mà không cần rút bài từ chồng chung. |
| **Brainstorm Surge** | 4 lá | Động não giải pháp | Rút ngay 2 lá bài kỹ năng bổ sung mà không làm kết thúc lượt. |

### ⚡ 3. Cảnh Báo Tấn Công Đích Danh & Tương Tác Kịch Tính
* **Targeted Alerts:** Khi bị tấn công bởi `Double Action` hoặc `Stakeholder Empathy`, đội bị hại lập tức nhận âm thanh báo động và banner cảnh báo màu cam nổi bật.
* **Tiến trình Lượt Rút Kép rõ ràng:** Đội chịu phạt Double Action được hướng dẫn chi tiết qua trạng thái `LƯỢT 1/2` và `LƯỢT 2/2`, tránh gây hiểu nhầm luật chơi.
* **Phản biện bằng lá NOPE:** Nếu trên tay có lá `Critical Objection (NOPE!)`, người chơi có thể bấm nút phản biện tức thời để bẻ gãy đòn ép rút hoặc cướp bài.

### 🛡️ 4. Giám Sát Giảng Đường (Anti-Cheat & Host Controls)
* **Anti-Cheat tự động:** Phát hiện và đếm số lần sinh viên chuyển tab hoặc rời ứng dụng trong giờ học, tự động gửi cảnh báo về màn hình máy chiếu của giảng viên.
* **Bảng điều khiển Giảng viên (Host Drawer):** Giảng viên có thể xem số lượng bài trên tay của các đội, điều chỉnh cộng/trừ HP linh hoạt, và có nút **Cưỡng chế bỏ lượt (Force Skip)** để gỡ kẹt nếu sinh viên vắng mặt.

### 🎮 5. Chế độ Chơi Đa Dạng
1. **Multiplayer Online (WebSockets):** Chơi qua mạng LAN/Wi-Fi hoặc Internet trên nhiều máy tính/điện thoại.
2. **Pass & Play (Offline):** Chơi nhóm xoay vòng trên 1 laptop duy nhất mà không cần kết nối mạng.

---

## 🛠️ Công Nghệ Sử Dụng

* **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide React, Canvas Confetti.
* **Backend:** Node.js 22, Express 5, Socket.IO v4, IP Detection (`networkInterfaces`).
* **DevOps & Container:** Docker, Docker Compose, Multi-stage Caching, Shell Scripts.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu cầu hệ thống
* **Node.js** >= 18.0.0 (Khuyên dùng Node 20 hoặc 22 LTS)
* **npm** >= 9.0.0

### 1. Cài đặt thư viện
```bash
git clone https://github.com/your-username/exploding-crises.git
cd exploding-crises
npm install
```

### 2. Chạy môi trường Phát triển (Local Dev)
Chạy cả frontend Vite và backend server cùng lúc:

* **Terminal 1 - Khởi chạy Backend WebSocket Server (Port 3001):**
  ```bash
  npm run server
  ```
* **Terminal 2 - Khởi chạy Frontend Vite (Port 3000):**
  ```bash
  npm run dev
  ```
👉 Mở trình duyệt truy cập:
* Máy chủ phòng (Host): `http://localhost:3000`
* Các máy sinh viên trong cùng mạng Wi-Fi: `http://<IP_MÁY_BẠN>:3000`

---

### 3. Chạy Bản Production Độc Lập (Khuyên Dùng khi Triển Khai)
Hệ thống hỗ trợ bundle tĩnh tự động, phục vụ cả giao diện React lẫn WebSockets trên **1 cổng duy nhất (Port 3001)**:

```bash
# Build bundle React tĩnh
npm run build

# Khởi chạy server production
npm start
```
👉 Mở trình duyệt truy cập: `http://localhost:3001` (hoặc `http://<IP_LAN>:3001`).

---

### 4. Triển khai bằng Docker 🐳
Dự án đã có sẵn `Dockerfile` chuẩn Node 22 Alpine:

```bash
# Build và chạy container
docker compose up -d --build

# Kiểm tra logs
docker compose logs -f
```
Hệ thống sẽ chạy ổn định tại cổng `3001`.

---

### 5. Đẩy lên Internet / Cloud VPS (Render, Railway, Fly.io)
Dự án được cấu hình sẵn cho các nền tảng Cloud:
* **Build Command:** `npm run build`
* **Start Command:** `npm start`
* **Environment Variable:** `PORT` (nền tảng sẽ tự động cung cấp)

Nhờ cơ chế nhận diện origin động trong `socket.ts`, bạn có thể mời bạn bè tham gia qua mạng 4G/khác Wi-Fi hoàn toàn mượt mà.

---

## 📂 Cấu Trúc Thư Mục

```text
├── server.js              # Express 5 + Socket.IO Backend Server
├── Dockerfile             # Container production build
├── docker-compose.yml     # Docker compose orchestration
├── src/
│   ├── App.tsx            # Main Controller & State Management
│   ├── types/game.ts      # TypeScript definitions cho Card, Team, RoomState
│   ├── data/
│   │   ├── cards.ts       # Dữ liệu 50 lá bài chuẩn SSA101
│   │   └── qna.ts         # Bộ câu hỏi tình huống 7 bước giải quyết vấn đề
│   ├── utils/
│   │   ├── socket.ts      # Kết nối WebSocket động theo môi trường
│   │   └── sound.ts       # Hiệu ứng âm thanh sinh động bằng Web Audio API
│   └── components/
│       ├── common/        # Navbar, TeamIcon, Background Grid
│       ├── lobby/         # HostWaitingRoom (QR Code), ClientJoinRoom, LobbyScreen
│       ├── game/          # GameBoard (Màn hình máy chiếu Host)
│       ├── client/        # TeamGameBoard (Màn hình Laptop bí mật của nhóm)
│       └── modals/        # CrisisModal, QnaModal, ScanModal, WinnerModal,...
└── package.json
```

---

## 📝 Giấy Phép & Đóng Góp

Dự án được phát hành dưới giấy phép mã nguồn mở [MIT License](LICENSE). Mọi đóng góp (Pull Request, Báo lỗi Issue) nhằm nâng cao trải nghiệm học tập và giảng dạy đều rất được hoan nghênh!

---

<p align="center">
  ⭐ <b>Nếu thấy dự án thú vị và hữu ích cho môn học của bạn, hãy tặng dự án 1 Star trên GitHub nhé!</b>
  <br /><br />
  <a href="https://hits.sh/github.com/nguyenthaihuy0913/exploding-crises-game/">
    <img alt="Lượt xem dự án" src="https://hits.sh/github.com/nguyenthaihuy0913/exploding-crises-game.svg?style=flat&label=%F0%9F%91%81%EF%B8%8F+T%E1%BB%95ng+l%C6%B0%E1%BB%A3t+xem&color=007ec6" />
  </a>
</p>
