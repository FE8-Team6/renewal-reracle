import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { formatDateToKoreanTime } from '@/lib/utils/dateKoreanTime';
import BackHeader from '@/lib/common/BackHeader';
import { KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const Comments = () => {
  const location = useLocation();
  const questionId = location.state?.questionId || '';
  const question = location.state?.question || '';
  const [submittedAnswers, setSubmittedAnswers] = useState(location.state?.submittedAnswers || []);

  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    displayName: string;
  }>({
    uid: '',
    displayName: '',
  });
  const [answer, setAnswer] = useState<string>('');
  const [editingAnswer, setEditingAnswer] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 395);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleSubmit = async () => {
    if (!currentUser.uid) {
      alert('로그인이 필요합니다');
      return;
    }

    if (answer.trim() === '') {
      alert('글을 작성해주세요');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'answers'), {
        questionId: questionId,
        question: question,
        author: currentUser.displayName,
        authorUid: currentUser.uid,
        content: answer,
        createdAt: serverTimestamp(),
      });
      setSubmittedAnswers([
        ...submittedAnswers,
        {
          id: docRef.id,
          author: currentUser.displayName,
          content: answer,
          authorUid: currentUser.uid,
          createdAt: new Date().toISOString(),
        },
      ]);
      setAnswer('');
    } catch (error) {
      console.error('POST 에러 발생: ', error);
    }
  };

  const handleDeleteAnswer = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'answers', id));
      setSubmittedAnswers(submittedAnswers.filter((answer: { id: string }) => answer.id !== id));
    } catch (error) {
      console.error('DELETE 에러 발생: ', error);
    }
  };

  const handleEditAnswer = async () => {
    if (!editingAnswer) return;

    try {
      const answerDoc = doc(db, 'answers', editingAnswer);
      await updateDoc(answerDoc, { content: editedContent });
      setSubmittedAnswers(
        submittedAnswers.map((answer: { id: string }) =>
          answer.id === editingAnswer ? { ...answer, content: editedContent } : answer,
        ),
      );
      setEditingAnswer(null);
      setEditedContent('');
    } catch (error) {
      console.error('UPDATE 에러 발생: ', error);
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };

  return (
    <>
      <BackHeader comment={submittedAnswers} />
      <main className="overflow-y-auto">
        <KakaoAdfit320x50 />

        <div className={`space-y-2 mt-4 min-h-[calc(100vh-12rem)] pb-[5rem] `}>
          {submittedAnswers
            .slice()
            .sort(
              (
                a: {
                  createdAt: string;
                },
                b: {
                  createdAt: string;
                },
              ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            )
            .map((answer: { id: string; author: string; content: string; authorUid: string; createdAt: string }) => (
              <div
                key={answer.id}
                className={`relative flex flex-col ${isSmallScreen ? 'w-[20rem]' : 'w-[23rem]'}  mx-auto p-2 text-lg bg-purpleLight border rounded-4`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm">{answer.author}</p>
                  {currentUser && currentUser.uid === answer.authorUid && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-4 h-4">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            setEditingAnswer(answer.id);
                            setEditedContent(answer.content);
                          }}>
                          수정
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleDeleteAnswer(answer.id)}>
                          삭제
                        </Button>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                <div className="text-lg text-black">{formatContent(answer.content)}</div>
                {answer.createdAt && (
                  <time className="text-xs text-gray-500">{formatDateToKoreanTime(new Date(answer.createdAt))}</time>
                )}
                <Dialog open={editingAnswer === answer.id} onOpenChange={() => setEditingAnswer(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>댓글 수정</DialogTitle>
                      <DialogDescription>댓글 내용을 수정하세요.</DialogDescription>
                    </DialogHeader>
                    <textarea
                      value={editedContent}
                      onChange={(event) => setEditedContent(event.target.value)}
                      className="w-[20rem] border border-gray-300 h-28 rounded-4"
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="default" size="default" onClick={handleEditAnswer} className="w-[20rem]">
                          확인
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          <div className="mt-4 text-center">
            <textarea
              className={` ${isSmallScreen ? 'w-[20rem]' : 'w-[23rem]'}  h-[8vh] border border-gray-300 rounded-4`}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
            <Button
              variant="default"
              size="default"
              onClick={handleSubmit}
              className={`mb-5 ${isSmallScreen ? 'w-[20rem]' : 'w-[23rem]'}`}>
              제출
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Comments;
