import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PuzzleItem {
  id: number;
  type: string;
  name: string;
  image: string;
  correctBin: string;
}

interface Cell {
  id: number;
  binType: string;
  item: PuzzleItem | null;
}

const WASTE_TYPES = {
  METAL: 'metal',
  PAPER: 'paper',
  PLASTIC: 'plastic',
  GLASS: 'glass',
  FOOD: 'food',
};

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
];

const ReraclePuzzle: React.FC = () => {
  const [board, setBoard] = useState<Cell[]>([]);
  const [items, setItems] = useState<PuzzleItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PuzzleItem | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lastAction, setLastAction] = useState<{ cell: Cell; item: PuzzleItem } | null>(null);

  const initializeBoard = () => {
    const binTypes = [
      WASTE_TYPES.METAL,
      WASTE_TYPES.METAL,
      WASTE_TYPES.METAL,
      WASTE_TYPES.PAPER,
      WASTE_TYPES.PAPER,
      WASTE_TYPES.PAPER,
      WASTE_TYPES.PLASTIC,
      WASTE_TYPES.PLASTIC,
      WASTE_TYPES.PLASTIC,
      WASTE_TYPES.GLASS,
      WASTE_TYPES.GLASS,
      WASTE_TYPES.GLASS,
      WASTE_TYPES.FOOD,
      WASTE_TYPES.FOOD,
      WASTE_TYPES.FOOD,
    ];

    const newBoard = binTypes.map((binType, index) => ({
      id: index,
      binType,
      item: null,
    }));

    setBoard(newBoard);

    const shuffledItems = [...PUZZLE_ITEMS].sort(() => Math.random() - 0.5).slice(0, 15);
    setItems(shuffledItems);
  };

  useEffect(() => {
    initializeBoard();
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      alert('시간 초과! 게임을 다시 시작합니다.');
      handleRestart();
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

    setLastAction({ cell, item: selectedItem });
  };
  // 퍼즐 완성 체크
  const checkPuzzleComplete = (currentBoard: Cell[]) => {
    const isAllCorrect = currentBoard.every((cell) => cell.item && cell.item.correctBin === cell.binType);

    if (isAllCorrect) {
      setIsComplete(true);
      setScore(score + 500);
      setTimeout(() => {
        setLevel(level + 1);
        setIsComplete(false);
        initializeBoard();
      }, 2000);
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setMoves(0);
    setTimeLeft(60);
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
    const { cell, item } = lastAction;

    const newBoard = [...board];
    newBoard[cell.id] = { ...cell, item: null };

    setBoard(newBoard);
    setItems([...items, item]);
    setLastAction(null);
  };

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

      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((cell) => (
          <div
            key={cell.id}
            onClick={() => handleCellClick(cell)}
            className={`
              w-24 h-24 border-2 rounded-lg flex items-center justify-center cursor-pointer
              ${cell.binType === WASTE_TYPES.METAL ? 'bg-gray-100' : ''}
              ${cell.binType === WASTE_TYPES.PAPER ? 'bg-blue-100' : ''}
              ${cell.binType === WASTE_TYPES.PLASTIC ? 'bg-green' : ''}
              ${cell.binType === WASTE_TYPES.GLASS ? 'bg-yellow' : ''}
              ${cell.binType === WASTE_TYPES.FOOD ? 'bg-red' : ''}
              ${selectedItem && !cell.item ? 'border-dashed border-gray-400' : ''}
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

      <div className="mt-8 text-center text-gray-600">
        <h2 className="font-bold mb-2">분리수거 방법</h2>
        <p>🟦 파란색 구역: 종이류</p>
        <p>⬜ 회색 구역: 금속류</p>
        <p>🟩 초록색 구역: 플라스틱류</p>
        <p>🟨 노란색 구역: 유리류</p>
        <p>🟥 빨간색 구역: 음식물류</p>
      </div>

      <div className="space-x-2">
        <button onClick={handleRestart} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          재시작
        </button>
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
