import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { KakaoAdfit320x50, KakaoAdfit320x100 } from '@/components/KakaoAdfit';
import { QuestionForm, QuestionItem } from '@/components/Question';
import { PostCategoryButton } from '@/lib/common/CategoryButton';

type QuestionType = {
  id: string;
  question: string;
  author: string;
  authorUid: string;
  content: string;
  createdAt: Timestamp;
  likes: number;
  commentCount: number;
  postCategory: string;
}[];

const QnaPage = () => {
  const [questions, setQuestions] = useState<QuestionType>([]);
  const [currentUser, setCurrentUser] = useState<{
    displayName: string;
    uid: string;
  }>({
    displayName: '',
    uid: '',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [postCategory, setPostCategory] = useState<string>('분리수거 방법');
  const [selectedPostCategory, setSelectedPostCategory] = useState<string>('전체');
  const postCategories = ['전체', '분리수거 방법', '기타', '문의'];

  const filteredQuestions =
    selectedPostCategory === '전체'
      ? questions
      : questions.filter((question) => question.postCategory === selectedPostCategory);

  /**
   * @description 로컬스토리지에 저장된 사용자 정보를 불러옵니다.
   */
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      let questionsQuery;
      if (selectedPostCategory === '전체') {
        questionsQuery = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
      } else {
        questionsQuery = query(
          collection(db, 'questions'),
          where('postCategory', '==', selectedPostCategory),
          orderBy('createdAt', 'desc'),
        );
      }
      const querySnapshot = await getDocs(questionsQuery);
      const questionList: QuestionType = [];
      for (const doc of querySnapshot.docs) {
        const questionData = doc.data();
        const answersSnapshot = await getDocs(query(collection(db, 'answers'), where('questionId', '==', doc.id)));
        questionList.push({
          id: doc.id,
          question: questionData.question,
          author: questionData.author,
          authorUid: questionData.authorUid,
          content: questionData.content,
          createdAt: questionData.createdAt,
          likes: questionData.likes || 0,
          commentCount: answersSnapshot.size,
          postCategory: questionData.postCategory,
        });
      }
      setQuestions(questionList);
    };

    const fetchLiked = async () => {
      if (currentUser.uid) {
        const q = query(collection(db, 'likes'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const likedPostIds = new Set<string>();
        querySnapshot.forEach((doc) => {
          likedPostIds.add(doc.data().postId);
        });
        setLikedPosts(likedPostIds);
      }
    };

    fetchQuestions();
    fetchLiked();
  }, [currentUser.uid, selectedPostCategory]);

  const handleAddQuestion = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    try {
      await addDoc(collection(db, 'questions'), {
        question: title,
        content,
        author: currentUser.displayName,
        authorUid: currentUser.uid,
        createdAt: serverTimestamp(),
        likes: 0,
        commentCount: 0,
        postCategory,
      });

      const updatedQuestions = await getDocs(query(collection(db, 'questions'), orderBy('createdAt', 'desc')));
      const questionList: QuestionType = [];
      for (const doc of updatedQuestions.docs) {
        const questionData = doc.data();
        const answersSnapshot = await getDocs(query(collection(db, 'answers'), where('questionId', '==', doc.id)));
        questionList.push({
          id: doc.id,
          question: questionData.question,
          content: questionData.content,
          author: questionData.author,
          authorUid: questionData.authorUid,
          createdAt: questionData.createdAt,
          likes: questionData.likes || 0,
          commentCount: answersSnapshot.size,
          postCategory: questionData.postCategory,
        });
      }
      setQuestions(questionList);
      setIsModalOpen(false);
      setTitle('');
      setContent('');
      setPostCategory('분리수거 방법');
    } catch (error) {
      console.error('질문 추가 실패:', error);
    }
  };

  /**
   * @description 만약 이미 좋아요를 누른 게시물이라면 좋아요를 취소하고, 아니라면 좋아요를 누릅니다.
   * @param id
   */
  const handleLiked = async (id: string) => {
    try {
      if (!currentUser.uid) {
        alert('로그인을 해주세요.');
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
        setQuestions((prev) =>
          prev.map((question) => (question.id === id ? { ...question, likes: question.likes - 1 } : question)),
        );
      } else {
        await setDoc(likeDocRef, {
          userId: currentUser.uid,
          postId: id,
        });
        await updateDoc(doc(db, 'questions', id), { likes: increment(1) });
        setLikedPosts((prev) => new Set(prev).add(id));
        setQuestions((prev) =>
          prev.map((question) => (question.id === id ? { ...question, likes: question.likes + 1 } : question)),
        );
      }
    } catch (error) {
      console.error('LIKE 에러 발생: ', error);
    }
  };

  return (
    <main>
      <KakaoAdfit320x50 />
      <div
        className="flex justify-center mt-1 whitespace-nowrap"
        role="radiogroup"
        aria-label="게시물 카테고리 선택할 수 있습니다."
        tabIndex={0}
        aria-live="polite"
      >
        {postCategories.map((postCategory) => (
          <PostCategoryButton
            key={postCategory}
            postCategory={postCategory}
            isActive={selectedPostCategory === postCategory}
            onClick={() => setSelectedPostCategory(postCategory)}
          />
        ))}
      </div>
      <section>
        <div className={`min-h-[calc(100vh-12rem)] mx-auto my-3 relative rounded-4 w-full pb-[5rem] px-8`}>
          <KakaoAdfit320x100 />
          {filteredQuestions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              likedPosts={likedPosts}
              currentUser={currentUser}
              handleLiked={handleLiked}
            />
          ))}
        </div>
        <QuestionForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleAddQuestion={handleAddQuestion}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          setPostCategory={setPostCategory}
        />
      </section>
    </main>
  );
};

export default QnaPage;
