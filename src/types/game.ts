export type CardType = 'crisis' | 'defense' | 'skill';

export type SkillCategory = 'analytical' | 'creative' | 'critical' | 'stakeholder' | 'action';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  category?: SkillCategory;
  description: string;
  theoryRef: string;
  badge: string;
  accentColor: string;
}

export interface TeamAlert {
  id: string;
  sourceTeamName: string;
  cardName: string;
  message: string;
  type: 'attack' | 'stolen' | 'shield' | 'info';
  timestamp: string;
}

export interface Team {
  id: string;
  name: string;
  avatar: string;
  color: string;
  hp: number; // 0 - 2 (2 mạng sống)
  hand: Card[];
  isAlive: boolean;
  hasShield: boolean;
  connected?: boolean;
  socketId?: string | null;
  tabSwitches?: number;
  targetedAlert?: TeamAlert | null;
  isUnderDoubleAction?: boolean;
}

export type GamePhase = 
  | 'lobby'          // Cài đặt số đội & tên đội / phòng chờ
  | 'playing'        // Vòng lặp trận đấu chính
  | 'crisis_pending' // Rút trúng Crisis, đếm ngược dùng Backup Plan
  | 'qna_pending'    // Không có Backup Plan, trả lời câu hỏi 7 bước
  | 'game_over';     // Kết thúc ván đấu & tổng kết bài học

export interface RoomState {
  code: string;
  hostSocketId?: string;
  phase: GamePhase;
  teams: Team[];
  currentTeamIndex: number;
  drawPile: Card[];
  discardPile: Card[];
  actionLogs: ActionLog[];
  activeCrisisCard: Card | null;
  activeQna: QnaItem | null;
  extraTurns?: number;
  usedQuestionIds?: string[];
}

export interface QnaOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QnaItem {
  id: string;
  step: string;
  scenario: string;
  question: string;
  options: QnaOption[];
}

export interface ActionLog {
  id: string;
  timestamp: string;
  teamId: string;
  teamName: string;
  message: string;
  type: 'info' | 'warning' | 'danger' | 'success';
}
