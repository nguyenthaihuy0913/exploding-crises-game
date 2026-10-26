import { useState, useEffect } from 'react';
import { Card, Team, ActionLog, QnaItem, RoomState } from './types/game';
import { Flame, HelpCircle } from 'lucide-react';
import { Navbar } from './components/common/Navbar';
import { MainMenu } from './components/menu/MainMenu';
import { HostWaitingRoom } from './components/lobby/HostWaitingRoom';
import { ClientJoinRoom } from './components/client/ClientJoinRoom';
import { TeamGameBoard } from './components/client/TeamGameBoard';
import { LobbyScreen } from './components/lobby/LobbyScreen';
import { GameBoard } from './components/game/GameBoard';
import { CrisisModal } from './components/modals/CrisisModal';
import { QnaModal } from './components/modals/QnaModal';
import { RulesModal } from './components/modals/RulesModal';
import { WinnerModal } from './components/modals/WinnerModal';
import { ScanModal } from './components/modals/ScanModal';
import { StakeholderModal } from './components/modals/StakeholderModal';
import { initializeDeck, shuffleCards } from './utils/deck';
import { QNA_QUESTIONS } from './data/qna';
import { sound } from './utils/sound';
import { socket } from './utils/socket';

export type AppMode = 'menu' | 'host' | 'join' | 'pass_and_play';

const TEAM_AVATARS = ['compass', 'brain', 'target', 'users', 'shield', 'lightbulb'];
const TEAM_COLORS = ['sky', 'purple', 'amber', 'indigo', 'emerald', 'rose'];

