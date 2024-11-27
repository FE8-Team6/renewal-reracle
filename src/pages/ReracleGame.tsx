import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ReracleGameTutorialModal from '@/components/ReracleGameTutorialModal';
import { LEVEL_CONFIG, PUZZLE_ITEMS, shuffleArray } from '@/lib/constant/ReracleGameItem';
import { Cell, PuzzleItem, WASTE_TYPES } from '@/lib/types/reraclePuzzleGame';

const ReraclePuzzle = () => {
  const [board, setBoard] = useState<Cell[]>([]);
  const [items, setItems] = useState<PuzzleItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PuzzleItem | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [moves, setMoves] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [lastAction, setLastAction] = useState<{ cell: Cell; item: PuzzleItem; isCorrect: boolean } | null>(null);
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);

  const initializeBoard = () => {
    const { boardSize } = LEVEL_CONFIG[level];

    const binTypes = Array.from({ length: boardSize }, (_, index) => {
      const types = Object.values(WASTE_TYPES);
      return types[index % types.length];
    });

    const shuffledBinTypes = shuffleArray(binTypes);

    const newBoard = shuffledBinTypes.map((binType, index) => ({
      id: index,
      binType: binType as WASTE_TYPES,
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
    setIsTimeOver(false);
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
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-2rem)] p-4">
      <ReracleGameTutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />

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
        <ul>
          <li>🟦 파란색 구역: 종이류</li>
          <li>⬜ 회색 구역: 금속류</li>
          <li>🟩 초록색 구역: 플라스틱류</li>
          <li>🟨 노란색 구역: 유리류</li>
          <li>🟥 빨간색 구역: 음식물류</li>
          <li>🟪 보라색 구역: 가전제품</li>
          <li>🟧 주황색 구역: 유해 폐기물</li>
        </ul>
      </div>

      <div className="space-x-2">
        <button onClick={handleRestart} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          재시작
        </button>
        <button
          onClick={() => setIsTutorialOpen(true)}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          튜토리얼 보기
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
