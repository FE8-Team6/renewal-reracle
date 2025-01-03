import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GoPencil } from 'react-icons/go';
import { QuestionFormProps } from '@/types/question';

export const QuestionForm = ({
  isModalOpen,
  setIsModalOpen,
  handleAddQuestion,
  title,
  setTitle,
  content,
  setContent,
  setPostCategory,
}: QuestionFormProps) => {
  const handleOpenModal = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      alert('로그인이 필요합니다.');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="fixed bottom-[5rem] left-[50%] transform -translate-x-1/2">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <button
          onClick={handleOpenModal}
          className="p-2 border bg-purple rounded-10 [&:not(:disabled)]:bg-purple"
          aria-label="R지식in인 질문 작성하기"
          type="button"
        >
          <GoPencil className="w-5 h-5 text-white" />
        </button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>질문</DialogTitle>
            <DialogDescription>질문을 추가하세요.</DialogDescription>
          </DialogHeader>
          <label htmlFor="category" className="sr-only">
            카테고리
          </label>
          <Select
            onValueChange={(value) => setPostCategory(value)}
            defaultValue="분리수거 방법"
            aria-label="질문 카테고리 선택"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="분리수거 방법">분리수거 방법</SelectItem>
              <SelectItem value="기타">기타</SelectItem>
              <SelectItem value="문의">문의</SelectItem>
            </SelectContent>
          </Select>
          <label htmlFor="title" className="sr-only">
            제목
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목"
            aria-label="질문 제목을 입력하세요."
            className="w-full h-full pl-3 border border-gray-200 rounded-3"
          />
          <label htmlFor="content" className="sr-only">
            내용
          </label>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="내용"
            aria-label="질문 내용을 입력하세요."
            className="w-full h-[20vh] p-2 mb-2 border "
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" size="lg" aria-label="작성 취소하기">
                닫기
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="default" size="lg" aria-label="질문 등록하기" onClick={handleAddQuestion}>
                추가
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
