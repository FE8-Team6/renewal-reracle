import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type EditQuestionDialogProps = {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  editTitle: string;
  setEditTitle: (title: string) => void;
  editContent: string;
  setEditContent: (content: string) => void;
  handleEditQuestion: () => void;
};

const EditQuestionDialog = ({
  isEditModalOpen,
  setIsEditModalOpen,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  handleEditQuestion,
}: EditQuestionDialogProps) => {
  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시글 수정</DialogTitle>
          <DialogDescription>게시글을 수정하세요.</DialogDescription>
        </DialogHeader>
        <input
          type="text"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
          placeholder="제목"
          className="w-full p-2 mb-2 border"
        />
        <textarea
          value={editContent}
          onChange={(event) => setEditContent(event.target.value)}
          placeholder="내용"
          className="w-full h-[30vh] p-2 mb-2 border"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default" size="sm" onClick={handleEditQuestion}>
              수정
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="secondary" size="sm">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog;