export function App() {
  const [appMode, setAppMode] = useState<AppMode>('menu');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showRules, setShowRules] = useState<boolean>(false);

  // Multiplayer Room State (Host & Join modes)
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [myTeamId, setMyTeamId] = useState<string | null>(null);
  const [localIp, setLocalIp] = useState<string>('localhost');
  const [urlRoomCode, setUrlRoomCode] = useState<string>('');

  // Offline / Pass & Play State
  const [offlinePhase, setOfflinePhase] = useState<'lobby' | 'playing' | 'crisis_pending' | 'qna_pending' | 'game_over'>('lobby');
  const [offlineTeams, setOfflineTeams] = useState<Team[]>([]);
  const [offlineCurrentTeamIdx, setOfflineCurrentTeamIdx] = useState<number>(0);
  const [offlineDrawPile, setOfflineDrawPile] = useState<Card[]>([]);
  const [offlineDiscardPile, setOfflineDiscardPile] = useState<Card[]>([]);
  const [offlineLogs, setOfflineLogs] = useState<ActionLog[]>([]);
  const [offlineCrisisCard, setOfflineCrisisCard] = useState<Card | null>(null);
  const [offlineQna, setOfflineQna] = useState<QnaItem | null>(null);
  const [offlineExtraTurns, setOfflineExtraTurns] = useState<number>(0);

  // Common Modals
  const [scanCards, setScanCards] = useState<Card[] | null>(null);
  const [isStakeholderOpen, setIsStakeholderOpen] = useState<boolean>(false);
  const [pendingStakeholderCard, setPendingStakeholderCard] = useState<Card | null>(null);

  // Check URL query parameter ?room=CODE or auto-reconnect from session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam) {
        setUrlRoomCode(roomParam.toUpperCase());
        setAppMode('join');
      } else {
        try {
          const savedMode = sessionStorage.getItem('ssa101_appMode') as AppMode | null;
          const savedRoom = sessionStorage.getItem('ssa101_roomCode');
          const savedTeam = sessionStorage.getItem('ssa101_teamId');

          if (savedMode === 'join' && savedRoom && savedTeam) {
            socket.emit('team:join_room', { roomCode: savedRoom, teamId: savedTeam }, (res: any) => {
              if (res?.success && res.roomState) {
                setRoomState(res.roomState);
                setMyTeamId(savedTeam);
                setAppMode('join');
              }
            });
          }
        } catch {}
      }
    }
  }, []);

  // Fetch local IP from backend API
  useEffect(() => {
    const isDev = typeof window !== 'undefined' && window.location.port === '3000';
    const infoUrl = isDev ? `http://${window.location.hostname}:3001/api/info` : '/api/info';
    fetch(infoUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.localIp) setLocalIp(data.localIp);
      })
      .catch(() => {
        // Fallback if running offline
      });
  }, []);

  // Listen to Socket.IO room updates
  useEffect(() => {
    const handleRoomUpdated = (updatedRoom: RoomState) => {
      console.log('[App] Room state updated:', updatedRoom);
      setRoomState(updatedRoom);
    };

    socket.on('room:updated', handleRoomUpdated);

    return () => {
      socket.off('room:updated', handleRoomUpdated);
    };
  }, []);

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const addOfflineLog = (teamName: string, message: string, type: 'info' | 'warning' | 'danger' | 'success' = 'info') => {
    const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setOfflineLogs((prev) => [
      {
        id: Math.random().toString(),
        timestamp: time,
        teamId: '',
        teamName,
        message,
        type,
      },
      ...prev.slice(0, 20),
    ]);
  };

  // ==========================================
  // HOST MODE HANDLERS
  // ==========================================
  const handleStartHostMode = () => {
    socket.emit('host:create_room', { teamCount: 5 }, (response: { success: boolean; roomCode: string; roomState: RoomState; localIp?: string }) => {
      if (response.success) {
        setRoomState(response.roomState);
        if (response.localIp) setLocalIp(response.localIp);
        setAppMode('host');
      }
    });
  };

  const handleHostStartGame = () => {
    if (!roomState) return;
    const connectedTeams = roomState.teams.filter(t => t.connected);
    if (connectedTeams.length === 0) {
      alert('Chưa có đội nào kết nối vào phòng! Vui lòng chờ ít nhất 2 đội kết nối.');
      return;
    }
    const initialDeckState = initializeDeck(connectedTeams.length);
    socket.emit('host:start_game', {
      roomCode: roomState.code,
      initialDeckState,
    });
  };

  // ==========================================
  // TEAM LAPTOP (JOIN MODE) HANDLERS
  // ==========================================
  const handleClientJoin = (code: string, teamId: string) => {
    socket.emit('team:join_room', { roomCode: code, teamId }, (response: { success: boolean; message?: string; team?: Team; roomState?: RoomState }) => {
      if (response.success && response.roomState) {
        setRoomState(response.roomState);
        setMyTeamId(teamId);
        try {
          sessionStorage.setItem('ssa101_roomCode', code);
          sessionStorage.setItem('ssa101_teamId', teamId);
          sessionStorage.setItem('ssa101_appMode', 'join');
        } catch {}
      } else {
        alert(response.message || 'Không thể kết nối phòng!');
      }
    });
  };

  const handleClientPlayCard = (card: Card) => {
    if (!roomState || !myTeamId) return;

    // Prevent accidental wasting of Backup Plan outside crisis
    if (card.name.includes('Backup Plan')) {
      alert('Lá "Backup Plan" là phương án dự phòng cứu sinh bí mật, chỉ dùng khi rút phải lá Khủng hoảng (Crisis) để gỡ bài!');
      return;
    }

    let cardEffect: { type: string; newDrawPile?: Card[]; targetTeamId?: string } | undefined;

    if (card.name.includes('Analytical Scan')) {
      setScanCards(roomState.drawPile.slice(0, 3));
    } else if (card.name.includes('Creative Paradigm Shift')) {
      sound.playShuffle();
      cardEffect = { type: 'shuffle', newDrawPile: shuffleCards(roomState.drawPile) };
    } else if (card.name.includes('Skip Turn')) {
      cardEffect = { type: 'skip' };
    } else if (card.name.includes('Double Action')) {
      cardEffect = { type: 'double' };
    } else if (card.name.includes('Resilience Shield')) {
      cardEffect = { type: 'shield' };
    } else if (card.name.includes('Critical Objection')) {
      cardEffect = { type: 'nope' };
    } else if (card.name.includes('Brainstorm Surge')) {
      cardEffect = { type: 'brainstorm' };
    } else if (card.name.includes('Stakeholder Empathy')) {
      setPendingStakeholderCard(card);
      setIsStakeholderOpen(true);
      return;
    }

    socket.emit('game:play_card', {
      roomCode: roomState.code,
      teamId: myTeamId,
      cardId: card.id,
      cardEffect,
    });
  };

  const handleClientStakeholderTarget = (targetTeamId: string) => {
    if (!roomState || !myTeamId || !pendingStakeholderCard) return;
    setIsStakeholderOpen(false);
    socket.emit('game:play_card', {
      roomCode: roomState.code,
      teamId: myTeamId,
      cardId: pendingStakeholderCard.id,
      cardEffect: { type: 'stakeholder', targetTeamId },
    });
    setPendingStakeholderCard(null);
  };

  const handleClientDrawCard = () => {
    if (!roomState || !myTeamId) return;
    socket.emit('game:draw_card', {
      roomCode: roomState.code,
      teamId: myTeamId,
    });
  };

  const handleClientDefuse = (insertPosition: 'top' | 'middle' | 'bottom' | 'random') => {
    if (!roomState || !myTeamId) return;
    socket.emit('game:defuse_crisis', {
      roomCode: roomState.code,
      teamId: myTeamId,
      insertPosition,
    });
  };

  const handleClientFailedDefuse = () => {
    if (!roomState) return;
    const randomQna = QNA_QUESTIONS[Math.floor(Math.random() * QNA_QUESTIONS.length)];
    socket.emit('game:trigger_qna', {
      roomCode: roomState.code,
      qnaItem: randomQna,
    });
  };

  const handleClientQnaSubmit = (isCorrect: boolean) => {
    if (!roomState || !myTeamId) return;
    socket.emit('game:qna_submit', {
      roomCode: roomState.code,
      teamId: myTeamId,
      isCorrect,
    });
  };

  // Host helpers for defusing or QnA on behalf of students
  const handleHostDefuse = (insertPosition: 'top' | 'middle' | 'bottom' | 'random') => {
    if (!roomState || !currentTeamOnBoard) return;
    socket.emit('game:defuse_crisis', {
      roomCode: roomState.code,
      teamId: currentTeamOnBoard.id,
      insertPosition,
    });
  };

  const handleHostFailedDefuse = () => {
    if (!roomState) return;
    const randomQna = QNA_QUESTIONS[Math.floor(Math.random() * QNA_QUESTIONS.length)];
    socket.emit('game:trigger_qna', {
      roomCode: roomState.code,
      qnaItem: randomQna,
    });
  };

  const handleHostQnaSubmit = (isCorrect: boolean) => {
    if (!roomState || !currentTeamOnBoard) return;
    socket.emit('game:qna_submit', {
      roomCode: roomState.code,
      teamId: currentTeamOnBoard.id,
      isCorrect,
    });
  };

  // ==========================================
  // OFFLINE PASS & PLAY HANDLERS
  // ==========================================
  const handleStartPassAndPlay = (teamCount: number, teamNames: string[]) => {
    const { hands, drawPile, discardPile } = initializeDeck(teamCount);

    const initialTeams: Team[] = teamNames.map((name, idx) => ({
      id: `team-${idx + 1}`,
      name,
      avatar: TEAM_AVATARS[idx],
      color: TEAM_COLORS[idx],
      hp: 1,
      hand: hands[idx] || [],
      isAlive: true,
      hasShield: false,
    }));

    setOfflineTeams(initialTeams);
    setOfflineCurrentTeamIdx(0);
    setOfflineDrawPile(drawPile);
    setOfflineDiscardPile(discardPile);
    setOfflineLogs([]);
    setOfflineExtraTurns(0);
    setOfflinePhase('playing');
    setAppMode('pass_and_play');

    addOfflineLog('Hệ thống', `Ván đấu bắt đầu với ${teamCount} đội thi đấu!`, 'success');
  };

  const advanceOfflineTurn = (customTeams = offlineTeams, currentIdx = offlineCurrentTeamIdx) => {
    const aliveCount = customTeams.filter((t) => t.isAlive && t.hp > 0).length;
    if (aliveCount <= 1) {
      setOfflinePhase('game_over');
      return;
    }

    const currentTeam = customTeams[currentIdx];
    if (currentTeam && currentTeam.isAlive && currentTeam.hp > 0 && offlineExtraTurns > 0) {
      setOfflineExtraTurns((prev) => prev - 1);
      addOfflineLog(currentTeam.name, 'Đang thực hiện lượt rút bài cộng dồn!', 'warning');
      return;
    }

    setOfflineExtraTurns(0);
    let nextIdx = (currentIdx + 1) % customTeams.length;
    while (!customTeams[nextIdx].isAlive || customTeams[nextIdx].hp <= 0) {
      nextIdx = (nextIdx + 1) % customTeams.length;
    }

    setOfflineCurrentTeamIdx(nextIdx);
  };

  const handleOfflinePlayCard = (card: Card) => {
    const currentTeam = offlineTeams[offlineCurrentTeamIdx];
    if (!currentTeam) return;

    // Prevent accidental wasting of Backup Plan outside crisis
    if (card.name.includes('Backup Plan')) {
      alert('Lá "Backup Plan" là phương án dự phòng cứu sinh bí mật, chỉ dùng khi rút phải lá Khủng hoảng (Crisis) để gỡ bài!');
      return;
    }

    // For Stakeholder Empathy, do not discard until target is confirmed
    if (card.name.includes('Stakeholder Empathy')) {
      setPendingStakeholderCard(card);
      setIsStakeholderOpen(true);
      return;
    }

    const updatedHand = currentTeam.hand.filter((c) => c.id !== card.id);
    let updatedTeams = offlineTeams.map((t, idx) =>
      idx === offlineCurrentTeamIdx ? { ...t, hand: updatedHand } : t
    );

    setOfflineTeams(updatedTeams);
    setOfflineDiscardPile((prev) => [...prev, card]);

    addOfflineLog(currentTeam.name, `Đánh thẻ "${card.name}"`, 'info');

    if (card.name.includes('Analytical Scan')) {
      setScanCards(offlineDrawPile.slice(0, 3));
    } else if (card.name.includes('Creative Paradigm Shift')) {
      sound.playShuffle();
      setOfflineDrawPile(shuffleCards(offlineDrawPile));
      addOfflineLog(currentTeam.name, 'Đã xáo trộn lại toàn bộ chồng bài rút!', 'warning');
    } else if (card.name.includes('Skip Turn')) {
      addOfflineLog(currentTeam.name, 'Sử dụng Skip Turn: Kết thúc lượt an toàn mà không rút bài!', 'success');
      advanceOfflineTurn(updatedTeams);
    } else if (card.name.includes('Double Action')) {
      addOfflineLog(currentTeam.name, 'Ép rút kép: Buộc đội kế tiếp phải thực hiện 2 lượt rút liên tiếp!', 'warning');
      advanceOfflineTurn(updatedTeams);
      setOfflineExtraTurns(1);
    } else if (card.name.includes('Resilience Shield')) {
      updatedTeams = updatedTeams.map((t, idx) =>
        idx === offlineCurrentTeamIdx ? { ...t, hasShield: true } : t
      );
      setOfflineTeams(updatedTeams);
      addOfflineLog(currentTeam.name, 'Kích hoạt Khiên Kiên Cường (Resilience Shield)!', 'success');
    } else if (card.name.includes('Critical Objection')) {
      if (offlineExtraTurns > 0) {
        setOfflineExtraTurns(0);
        addOfflineLog(currentTeam.name, 'Đã phản biện bằng "Critical Objection (NOPE!)" - HỦY BỎ đòn tấn công!', 'success');
      } else {
        addOfflineLog(currentTeam.name, 'Đã kích hoạt lá phản biện "Critical Objection (NOPE!)"!', 'info');
      }
    } else if (card.name.includes('Brainstorm Surge')) {
      let deck = [...offlineDrawPile];
      if (deck.length < 2 && offlineDiscardPile.length > 0) {
        deck = [...deck, ...shuffleCards(offlineDiscardPile)];
        setOfflineDiscardPile([]);
      }
      const drawn: Card[] = [];
      let i = 0;
      while (drawn.length < 2 && i < deck.length) {
        if (deck[i].type !== 'crisis') {
          const [c] = deck.splice(i, 1);
          drawn.push(c);
        } else {
          i++;
        }
      }
      setOfflineDrawPile(deck);
      setOfflineTeams((prev) =>
        prev.map((t, idx) => (idx === offlineCurrentTeamIdx ? { ...t, hand: [...t.hand, ...drawn] } : t))
      );
      addOfflineLog(currentTeam.name, `Brainstorm Surge: Đã động não rút ngay ${drawn.length} thẻ bài kỹ năng bổ sung!`, 'success');
    }
  };

  const handleOfflineStakeholderTransfer = (targetTeamId: string) => {
    const targetTeam = offlineTeams.find((t) => t.id === targetTeamId);
    const currentTeam = offlineTeams[offlineCurrentTeamIdx];
    if (!targetTeam || !currentTeam) return;

    setIsStakeholderOpen(false);

    // Discard the Stakeholder Empathy card now that target was confirmed
    if (pendingStakeholderCard) {
      setOfflineDiscardPile((prev) => [...prev, pendingStakeholderCard]);
      setOfflineTeams((prev) =>
        prev.map((t, idx) =>
          idx === offlineCurrentTeamIdx
            ? { ...t, hand: t.hand.filter((c) => c.id !== pendingStakeholderCard.id) }
            : t
        )
      );
      addOfflineLog(currentTeam.name, `Đánh thẻ "${pendingStakeholderCard.name}"`, 'info');
      setPendingStakeholderCard(null);
    }

    if (targetTeam.hasShield) {
      setOfflineTeams((prev) =>
        prev.map((t) => (t.id === targetTeamId ? { ...t, hasShield: false } : t))
      );
      addOfflineLog(targetTeam.name, `Khiên Kiên Cường đã bảo vệ ${targetTeam.name} khỏi đàm phán!`, 'warning');
      return;
    }

    if (targetTeam.hand.length === 0) {
      addOfflineLog(currentTeam.name, `${targetTeam.name} không còn thẻ bài nào để đàm phán!`, 'info');
      return;
    }

    const randIdx = Math.floor(Math.random() * targetTeam.hand.length);
    const stolenCard = targetTeam.hand[randIdx];
    const newTargetHand = targetTeam.hand.filter((_, idx) => idx !== randIdx);

    setOfflineTeams((prev) =>
      prev.map((t) => {
        if (t.id === targetTeamId) return { ...t, hand: newTargetHand };
        if (t.id === currentTeam.id) return { ...t, hand: [...t.hand, stolenCard] };
        return t;
      })
    );

    addOfflineLog(currentTeam.name, `Đàm phán thành công lấy 1 thẻ bài từ ${targetTeam.name}!`, 'success');
  };

  const handleOfflineDrawCard = () => {
    if (offlineDrawPile.length === 0) {
      if (offlineDiscardPile.length > 0) {
        setOfflineDrawPile(shuffleCards(offlineDiscardPile));
        setOfflineDiscardPile([]);
        addOfflineLog('Hệ thống', 'Chồng bài rút đã hết, xáo lại chồng bài bỏ làm chồng bài mới!', 'warning');
        return;
      } else {
        setOfflinePhase('game_over');
        return;
      }
    }

    const currentTeam = offlineTeams[offlineCurrentTeamIdx];
    const drawn = offlineDrawPile[0];
    const remaining = offlineDrawPile.slice(1);
    setOfflineDrawPile(remaining);

    if (drawn.type === 'crisis') {
      setOfflineCrisisCard(drawn);
      setOfflinePhase('crisis_pending');
      addOfflineLog(currentTeam.name, `⚠️ RÚT TRÚNG LÁ KHỦNG HOẢNG: "${drawn.name}"!`, 'danger');
    } else {
      const updatedTeams = offlineTeams.map((t, idx) =>
        idx === offlineCurrentTeamIdx ? { ...t, hand: [...t.hand, drawn] } : t
      );
      setOfflineTeams(updatedTeams);
      addOfflineLog(currentTeam.name, 'Đã rút 1 lá bài vào tay (bí mật)', 'info');
      advanceOfflineTurn(updatedTeams);
    }
  };

  const handleOfflineDefuse = (insertPosition: 'top' | 'middle' | 'bottom' | 'random') => {
    if (!offlineCrisisCard) return;
    const currentTeam = offlineTeams[offlineCurrentTeamIdx];
    const backupIdx = currentTeam.hand.findIndex((c) => c.name.includes('Backup Plan'));
    const defuseCard = currentTeam.hand[backupIdx];
    const newHand = currentTeam.hand.filter((_, idx) => idx !== backupIdx);

    const updatedTeams = offlineTeams.map((t, idx) =>
      idx === offlineCurrentTeamIdx ? { ...t, hand: newHand } : t
    );
    setOfflineTeams(updatedTeams);
    if (defuseCard) setOfflineDiscardPile((prev) => [...prev, defuseCard]);

    let newDraw = [...offlineDrawPile];
    if (insertPosition === 'top') newDraw.unshift(offlineCrisisCard);
    else if (insertPosition === 'bottom') newDraw.push(offlineCrisisCard);
    else if (insertPosition === 'middle') {
      const mid = Math.floor(newDraw.length / 2);
      newDraw.splice(mid, 0, offlineCrisisCard);
    } else {
      newDraw.push(offlineCrisisCard);
      newDraw = shuffleCards(newDraw);
    }

    setOfflineDrawPile(newDraw);
    addOfflineLog(currentTeam.name, `Đã dùng "Backup Plan" gỡ nguy thành công!`, 'success');
    setOfflineCrisisCard(null);
    setOfflinePhase('playing');
    advanceOfflineTurn(updatedTeams);
  };

  const handleOfflineFailedDefuse = () => {
    const randomQna = QNA_QUESTIONS[Math.floor(Math.random() * QNA_QUESTIONS.length)];
    setOfflineQna(randomQna);
    setOfflinePhase('qna_pending');
  };

  const handleOfflineQnaComplete = (isCorrect: boolean) => {
    const currentTeam = offlineTeams[offlineCurrentTeamIdx];
    let updatedTeams = [...offlineTeams];
    if (!isCorrect) {
      const newHp = currentTeam.hp - 1;
      const isAlive = newHp > 0;
      updatedTeams = offlineTeams.map((t, idx) =>
        idx === offlineCurrentTeamIdx ? { ...t, hp: newHp, isAlive } : t
      );
      setOfflineTeams(updatedTeams);
      addOfflineLog(currentTeam.name, `Trả lời sai thử thách 7 bước: Bị trừ 1 HP! (${newHp} HP)`, 'danger');
    } else {
      addOfflineLog(currentTeam.name, `Áp dụng đúng quy trình 7 bước: Bảo toàn HP thành công!`, 'success');
    }

    if (offlineCrisisCard) {
      setOfflineDiscardPile((prev) => [...prev, offlineCrisisCard]);
      setOfflineCrisisCard(null);
    }
    setOfflineQna(null);

    const remainingAlive = updatedTeams.filter((t) => t.isAlive && t.hp > 0);
    if (remainingAlive.length <= 1) {
      setOfflinePhase('game_over');
    } else {
      setOfflinePhase('playing');
      advanceOfflineTurn(updatedTeams);
    }
  };

  // Find active team on client laptop
  const myTeam = roomState?.teams.find((t) => t.id === myTeamId) || null;
  const currentTeamOnBoard = roomState ? roomState.teams[roomState.currentTeamIndex] : null;
  const isMyTurnOnClient = Boolean(myTeam && currentTeamOnBoard && myTeam.id === currentTeamOnBoard.id);

  // Winner selection
  const offlineWinner = offlineTeams.filter((t) => t.isAlive && t.hp > 0)[0] || offlineTeams[0];
  const onlineWinner = roomState ? roomState.teams.filter((t) => t.isAlive && t.hp > 0)[0] || roomState.teams[0] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenRules={() => setShowRules(true)}
        onResetGame={() => {
          setAppMode('menu');
          setRoomState(null);
          setMyTeamId(null);
        }}
        isGameActive={appMode !== 'menu'}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center">
        
        {/* 1. Main Menu */}
        {appMode === 'menu' && (
          <MainMenu
            onSelectHostMode={handleStartHostMode}
            onSelectJoinMode={() => setAppMode('join')}
            onSelectPassAndPlay={() => setAppMode('pass_and_play')}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            onOpenRules={() => setShowRules(true)}
          />
        )}

        {/* 2. Host Waiting Room (Projector Screen) */}
        {appMode === 'host' && roomState?.phase === 'lobby' && (
          <HostWaitingRoom
            roomCode={roomState.code}
            localIp={localIp}
            teams={roomState.teams}
            onStartGame={handleHostStartGame}
            onBackToMenu={() => {
              setAppMode('menu');
              setRoomState(null);
            }}
          />
        )}

        {/* 3. Host In-Game Board (Projector Screen) */}
        {appMode === 'host' && roomState && (roomState.phase === 'playing' || roomState.phase === 'crisis_pending' || roomState.phase === 'qna_pending') && (
          <GameBoard
            teams={roomState.teams}
            currentTeamIndex={roomState.currentTeamIndex}
            drawPile={roomState.drawPile}
            discardPile={roomState.discardPile}
            actionLogs={roomState.actionLogs}
            onPlayCard={() => {}}
            onDrawCard={() => {}}
            isHost={true}
            onForceSkip={() => socket.emit('host:force_skip', { roomCode: roomState.code })}
            onAdjustHp={(teamId, delta) => socket.emit('host:adjust_hp', { roomCode: roomState.code, teamId, delta })}
          />
        )}

        {/* 4. Client Join Screen */}
        {appMode === 'join' && (!myTeam || roomState?.phase === 'lobby') && (
          <ClientJoinRoom
            initialRoomCode={urlRoomCode}
            onJoinRoom={handleClientJoin}
            onBackToMenu={() => {
              setAppMode('menu');
              setMyTeamId(null);
            }}
            roomState={roomState}
            selectedTeam={myTeam}
          />
        )}

        {/* 5. Client Laptop Game Board (Team View) */}
        {appMode === 'join' && myTeam && roomState && (roomState.phase === 'playing' || roomState.phase === 'crisis_pending' || roomState.phase === 'qna_pending') && (
          <TeamGameBoard
            myTeam={myTeam}
            currentTeamName={currentTeamOnBoard?.name || ''}
            isMyTurn={isMyTurnOnClient}
            extraTurns={roomState.extraTurns || 0}
            drawPileCount={roomState.drawPile.length}
            lastDiscardedCard={roomState.discardPile.length > 0 ? roomState.discardPile[roomState.discardPile.length - 1] : null}
            onPlayCard={handleClientPlayCard}
            onDrawCard={handleClientDrawCard}
            onPlayNope={() => socket.emit('team:play_nope', { roomCode: roomState.code, teamId: myTeam.id })}
            onDismissAlert={() => socket.emit('team:dismiss_alert', { roomCode: roomState.code, teamId: myTeam.id })}
            onTabSwitch={() => socket.emit('team:tab_switch', { roomCode: roomState.code, teamId: myTeam.id })}
          />
        )}

        {/* 6. Offline Pass & Play Setup / GameBoard */}
        {appMode === 'pass_and_play' && offlinePhase === 'lobby' && (
          <LobbyScreen onStartGame={handleStartPassAndPlay} />
        )}

        {appMode === 'pass_and_play' && (offlinePhase === 'playing' || offlinePhase === 'crisis_pending' || offlinePhase === 'qna_pending') && (
          <GameBoard
            teams={offlineTeams}
            currentTeamIndex={offlineCurrentTeamIdx}
            drawPile={offlineDrawPile}
            discardPile={offlineDiscardPile}
            actionLogs={offlineLogs}
            onPlayCard={handleOfflinePlayCard}
            onDrawCard={handleOfflineDrawCard}
          />
        )}

      </main>

      {/* ================= MODALS ================= */}

      {/* Online Crisis Modal - Active Team or Host */}
      {roomState?.phase === 'crisis_pending' && roomState.activeCrisisCard && currentTeamOnBoard && (
        appMode === 'host' ? (
          <CrisisModal
            crisisCard={roomState.activeCrisisCard}
            currentTeam={currentTeamOnBoard}
            onDefuse={handleHostDefuse}
            onFailedDefuse={handleHostFailedDefuse}
          />
        ) : isMyTurnOnClient ? (
          <CrisisModal
            crisisCard={roomState.activeCrisisCard}
            currentTeam={currentTeamOnBoard}
            onDefuse={handleClientDefuse}
            onFailedDefuse={handleClientFailedDefuse}
          />
        ) : (
          /* Spectator Waiting Alert for other teams */
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-md bg-white border border-rose-300 rounded-3xl p-6 sm:p-7 text-center shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <Flame className="w-7 h-7 animate-pulse" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Khủng hoảng đang diễn ra
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-3 mb-1.5">
                {currentTeamOnBoard.name} vừa rút phải lá Crisis!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Đội bạn đang chờ đối thủ tìm phương án dự phòng (Backup Plan) để gỡ bài...
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 font-medium">
                👀 Hãy chú ý theo dõi diễn biến và đồng hồ đếm ngược trên màn hình máy chiếu!
              </div>
            </div>
          </div>
        )
      )}

      {/* Online QnA Modal - Active Team or Host */}
      {roomState?.phase === 'qna_pending' && roomState.activeQna && currentTeamOnBoard && (
        appMode === 'host' ? (
          <QnaModal
            currentTeam={currentTeamOnBoard}
            qnaItem={roomState.activeQna}
            onComplete={handleHostQnaSubmit}
          />
        ) : isMyTurnOnClient ? (
          <QnaModal
            currentTeam={currentTeamOnBoard}
            qnaItem={roomState.activeQna}
            onComplete={handleClientQnaSubmit}
          />
        ) : (
          /* Spectator Waiting Alert for other teams */
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-md bg-white border border-sky-300 rounded-3xl p-6 sm:p-7 text-center shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <HelpCircle className="w-7 h-7 animate-bounce" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Thử thách 7 Bước
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-3 mb-1.5">
                {currentTeamOnBoard.name} đang trả lời câu hỏi!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Nếu trả lời đúng, đội sẽ bảo toàn HP. Cả lớp cùng theo dõi câu hỏi trên máy chiếu nhé!
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 font-medium">
                🎯 Chỉ đội đang đối mặt mới được quyền bấm chọn đáp án trên thiết bị của họ.
              </div>
            </div>
          </div>
        )
      )}

      {/* Offline Crisis Modal */}
      {appMode === 'pass_and_play' && offlinePhase === 'crisis_pending' && offlineCrisisCard && (
        <CrisisModal
          crisisCard={offlineCrisisCard}
          currentTeam={offlineTeams[offlineCurrentTeamIdx]}
          onDefuse={handleOfflineDefuse}
          onFailedDefuse={handleOfflineFailedDefuse}
        />
      )}

      {/* Offline QnA Modal */}
      {appMode === 'pass_and_play' && offlinePhase === 'qna_pending' && offlineQna && (
        <QnaModal
          currentTeam={offlineTeams[offlineCurrentTeamIdx]}
          qnaItem={offlineQna}
          onComplete={handleOfflineQnaComplete}
        />
      )}

      {/* Analytical Scan Modal */}
      {scanCards && (
        <ScanModal
          cards={scanCards}
          onClose={() => setScanCards(null)}
        />
      )}

      {/* Stakeholder Empathy Modal */}
      {isStakeholderOpen && (
        <StakeholderModal
          currentTeam={appMode === 'join' && myTeam ? myTeam : offlineTeams[offlineCurrentTeamIdx]}
          teams={appMode === 'join' && roomState ? roomState.teams : offlineTeams}
          onSelectTargetTeam={appMode === 'join' ? handleClientStakeholderTarget : handleOfflineStakeholderTransfer}
          onCancel={() => {
            setIsStakeholderOpen(false);
            setPendingStakeholderCard(null);
          }}
        />
      )}

      {/* Rules Guide Modal */}
      {showRules && (
        <RulesModal onClose={() => setShowRules(false)} />
      )}

      {/* Victory / Winner Modal */}
      {((appMode === 'pass_and_play' && offlinePhase === 'game_over') || (roomState?.phase === 'game_over')) && (
        <WinnerModal
          winner={roomState ? (onlineWinner || roomState.teams[0]) : (offlineWinner || offlineTeams[0])}
          onRestart={() => {
            setAppMode('menu');
            setRoomState(null);
            setMyTeamId(null);
            setOfflinePhase('lobby');
          }}
        />
      )}

    </div>
  );
}

export default App;
