import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, deleteDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MoreHorizontal } from 'lucide-react';
import { formatDateToKoreanTime } from '@/lib/utils/dateKoreanTime';
import Nav from '@/components/Nav/Nav';
import BackHeader from '@/lib/common/BackHeader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import KakaoAdfit320x50 from '@/components/KakaoAdfit320x50';

type SubmittedAnswer = {
  id: string;
  author: string;
  authorUid: string;
  content: string;
  createdAt: string;
  likes: number;
}[];

const Answer = () => {
  const location = useLocation();
  const questionId = location.state?.questionId || '';
  const initialQuestion = location.state?.question || '';
  const initialContent = location.state?.content || '';
  const author = location.state?.author || '';
  const createdAt = location.state?.createdAt ? new Date(location.state.createdAt) : null;
  const currentUser = location.state?.currentUser || {
    displayName: '',
    uid: '',
  };
  const authorUid = location.state?.authorUid || '';
  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswer>(location.state?.submittedAnswers || []);
  const [likes, setLikes] = useState<number>(location.state?.likes || 0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(location.state?.likedPosts || []));
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(initialQuestion);
  const [editContent, setEditContent] = useState<string>(initialContent);
  const [question, setQuestion] = useState<string>(initialQuestion);
  const [content, setContent] = useState<string>(initialContent);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAnswers = async () => {
      const answersCollection = collection(db, 'answers');
      const answerQuery = query(answersCollection, where('questionId', '==', questionId));
      const querySnapshot = await getDocs(answerQuery);
      const answersData = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toISOString(),
          }) as {
            id: string;
            author: string;
            authorUid: string;
            content: string;
            createdAt: string;
            likes: number;
          },
      );
      answersData.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setSubmittedAnswers(answersData);
    };

    fetchAnswers();
  }, [questionId]);

  const handleLike = async (id: string) => {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        alert('로그인이 필요합니다.');
        return;
      }
      const likeDocRef = doc(db, 'likes', `${currentUser.uid}_${id}`);
      if (likedPosts.has(id)) {
        await deleteDoc(likeDocRef);
        await updateDoc(doc(db, 'questions', id), { likes: increment(-1) });
        setLikedPosts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        setLikes((prev) => prev - 1);
      } else {
        await setDoc(likeDocRef, {
          userId: currentUser.uid,
          postId: id,
        });
        await updateDoc(doc(db, 'questions', id), { likes: increment(1) });
        setLikedPosts((prev) => new Set(prev).add(id));
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.error('LIKE 에러 발생: ', error);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      await deleteDoc(doc(db, 'questions', questionId));
      navigate('/qna');
    } catch (error) {
      console.error('DELETE 에러 발생: ', error);
    }
  };

  const handleEditQuestion = async () => {
    try {
      await updateDoc(doc(db, 'questions', questionId), {
        question: editTitle,
        content: editContent,
      });
      setQuestion(editTitle);
      setContent(editContent);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('UPDATE 에러 발생: ', error);
    }
  };

  return (
    <>
      <BackHeader />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{author}</p>
          {currentUser.uid === authorUid && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[6rem]">
                <Button variant="default" size="sm" className="w-full" onClick={() => setIsEditModalOpen(true)}>
                  수정
                </Button>
                <Button variant="secondary" size="sm" className="w-full" onClick={handleDeleteQuestion}>
                  삭제
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
        {createdAt && <p className="text-sm">{formatDateToKoreanTime(createdAt)}</p>}
        <div className="mt-2">
          <p className="text-lg text-center">{question}</p>
          <p className="mt-2 text-base text-center">{content}</p>
        </div>
        <div className="flex gap-3">
          <p>댓글 {submittedAnswers.length}</p>
          <div className="flex items-center">
            <button className="pr-1" onClick={() => handleLike(questionId)}>
              <ThumbsUp className={`w-5 h-5 ${likedPosts.has(questionId) ? 'text-blue-500' : ''}`} />
            </button>
            <span>{likes}</span>
          </div>
        </div>
      </div>

      <div className="h-[54vh]  space-y-2 overflow-y-auto">
        <KakaoAdfit320x50 />

        {submittedAnswers.map(({ id, author, content, createdAt }) => (
          <div key={id} className="relative flex flex-col w-[22rem] mx-auto p-2 text-lg bg-purpleLight rounded-4">
            <p className="text-sm">{author}</p>
            <p className="text-lg text-black">{content}</p>
            {createdAt && <p className="text-xs text-gray-500">{formatDateToKoreanTime(new Date(createdAt))}</p>}
          </div>
        ))}
        <NavLink to={`/comments/${questionId}`} state={{ questionId, question, submittedAnswers }}>
          <Button variant="link" size="sm">
            댓글을 남겨보세요.
          </Button>
        </NavLink>
      </div>

      <Nav />
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
    </>
  );
};

export default Answer;
