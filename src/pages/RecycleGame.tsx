import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type PuzzleItem = {
  id: number;
  type: string;
  name: string;
  image: string;
  correctBin: WASTE_TYPES;
};

type Cell = {
  id: number;
  binType: WASTE_TYPES;
  item: PuzzleItem | null;
};

type LevelConfig = {
  [key: number]: { boardSize: number };
};

const enum WASTE_TYPES {
  METAL = 'metal',
  PAPER = 'paper',
  PLASTIC = 'plastic',
  GLASS = 'glass',
  FOOD = 'food',
  ELECTRONICS = 'electronics',
  HAZARDOUS = 'hazardous',
}

const PUZZLE_ITEMS: PuzzleItem[] = [
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

const LEVEL_CONFIG: LevelConfig = {
  1: { boardSize: 4 },
  2: { boardSize: 8 },
  3: { boardSize: 12 },
  4: { boardSize: 16 },
  5: { boardSize: 20 },
};

const ReraclePuzzle = () => {
  const [board, setBoard] = useState<Cell[]>([]);
  const [items, setItems] = useState<PuzzleItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PuzzleItem | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [lastAction, setLastAction] = useState<{ cell: Cell; item: PuzzleItem } | null>(null);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const shuffleArray = (array: string[]): string[] => {
    const copiedArray = [...array];
    for (let i = copiedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }
    return copiedArray;
  };

  const initializeBoard = () => {
    const { boardSize } = LEVEL_CONFIG[level];

    const binTypes = Array.from({ length: boardSize }, (_, index) => {
      const types = Object.values(WASTE_TYPES);
      return types[index % types.length];
    });

    const shuffledBinTypes = shuffleArray(binTypes);

    const newBoard = shuffledBinTypes.map((binType, index) => ({
      id: index,
      binType,
      item: null,
    }));

    setBoard(newBoard);
    setItems(PUZZLE_ITEMS);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTimeOver(true);
    }
  }, [timeLeft]);

  const handleItemSelect = (item: PuzzleItem) => {
    setSelectedItem(item);
  };

  const handleCellClick = (cell: Cell) => {
    if (!selectedItem) return;

    const newBoard = [...board];
    const cellIndex = newBoard.findIndex((c) => c.id === cell.id);

    if (cell.item) {
      setItems([...items, cell.item]);
      newBoard[cellIndex] = { ...cell, item: null };
      setBoard(newBoard);
      setSelectedItem(cell.item);
      return;
    }

    const isCorrect = selectedItem.correctBin === cell.binType;

    newBoard[cellIndex] = {
      ...cell,
      item: selectedItem,
    };

    setBoard(newBoard);
    setItems(items.filter((item) => item.id !== selectedItem.id));
    setSelectedItem(null);
    setMoves(moves + 1);

    if (isCorrect) {
      setScore(score + 100);
    } else {
      setScore(Math.max(0, score - 50));
    }

    if (newBoard.every((cell) => cell.item)) {
      checkPuzzleComplete(newBoard);
    }

    setLastAction({ cell, item: selectedItem, isCorrect });
  };

  const checkPuzzleComplete = (currentBoard: Cell[]) => {
    const isAllCorrect = currentBoard.every((cell) => cell.item && cell.item.correctBin === cell.binType);

    if (isAllCorrect) {
      setIsComplete(true);
      setScore(score + 500);

      if (level < 3) {
        setTimeout(() => {
          setLevel(level + 1);
          setIsComplete(false);
          initializeBoard();
        }, 2000);
      } else {
        setTimeout(() => {
          alert('축하합니다! 모든 레벨을 완료했습니다!');
          handleRestart();
        }, 2000);
      }
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setMoves(0);
    setTimeLeft(10);
    initializeBoard();
  };

  const handleHint = () => {
    const nextHint = items.find((item) => !board.some((cell) => cell.item?.id === item.id));
    if (!nextHint) return;

    const correctCell = board.find((cell) => cell.binType === nextHint.correctBin);
    if (correctCell) {
      alert(`힌트: ${nextHint.name}는 ${nextHint.correctBin}에 넣으세요.`);
    }
  };

  const handleUndo = () => {
    if (!lastAction) return;
    const { cell, item, isCorrect } = lastAction;

    const newBoard = [...board];
    newBoard[cell.id] = { ...cell, item: null };

    setBoard(newBoard);
    setItems([...items, item]);
    setLastAction(null);

    if (isCorrect) {
      setScore(score - 100);
    } else {
      setScore(score + 50);
    }
  };

  const calculateGridRows = useMemo(() => {
    const gridSize = Math.ceil(Math.sqrt(board.length));
    return `grid-rows-${gridSize}`;
  }, [board.length]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">분리수거 퍼즐</h1>
        <div className="flex gap-4 justify-center">
          <div className="text-lg">레벨: {level}</div>
          <div className="text-lg">점수: {score}</div>
          <div className="text-lg">이동: {moves}</div>
          <div className="text-lg">남은 시간: {timeLeft}초</div>
        </div>
      </div>

      <div className={`grid grid-cols-4 gap-2 mb-8 ${calculateGridRows}`}>
        {board.map((cell) => (
          <div
            key={cell.id}
            onClick={() => handleCellClick(cell)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCellClick(cell);
              }
            }}
            tabIndex={0}
            role="button"
            className={`w-20 h-20 border-2 rounded-lg flex items-center justify-center cursor-pointer
              ${cell.binType === WASTE_TYPES.METAL ? 'bg-gray-100' : ''}
              ${cell.binType === WASTE_TYPES.PAPER ? 'bg-blue-400' : ''}
              ${cell.binType === WASTE_TYPES.PLASTIC ? 'bg-green' : ''}
              ${cell.binType === WASTE_TYPES.GLASS ? 'bg-yellow' : ''}
              ${cell.binType === WASTE_TYPES.FOOD ? 'bg-red' : ''}
              ${cell.binType === WASTE_TYPES.ELECTRONICS ? 'bg-purple' : ''}
              ${cell.binType === WASTE_TYPES.HAZARDOUS ? 'bg-orange-100' : ''}
            `}
          >
            {cell.item && <div className="text-4xl">{cell.item.image}</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemSelect(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleItemSelect(item);
              }
            }}
            tabIndex={0}
            role="button"
            className={`
              w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer
              ${selectedItem?.id === item.id ? 'border-blue-500 bg-blue-50' : ''}
            `}
          >
            <div className="text-2xl">{item.image}</div>
            <div className="text-xs text-center mt-1">{item.name}</div>
          </div>
        ))}
      </div>

      {isComplete && (
        <Alert className="mt-4 bg-green-50">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>축하합니다! 다음 레벨로 진행합니다!</AlertDescription>
        </Alert>
      )}

      {isTimeOver && (
        <Dialog open={isTimeOver} onOpenChange={setIsTimeOver}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>시간 초과</DialogTitle>
            </DialogHeader>
            <div className="text-center">
              <p>시간이 초과되었습니다. 게임을 다시 시작합니다.</p>
              <button
                onClick={handleRestart}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                재시작
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="mt-8 text-center text-gray-600">
        <h2 className="font-bold mb-2">분리수거 방법</h2>
        <p>🟦 파란색 구역: 종이류</p>
        <p>⬜ 회색 구역: 금속류</p>
        <p>🟩 초록색 구역: 플라스틱류</p>
        <p>🟨 노란색 구역: 유리류</p>
        <p>🟥 빨간색 구역: 음식물류</p>
        <p>🟪 보라색 구역: 가전제품</p>
        <p>🟧 주황색 구역: 유해 폐기물</p>
      </div>

      <div className="space-x-2">
        <button onClick={handleHint} className="mt-4 px-4 py-2 bg-yellow text-white rounded-lg hover:bg-yellow-600">
          힌트 보기
        </button>
        <button onClick={handleUndo} className="mt-4 px-4 py-2 bg-red text-white rounded-lg hover:bg-red-600">
          실수 취소
        </button>
      </div>
    </div>
  );
};

export default ReraclePuzzle;
