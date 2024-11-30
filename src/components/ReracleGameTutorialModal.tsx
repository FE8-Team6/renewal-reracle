import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ReracleGameTutorialModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ReracleGameTutorialModal = ({ isOpen, onClose }: ReracleGameTutorialModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>분리수거 퍼즐 튜토리얼</DialogTitle>
        </DialogHeader>
        <div>
          <span>게임의 목표는 각 아이템을 올바른 분리수거함에 넣는 것입니다.</span>
          <br />
          <span>아이템을 클릭하여 선택한 후, 올바른 분리수거함을 클릭하여 넣으세요.</span>
        </div>
        <p>각 분리수거함의 색상은 다음과 같습니다:</p>
        <ul className="text-left">
          <li>🟦 파란색: 종이류</li>
          <li>⬜ 회색: 금속류</li>
          <li>🟩 초록색: 플라스틱류</li>
          <li>🟨 노란색: 유리류</li>
          <li>🟥 빨간색: 음식물류</li>
          <li>🟪 보라색: 가전제품</li>
          <li>🟧 주황색: 유해 폐기물</li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ReracleGameTutorialModal;
