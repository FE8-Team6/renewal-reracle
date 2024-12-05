import { PuzzleItem, WASTE_TYPES } from '@/types/reraclePuzzleGame.ts';

type LevelConfig = {
  [key: number]: { boardSize: number };
};

export const PUZZLE_ITEMS: PuzzleItem[] = [
  { id: 1, type: 'metal', name: '알루미늄 캔', image: '🥤', correctBin: WASTE_TYPES.METAL },
  { id: 2, type: 'metal', name: '통조림캔', image: '🥫', correctBin: WASTE_TYPES.METAL },
  { id: 3, type: 'metal', name: '스프레이 캔', image: '💨', correctBin: WASTE_TYPES.METAL },
  { id: 4, type: 'paper', name: '신문지', image: '📰', correctBin: WASTE_TYPES.PAPER },
  { id: 5, type: 'paper', name: '종이상자', image: '📦', correctBin: WASTE_TYPES.PAPER },
  { id: 6, type: 'paper', name: '책', image: '📚', correctBin: WASTE_TYPES.PAPER },
  { id: 7, type: 'plastic', name: '페트병', image: '🧃', correctBin: WASTE_TYPES.PLASTIC },
  { id: 8, type: 'plastic', name: '요구르트', image: '🥛', correctBin: WASTE_TYPES.PLASTIC },
  { id: 9, type: 'plastic', name: '샴푸통', image: '🧴', correctBin: WASTE_TYPES.PLASTIC },
  { id: 10, type: 'glass', name: '유리병', image: '🍾', correctBin: WASTE_TYPES.GLASS },
  { id: 11, type: 'glass', name: '와인병', image: '🍷', correctBin: WASTE_TYPES.GLASS },
  { id: 12, type: 'glass', name: '맥주병', image: '🍺', correctBin: WASTE_TYPES.GLASS },
  { id: 13, type: 'food', name: '사과껍질', image: '🍎', correctBin: WASTE_TYPES.FOOD },
  { id: 14, type: 'food', name: '바나나껍질', image: '🍌', correctBin: WASTE_TYPES.FOOD },
  { id: 15, type: 'food', name: '당근껍질', image: '🥕', correctBin: WASTE_TYPES.FOOD },
  { id: 16, type: 'electronics', name: '휴대폰', image: '📱', correctBin: WASTE_TYPES.ELECTRONICS },
  { id: 17, type: 'electronics', name: '노트북', image: '💻', correctBin: WASTE_TYPES.ELECTRONICS },
  { id: 18, type: 'electronics', name: '텔레비전', image: '📺', correctBin: WASTE_TYPES.ELECTRONICS },
  { id: 19, type: 'hazardous', name: '배터리', image: '🔋', correctBin: WASTE_TYPES.HAZARDOUS },
  { id: 20, type: 'hazardous', name: '페인트', image: '🎨', correctBin: WASTE_TYPES.HAZARDOUS },
  { id: 21, type: 'hazardous', name: '살충제', image: '💨', correctBin: WASTE_TYPES.HAZARDOUS },
];

export const LEVEL_CONFIG: LevelConfig = {
  1: { boardSize: 4 },
  2: { boardSize: 8 },
  3: { boardSize: 12 },
  4: { boardSize: 16 },
  5: { boardSize: 20 },
};

export const shuffleArray = (array: string[]): string[] => {
  const copiedArray = [...array];
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }
  return copiedArray;
};
