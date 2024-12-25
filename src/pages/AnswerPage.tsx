import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, deleteDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MoreHorizontal } from 'lucide-react';
import { formatDateToKoreanTime } from '@/utils/dateKoreanTime';
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
import { KakaoAdfit320x50 } from '@/components/KakaoAdfit';
import { formatContent } from '@/constant/formatContent';

type SubmittedAnswer = {
  id: string;
  author: string;
  authorUid: string;
  content: string;
  createdAt: string;
  likes: number;
}[];

const AnswerPage = () => {
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
  const postCategory = location.state?.postCategory || '';
  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswer>(location.state?.submittedAnswers || []);
  const [likes, setLikes] = useState<number>(location.state?.likes || 0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(location.state?.likedPosts || []));
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(initialQuestion);
  const [editContent, setEditContent] = useState<string>(initialContent);
  const [question, setQuestion] = useState<string>(initialQuestion);
  const [content, setContent] = useState<string>(initialContent);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 395);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <main aria-label="질문과 답변">
      <section>
        <div className="px-4 py-2">
          <p className="text-sm text-purple" tabIndex={0} aria-label={`카테고리: ${postCategory}`}>
            {postCategory}
          </p>
          <h1 className="text-xl" tabIndex={0} aria-label={`질문: ${question}`}>
            {question}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full mt-2">
              <p className="font-semibold" tabIndex={0} aria-label={`질문자: ${author}`} role="text">
                {author}
              </p>
              {currentUser.uid === authorUid && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="게시글 관리 메뉴">
                      <MoreHorizontal className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[6rem]">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={() => setIsEditModalOpen(true)}
                      aria-label="게시글 수정하기"
                    >
                      수정
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={handleDeleteQuestion}
                      aria-label="게시글 삭제하기"
                    >
                      삭제
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
          {createdAt && (
            <time className="text-sm" tabIndex={0} aria-label={`작성일: ${formatDateToKoreanTime(createdAt)}`}>
              {formatDateToKoreanTime(createdAt)}
            </time>
          )}
          <div className="mt-2">
            <hr />
            <p className="mt-2" tabIndex={0} aria-label={`질문 내용: ${content}`} role="text">
              {content}
            </p>
          </div>
          <div className="flex gap-3">
            <p tabIndex={0} aria-label={`댓글 수 ${submittedAnswers.length}개`} role="text">
              댓글 {submittedAnswers.length}
            </p>
            <div className="flex items-center">
              <button
                className="pr-1"
                type="button"
                onClick={() => handleLike(questionId)}
                aria-label={`좋아요 ${likedPosts.has(questionId) ? '취소하겠습니까?' : '누르시겠습니까?'}`}
                aria-pressed={likedPosts.has(questionId)}
              >
                <ThumbsUp
                  className={`w-5 h-5 ${likedPosts.has(questionId) ? 'text-blue-500' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <span tabIndex={0} aria-label={`좋아요 ${likes}개`}>
                {likes}
              </span>
            </div>
          </div>
        </div>
        <div className={`min-h-[calc(100vh-12rem)]  space-y-2 pb-[6rem]`}>
          <KakaoAdfit320x50 />
          {submittedAnswers.map(({ id, author, content, createdAt }) => (
            <div
              key={id}
              tabIndex={0}
              aria-label="답변 내용"
              className={`relative flex flex-col ${isSmallScreen ? 'w-[20rem]' : 'w-[23rem]'} mx-auto p-2 text-lg bg-purpleLight rounded-4`}
            >
              <p className="text-sm" tabIndex={0} aria-label={`답변자: ${author}`}>
                {author}
              </p>
              <p className="text-lg text-black" tabIndex={0} aria-label={`답변 내용: ${formatContent(content)}`}>
                {formatContent(content)}
              </p>
              {createdAt && (
                <time
                  className="text-xs text-gray-500"
                  tabIndex={0}
                  aria-label={`작성일: ${formatDateToKoreanTime(new Date(createdAt))}`}
                >
                  {formatDateToKoreanTime(new Date(createdAt))}
                </time>
              )}
            </div>
          ))}
          <nav className="flex flex-col w-[23rem] mx-auto">
            <NavLink to={`/comments/${questionId}`} state={{ questionId, question, submittedAnswers }}>
              <Button variant="link" size="sm">
                댓글을 남겨보세요.
              </Button>
            </NavLink>
          </nav>
        </div>
      </section>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen} aria-labelledby="edit-dialog-title">
        <DialogContent role="dialog">
          <DialogHeader>
            <DialogTitle id="edit-dialog-title">게시글 수정</DialogTitle>
            <DialogDescription>게시글을 수정하세요.</DialogDescription>
          </DialogHeader>
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="edit-title" className="sr-only">
              제목
            </label>
            <input
              id="edit-title"
              type="text"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              placeholder="제목"
              className="w-full p-2 mb-2 border"
              aria-label="수정할 제목"
            />
            <label htmlFor="edit-content" className="sr-only">
              내용
            </label>
            <textarea
              id="edit-content"
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
              placeholder="내용"
              className="w-full h-[30vh] p-2 mb-2 border"
              aria-label="수정할 내용"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="default" size="sm" onClick={handleEditQuestion} aria-label="수정 완료">
                  수정
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="secondary" size="sm" aria-label="수정 취소">
                  닫기
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AnswerPage;
