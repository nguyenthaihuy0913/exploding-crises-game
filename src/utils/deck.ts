import { Card } from '../types/game';
import { CRISIS_CARDS_DATA, DEFENSE_CARDS_DATA, SKILL_CARDS_DATA } from '../data/cards';

// Thuật toán xáo bài Fisher-Yates chuẩn xác
export function shuffleCards<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Khởi tạo bộ bài hoàn chỉnh
export function initializeDeck(teamCount: number): {
  hands: Card[][];
  drawPile: Card[];
  discardPile: Card[];
} {
  let cardIdCounter = 1;

  // 1. Tạo danh sách tất cả các lá bài phòng thủ & kỹ năng
  const defenseCards: Card[] = [];
  DEFENSE_CARDS_DATA.forEach(item => {
    for (let i = 0; i < item.count; i++) {
      defenseCards.push({
        ...item.card,
        id: `def-${cardIdCounter++}`,
      });
    }
  });

  const skillCards: Card[] = [];
  SKILL_CARDS_DATA.forEach(item => {
    for (let i = 0; i < item.count; i++) {
      skillCards.push({
        ...item.card,
        id: `skill-${cardIdCounter++}`,
      });
    }
  });

  // Tách ra các lá Backup Plan để phát sẵn cho mỗi đội 1 lá
  const backupPlanCards = defenseCards.filter(c => c.name.includes('Backup Plan'));
  const remainingDefense = defenseCards.filter(c => !c.name.includes('Backup Plan'));

  // 2. Chia bài khởi đầu cho từng đội (1 Backup Plan + 3 lá kỹ năng ngẫu nhiên)
  let shuffledSkills = shuffleCards([...skillCards, ...remainingDefense]);
  const hands: Card[][] = [];

  for (let t = 0; t < teamCount; t++) {
    const teamHand: Card[] = [];
    
    // Mỗi đội chắc chắn có 1 lá Backup Plan cứu nguy đầu game
    if (backupPlanCards.length > 0) {
      teamHand.push(backupPlanCards.pop()!);
    }

    // Rút 3 lá ngẫu nhiên từ kho kỹ năng
    for (let k = 0; k < 3; k++) {
      if (shuffledSkills.length > 0) {
        teamHand.push(shuffledSkills.pop()!);
      }
    }

    hands.push(teamHand);
  }

  // 3. Chuẩn bị các lá Crisis (Tăng mạnh số lượng lá nổ để tạo áp lực sinh tử liên tục)
  // Đảm bảo có từ 10 đến 14 lá nổ trong chồng bài rút
  const crisisCards: Card[] = [];
  const totalCrisisCount = Math.max(10, teamCount * 2 + 2);
  for (let i = 0; i < totalCrisisCount; i++) {
    const template = CRISIS_CARDS_DATA[i % CRISIS_CARDS_DATA.length];
    crisisCards.push({
      ...template,
      id: `crisis-${cardIdCounter++}`,
    });
  }

  // 4. Gộp toàn bộ bài còn lại (Crisis + Backup Plan thừa + Kỹ năng còn lại) làm Chồng bài rút chung (Draw Pile)
  const drawPile = shuffleCards([
    ...shuffledSkills,
    ...backupPlanCards,
    ...crisisCards,
  ]);

  return {
    hands,
    drawPile,
    discardPile: [],
  };
}
