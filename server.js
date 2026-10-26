import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;

// Get local IPv4 address
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.get('/api/info', (req, res) => {
  res.json({
    localIp: getLocalIp(),
    port: 3000,
    wsPort: PORT,
  });
});

// Room Code Generator (4 characters)
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// In-Memory Rooms Store
const rooms = new Map();

io.on('connection', (socket) => {
  console.log(`[Socket] Connected: ${socket.id}`);

  // 1. Host creates a new room
  socket.on('host:create_room', ({ teamCount = 5, teamNames = [], teamIcons = [] }, callback) => {
    let roomCode = generateRoomCode();
    while (rooms.has(roomCode)) {
      roomCode = generateRoomCode();
    }

    const defaultNames = [
      'Đội Tư Duy Phân Tích',
      'Đội Sáng Tạo Đột Phá',
      'Đội Phản Biện Sắc Bén',
      'Đội Đàm Phán Stakeholder',
      'Đội Thích Ứng Linh Hoạt',
      'Đội Phương Án Dự Phòng',
    ];
    const defaultIcons = ['compass', 'brain', 'target', 'users', 'shield', 'lightbulb'];
    const defaultColors = ['sky', 'purple', 'amber', 'indigo', 'emerald', 'rose'];

    const teams = [];
    for (let i = 0; i < teamCount; i++) {
      teams.push({
        id: `team-${i + 1}`,
        name: teamNames[i] || defaultNames[i] || `Đội ${i + 1}`,
        avatar: teamIcons[i] || defaultIcons[i] || 'users',
        color: defaultColors[i] || 'sky',
        hp: 2,
        hand: [],
        isAlive: true,
        hasShield: false,
        connected: false,
        socketId: null,
        tabSwitches: 0,
      });
    }

    const roomState = {
      code: roomCode,
      hostSocketId: socket.id,
      phase: 'lobby',
      teams,
      currentTeamIndex: 0,
      drawPile: [],
      discardPile: [],
      actionLogs: [
        {
          id: 'log-0',
          timestamp: new Date().toLocaleTimeString('vi-VN'),
          teamName: 'Hệ thống',
          message: `Phòng ${roomCode} đã được tạo thành công!`,
          type: 'info',
        },
      ],
      activeCrisisCard: null,
      activeQna: null,
      extraTurns: 0,
      usedQuestionIds: [],
    };

    rooms.set(roomCode, roomState);
    socket.join(roomCode);

    console.log(`[Room Created] Code: ${roomCode} with ${teamCount} teams`);

    if (callback) {
      callback({
        success: true,
        roomCode,
        localIp: getLocalIp(),
        roomState,
      });
    }

    socket.emit('room:updated', roomState);
  });

  // 1c. Host explicitly closes and destroys room
  socket.on('host:close_room', ({ roomCode }, callback) => {
    const code = (roomCode || '').toUpperCase().trim();
    const room = rooms.get(code);
    if (!room) {
      if (callback) callback({ success: false, message: 'Phòng không tồn tại!' });
      return;
    }

    console.log(`[Host Closed Room] Code: ${code} destroyed by host.`);
    io.to(code).emit('room:closed', {
      message: `Phòng ${code} đã được chủ phòng đóng! Vui lòng liên hệ giảng viên hoặc quay lại trang chủ.`,
    });
    io.in(code).socketsLeave(code);
    rooms.delete(code);

    if (callback) callback({ success: true });
  });

  // 1b. Get room state (teams, active connections) before joining
  socket.on('room:get_state', ({ roomCode }, callback) => {
    const code = (roomCode || '').toUpperCase().trim();
    const room = rooms.get(code);
    if (!room) {
      if (callback) callback({ success: false, message: 'Phòng không tồn tại hoặc đã bị chủ phòng đóng!' });
      return;
    }
    // Join socket channel to receive real-time room updates
    socket.join(code);
    if (callback) callback({ success: true, roomState: room });
  });

  // 2. Team joins a room (Supports custom team name while keeping 5 slots)
  socket.on('team:join_room', ({ roomCode, teamId, customTeamName }, callback) => {
    const code = (roomCode || '').toUpperCase().trim();
    const room = rooms.get(code);

    if (!room) {
      if (callback) callback({ success: false, message: 'Phòng không tồn tại hoặc đã bị chủ phòng đóng!' });
      return;
    }

    const targetTeam = room.teams.find((t) => t.id === teamId);
    if (!targetTeam) {
      if (callback) callback({ success: false, message: 'Đội không tồn tại trong phòng này!' });
      return;
    }

    // 1 SLOT = 1 LAPTOP: Đội đã có máy khác chọn thì không ai khác được chọn nữa
    if (targetTeam.connected && targetTeam.socketId && targetTeam.socketId !== socket.id) {
      if (callback) {
        callback({
          success: false,
          message: `Đội "${targetTeam.name}" đã có laptop kết nối rồi! Mỗi bàn 4-5 bạn chỉ dùng 1 laptop đại diện, vui lòng chọn đội khác.`,
        });
      }
      return;
    }

    // Apply custom team name if specified by students
    if (customTeamName && customTeamName.trim()) {
      targetTeam.name = customTeamName.trim().slice(0, 30);
    }

    targetTeam.connected = true;
    targetTeam.socketId = socket.id;
    socket.join(code);
    socket.data = { roomCode: code, teamId };

    room.actionLogs.unshift({
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      teamName: targetTeam.name,
      message: 'Laptop của đội đã kết nối vào phòng!',
      type: 'success',
    });

    console.log(`[Team Joined] Room ${code} - ${targetTeam.name}`);

    if (callback) {
      callback({
        success: true,
        team: targetTeam,
        roomState: room,
      });
    }

    io.to(code).emit('room:updated', room);
  });

  // 3. Host starts game
  socket.on('host:start_game', ({ roomCode, initialDeckState }, callback) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    // Only include teams that have actually connected to prevent turns going to ghost teams
    const connectedTeams = room.teams.filter((t) => t.connected);
    if (connectedTeams.length > 0) {
      room.teams = connectedTeams;
    }

    room.phase = 'playing';
    const deck = initialDeckState || { drawPile: [], discardPile: [], hands: [] };
    room.drawPile = deck.drawPile || [];
    room.discardPile = deck.discardPile || [];
    room.currentTeamIndex = 0;

    // Distribute hands to active connected teams if provided
    if (deck.hands && Array.isArray(deck.hands)) {
      deck.hands.forEach((hand, idx) => {
        if (room.teams[idx]) {
          room.teams[idx].hand = hand;
          room.teams[idx].hp = 2;
          room.teams[idx].isAlive = true;
        }
      });
    }

    room.actionLogs.unshift({
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      teamName: 'Hệ thống',
      message: `Ván đấu chính thức bắt đầu với ${room.teams.length} đội tham gia!`,
      type: 'success',
    });

    io.to(roomCode).emit('room:updated', room);
    if (callback) callback({ success: true });
  });

  // 4. Team plays card
  socket.on('game:play_card', ({ roomCode, teamId, cardId, cardEffect }) => {
    const room = rooms.get(roomCode);
    if (!room || room.phase !== 'playing') return;

    const currentTeam = room.teams[room.currentTeamIndex];
    if (!currentTeam || currentTeam.id !== teamId) return;

    const cardIndex = currentTeam.hand.findIndex((c) => c.id === cardId);
    if (cardIndex === -1) return;

    // Guard against playing Backup Plan outside crisis
    if (currentTeam.hand[cardIndex]?.name.includes('Backup Plan')) return;

    const [playedCard] = currentTeam.hand.splice(cardIndex, 1);
    room.discardPile.push(playedCard);

    room.actionLogs.unshift({
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      teamName: currentTeam.name,
      message: `Đánh thẻ "${playedCard.name}"!`,
      type: 'info',
    });

    // Handle effects
    if (cardEffect?.type === 'shuffle') {
      room.drawPile = cardEffect.newDrawPile && cardEffect.newDrawPile.length > 0
        ? cardEffect.newDrawPile
        : shuffleArray(room.drawPile);
      room.actionLogs.unshift({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        teamName: currentTeam.name,
        message: 'Đã xáo trộn lại toàn bộ chồng bài rút!',
        type: 'warning',
      });
    } else if (cardEffect?.type === 'skip') {
      advanceTurn(room);
    } else if (cardEffect?.type === 'double') {
      // Exploding Kittens Attack rule: immediately ends your turn without drawing,
      // and passes to next team with 1 extra turn (they must take 2 turns)
      advanceTurn(room);
      room.extraTurns = 1;
      const nextTeam = room.teams[room.currentTeamIndex];
      if (nextTeam) {
        nextTeam.isUnderDoubleAction = true;
        nextTeam.targetedAlert = {
          id: Math.random().toString(),
          sourceTeamName: currentTeam.name,
          cardName: 'Double Action',
          message: `Đội bạn vừa bị ${currentTeam.name} tấn công bằng thẻ "Double Action"! Bạn bị ép phải thực hiện liên tiếp 2 lượt rút bài!`,
          type: 'attack',
          timestamp: new Date().toLocaleTimeString('vi-VN'),
        };
      }
      room.actionLogs.unshift({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        teamName: currentTeam.name,
        message: `Buộc ${nextTeam ? nextTeam.name : 'đội kế tiếp'} phải thực hiện 2 lượt rút liên tiếp!`,
        type: 'warning',
      });
    } else if (cardEffect?.type === 'shield') {
      currentTeam.hasShield = true;
      room.actionLogs.unshift({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        teamName: currentTeam.name,
        message: 'Kích hoạt Khiên Kiên Cường (Resilience Shield)!',
        type: 'success',
      });
    } else if (cardEffect?.type === 'nope') {
      if (currentTeam.isUnderDoubleAction) {
        currentTeam.isUnderDoubleAction = false;
        room.extraTurns = 0;
      }
      currentTeam.targetedAlert = null;
      room.actionLogs.unshift({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        teamName: currentTeam.name,
        message: 'Đã phản biện bằng "Critical Objection (NOPE!)" - Hủy bỏ hiệu ứng tấn công!',
        type: 'success',
      });
    } else if (cardEffect?.type === 'brainstorm') {
      if (room.drawPile.length < 2 && room.discardPile.length > 0) {
        room.drawPile = [...room.drawPile, ...shuffleArray(room.discardPile)];
        room.discardPile = [];
      }

      const drawnCards = [];
      let i = 0;
      while (drawnCards.length < 2 && i < room.drawPile.length) {
        if (room.drawPile[i].type !== 'crisis') {
          const [card] = room.drawPile.splice(i, 1);
          drawnCards.push(card);
        } else {
          i++;
        }
      }

      currentTeam.hand.push(...drawnCards);
      room.actionLogs.unshift({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        teamName: currentTeam.name,
        message: `Brainstorm Surge: Đã động não rút ngay ${drawnCards.length} thẻ bài kỹ năng bổ sung!`,
        type: 'success',
      });
    } else if (cardEffect?.type === 'stakeholder') {
      const targetTeam = room.teams.find((t) => t.id === cardEffect.targetTeamId);
      if (targetTeam && targetTeam.id !== currentTeam.id) {
        if (targetTeam.hasShield) {
          targetTeam.hasShield = false;
          targetTeam.targetedAlert = {
            id: Math.random().toString(),
            sourceTeamName: currentTeam.name,
            cardName: 'Khiên Kiên Cường',
            message: `Khiên Kiên Cường của đội bạn vừa đỡ thành công đòn cướp bài từ ${currentTeam.name}!`,
            type: 'shield',
            timestamp: new Date().toLocaleTimeString('vi-VN'),
          };
          room.actionLogs.unshift({
            id: Math.random().toString(),
            timestamp: new Date().toLocaleTimeString('vi-VN'),
            teamName: targetTeam.name,
            message: 'Khiên Kiên Cường đã bảo vệ đội khỏi đàm phán cướp bài!',
            type: 'warning',
          });
        } else if (targetTeam.hand.length > 0) {
          const randIdx = Math.floor(Math.random() * targetTeam.hand.length);
          const [stolen] = targetTeam.hand.splice(randIdx, 1);
          currentTeam.hand.push(stolen);
          targetTeam.targetedAlert = {
            id: Math.random().toString(),
            sourceTeamName: currentTeam.name,
            cardName: 'Stakeholder Empathy',
            message: `Đội bạn vừa bị ${currentTeam.name} dùng thẻ "Stakeholder Empathy" cướp mất 1 thẻ bài ("${stolen.name}")!`,
            type: 'stolen',
            timestamp: new Date().toLocaleTimeString('vi-VN'),
          };
          room.actionLogs.unshift({
            id: Math.random().toString(),
            timestamp: new Date().toLocaleTimeString('vi-VN'),
            teamName: currentTeam.name,
            message: `Đàm phán cướp thành công 1 thẻ bài từ ${targetTeam.name}!`,
            type: 'success',
          });
        } else {
          room.actionLogs.unshift({
            id: Math.random().toString(),
            timestamp: new Date().toLocaleTimeString('vi-VN'),
            teamName: currentTeam.name,
            message: `${targetTeam.name} không còn thẻ bài nào để đàm phán!`,
            type: 'info',
          });
        }
      }
    }

    io.to(roomCode).emit('room:updated', room);
  });

  // 5. Team draws card
  socket.on('game:draw_card', ({ roomCode, teamId }) => {
    const room = rooms.get(roomCode);
    if (!room || room.phase !== 'playing') return;

    const currentTeam = room.teams[room.currentTeamIndex];
    if (!currentTeam || currentTeam.id !== teamId) return;

    // If draw pile is empty, recycle discard pile or end game
    if (room.drawPile.length === 0) {
      if (room.discardPile.length > 0) {
        room.drawPile = shuffleArray(room.discardPile);
        room.discardPile = [];
        room.actionLogs.unshift({
          id: Math.random().toString(),
          timestamp: new Date().toLocaleTimeString('vi-VN'),
          teamName: 'Hệ thống',
          message: 'Chồng bài rút đã hết, xáo lại chồng bài bỏ làm chồng bài mới!',
          type: 'warning',
        });
      } else {
        room.phase = 'game_over';
        io.to(roomCode).emit('room:updated', room);
        return;
      }
    }

    const drawnCard = room.drawPile.shift();

    if (drawnCard.type === 'crisis') {
      room.phase = 'crisis_pending';
      room.activeCrisisCard = drawnCard;
      room.actionLogs.unshift({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        teamName: currentTeam.name,
        message: `⚠️ RÚT TRÚNG LÁ KHỦNG HOẢNG: "${drawnCard.name}"!`,
        type: 'danger',
      });
    } else {
      currentTeam.hand.push(drawnCard);
      room.actionLogs.unshift({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        teamName: currentTeam.name,
        message: 'Đã rút 1 lá bài vào tay (bí mật)',
        type: 'info',
      });
      advanceTurn(room);
    }

    io.to(roomCode).emit('room:updated', room);
  });

  // 6. Defuse crisis
  socket.on('game:defuse_crisis', ({ roomCode, teamId, insertPosition }) => {
    const room = rooms.get(roomCode);
    if (!room || room.phase !== 'crisis_pending' || !room.activeCrisisCard) return;

    // Active team facing crisis
    const team = room.teams[room.currentTeamIndex];
    if (!team) return;

    // Verify sender is active team or host
    if (socket.id !== room.hostSocketId && team.id !== teamId) return;

    const backupIdx = team.hand.findIndex((c) => c.name.includes('Backup Plan'));
    if (backupIdx !== -1) {
      const [backupCard] = team.hand.splice(backupIdx, 1);
      room.discardPile.push(backupCard);
    }

    // Insert crisis card back into draw pile
    if (insertPosition === 'top') {
      room.drawPile.unshift(room.activeCrisisCard);
    } else if (insertPosition === 'bottom') {
      room.drawPile.push(room.activeCrisisCard);
    } else if (insertPosition === 'middle') {
      const mid = Math.floor(room.drawPile.length / 2);
      room.drawPile.splice(mid, 0, room.activeCrisisCard);
    } else {
      room.drawPile.push(room.activeCrisisCard);
      room.drawPile = shuffleArray(room.drawPile);
    }

    room.actionLogs.unshift({
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      teamName: team.name,
      message: 'Đã dùng Backup Plan gỡ nguy và giấu lại lá Crisis vào chồng bài!',
      type: 'success',
    });

    room.activeCrisisCard = null;
    room.phase = 'playing';
    advanceTurn(room);

    io.to(roomCode).emit('room:updated', room);
  });

  // 7. Trigger QnA when failed defuse
  socket.on('game:trigger_qna', ({ roomCode, qnaItem }) => {
    const room = rooms.get(roomCode);
    if (!room || room.phase !== 'crisis_pending') return;

    room.phase = 'qna_pending';
    room.activeQna = qnaItem;
    if (!room.usedQuestionIds) room.usedQuestionIds = [];
    if (qnaItem?.id && !room.usedQuestionIds.includes(qnaItem.id)) {
      room.usedQuestionIds.push(qnaItem.id);
    }
    io.to(roomCode).emit('room:updated', room);
  });

  // 8. Submit QnA answer
  socket.on('game:qna_submit', ({ roomCode, teamId, isCorrect }) => {
    const room = rooms.get(roomCode);
    if (!room || room.phase !== 'qna_pending') return;

    // Active team facing crisis
    const team = room.teams[room.currentTeamIndex];
    if (!team) return;

    // Verify sender is active team or host
    if (socket.id !== room.hostSocketId && team.id !== teamId) return;

    if (!isCorrect) {
      team.hp -= 1;
      if (team.hp <= 0) {
        team.isAlive = false;
        room.actionLogs.unshift({
          id: Math.random().toString(),
          timestamp: new Date().toLocaleTimeString('vi-VN'),
          teamName: team.name,
          message: 'Đã hết HP và BỊ LOẠI khỏi ván đấu!',
          type: 'danger',
        });
      } else {
        room.actionLogs.unshift({
          id: Math.random().toString(),
          timestamp: new Date().toLocaleTimeString('vi-VN'),
          teamName: team.name,
          message: `Trả lời sai thử thách: Bị trừ 1 HP! (Còn ${team.hp} HP)`,
          type: 'danger',
        });
      }
    } else {
      room.actionLogs.unshift({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        teamName: team.name,
        message: 'Áp dụng đúng quy trình 7 bước: Bảo toàn HP thành công!',
        type: 'success',
      });
    }

    if (room.activeCrisisCard) {
      room.discardPile.push(room.activeCrisisCard);
      room.activeCrisisCard = null;
    }

    room.activeQna = null;

    const aliveCount = room.teams.filter((t) => t.isAlive && t.hp > 0).length;
    if (aliveCount <= 1) {
      room.phase = 'game_over';
    } else {
      room.phase = 'playing';
      advanceTurn(room);
    }

    io.to(roomCode).emit('room:updated', room);
  });

  // 9. Team Tab-Switch Detection (Anti-Cheat)
  socket.on('team:tab_switch', ({ roomCode, teamId, switchCount }) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    const team = room.teams.find((t) => t.id === teamId);
    if (!team) return;

    team.tabSwitches = switchCount !== undefined ? switchCount : (team.tabSwitches || 0) + 1;

    room.actionLogs.unshift({
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      teamName: 'Anti-Cheat',
      message: `⚠️ Cảnh báo: ${team.name} vừa chuyển tab rời khỏi ván đấu! (Lần thứ ${team.tabSwitches})`,
      type: 'warning',
    });

    console.log(`[Anti-Cheat] Tab switch detected: ${team.name} in Room ${roomCode} (Count: ${team.tabSwitches})`);

    io.to(roomCode).emit('room:updated', room);
  });

  // 10. Host Control: Force Skip Turn
  socket.on('host:force_skip', ({ roomCode }) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    // If game is stuck in crisis or QnA, safely reset back to playing
    if (room.phase === 'crisis_pending' || room.phase === 'qna_pending') {
      if (room.activeCrisisCard) {
        room.discardPile.push(room.activeCrisisCard);
        room.activeCrisisCard = null;
      }
      room.activeQna = null;
      room.phase = 'playing';
    }

    const currentTeam = room.teams[room.currentTeamIndex];
    room.actionLogs.unshift({
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      teamName: 'Chủ Phòng',
      message: `Đã cưỡng chế bỏ lượt của ${currentTeam ? currentTeam.name : 'đội hiện tại'}!`,
      type: 'warning',
    });

    advanceTurn(room);
    io.to(roomCode).emit('room:updated', room);
  });

  // 11. Host Control: Adjust Team HP
  socket.on('host:adjust_hp', ({ roomCode, teamId, delta }) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    const team = room.teams.find((t) => t.id === teamId);
    if (!team) return;

    team.hp = Math.max(0, Math.min(3, team.hp + delta));
    team.isAlive = team.hp > 0;

    room.actionLogs.unshift({
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      teamName: 'Chủ Phòng',
      message: `Đã điều chỉnh HP của ${team.name} (${delta > 0 ? '+' : ''}${delta} HP) → Còn ${team.hp} HP!`,
      type: delta > 0 ? 'success' : 'danger',
    });

    const aliveCount = room.teams.filter((t) => t.isAlive && t.hp > 0).length;
    if (aliveCount <= 1 && room.phase === 'playing') {
      room.phase = 'game_over';
    }

    io.to(roomCode).emit('room:updated', room);
  });

  // Play Critical Objection (NOPE!) to cancel an incoming targeted attack
  socket.on('team:play_nope', ({ roomCode, teamId }) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    const team = room.teams.find((t) => t.id === teamId);
    if (!team || !team.isAlive || team.hp <= 0) return;

    const nopeIdx = team.hand.findIndex((c) => c.name.includes('Critical Objection'));
    if (nopeIdx === -1) return;

    const [nopeCard] = team.hand.splice(nopeIdx, 1);
    room.discardPile.push(nopeCard);

    // Cancel Double Action effect if active
    if (team.isUnderDoubleAction) {
      team.isUnderDoubleAction = false;
      room.extraTurns = 0;
    }

    const prevAlert = team.targetedAlert;
    team.targetedAlert = null;

    room.actionLogs.unshift({
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      teamName: team.name,
      message: `Đã phản biện bằng "${nopeCard.name}" - HỦY BỎ hoàn toàn đòn tấn công${prevAlert ? ` từ ${prevAlert.sourceTeamName}` : ''}!`,
      type: 'success',
    });

    io.to(roomCode).emit('room:updated', room);
  });

  // Dismiss targeted alert
  socket.on('team:dismiss_alert', ({ roomCode, teamId }) => {
    const room = rooms.get(roomCode);
    if (!room) return;
    const team = room.teams.find((t) => t.id === teamId);
    if (team) {
      team.targetedAlert = null;
      io.to(roomCode).emit('room:updated', room);
    }
  });

  // Disconnect handler
  socket.on('disconnect', () => {
    console.log(`[Socket] Disconnected: ${socket.id}`);
    if (socket.data?.roomCode && socket.data?.teamId) {
      const room = rooms.get(socket.data.roomCode);
      if (room) {
        const team = room.teams.find((t) => t.id === socket.data.teamId);
        if (team) {
          team.connected = false;
          io.to(socket.data.roomCode).emit('room:updated', room);
        }
      }
    }
  });
});

function advanceTurn(room) {
  const aliveTeams = room.teams.filter((t) => t.isAlive && t.hp > 0);
  if (aliveTeams.length <= 1) {
    room.phase = 'game_over';
    return;
  }

  const currentTeam = room.teams[room.currentTeamIndex];
  if (currentTeam && currentTeam.isAlive && currentTeam.hp > 0 && room.extraTurns > 0) {
    room.extraTurns -= 1;
    return;
  }

  if (currentTeam) {
    currentTeam.isUnderDoubleAction = false;
  }
  room.extraTurns = 0;
  let nextIdx = (room.currentTeamIndex + 1) % room.teams.length;
  while (!room.teams[nextIdx].isAlive || room.teams[nextIdx].hp <= 0) {
    nextIdx = (nextIdx + 1) % room.teams.length;
  }

  room.currentTeamIndex = nextIdx;
}

// Serve static production build of Vite (dist) if it exists (for 1-click cloud deploy on Render/VPS)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Express 5 SPA fallback
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/socket.io')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[WebSocket Server] Running at http://localhost:${PORT}`);
  console.log(`[Local Network IP] http://${getLocalIp()}:${PORT}`);
});
