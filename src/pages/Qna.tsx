import { useState, useEffect } from "react";
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
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";
import QuestionModal from "@/components/modal/QuestionModal";
import { serverTimestamp } from "firebase/firestore";
import { formatDateToKoreanTime } from "@/lib/utils/dateKoreanTime";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

type Question = {
  id: string;
  question: string;
  author: string;
  authorUid: string;
  content: string;
  createdAt: Timestamp;
  likes: number;
  commentCount: number;
}[];

export const Qna = () => {
  const [questions, setQuestions] = useState<Question>([]);
  const [currentUser, setCurrentUser] = useState<{
    displayName: string;
    uid: string;
  }>({
    displayName: "",
    uid: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  /**
   * @description 로컬스토리지에 저장된 사용자 정보를 불러옵니다.
   */
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      const queryOrderBy = query(
        collection(db, "questions"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(queryOrderBy);
      const questionList: Question = [];
      for (const doc of querySnapshot.docs) {
        const questionData = doc.data();
        const answersSnapshot = await getDocs(
          query(collection(db, "answers"), where("questionId", "==", doc.id))
        );
        questionList.push({
          id: doc.id,
          question: questionData.question,
          author: questionData.author,
          authorUid: questionData.authorUid,
          content: questionData.content,
          createdAt: questionData.createdAt,
          likes: questionData.likes || 0,
          commentCount: answersSnapshot.size,
        });
      }
      setQuestions(questionList);
    };

    const fetchLikedPosts = async () => {
      if (currentUser.uid) {
        const q = query(
          collection(db, "likes"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const likedPostIds = new Set<string>();
        querySnapshot.forEach((doc) => {
          likedPostIds.add(doc.data().postId);
        });
        setLikedPosts(likedPostIds);
      }
    };

    getQuestions();
    fetchLikedPosts();
  }, [currentUser.uid]);

  const handleAddQuestion = async (title: string, content: string) => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    try {
      await addDoc(collection(db, "questions"), {
        question: title,
        content,
        author: currentUser.displayName,
        authorUid: currentUser.uid,
        createdAt: serverTimestamp(),
        likes: 0,
        commentCount: 0,
      });

      const updatedQuestions = await getDocs(
        query(collection(db, "questions"), orderBy("createdAt", "desc"))
      );
      const questionList: Question = [];
      for (const doc of updatedQuestions.docs) {
        const questionData = doc.data();
        const answersSnapshot = await getDocs(
          query(collection(db, "answers"), where("questionId", "==", doc.id))
        );
        questionList.push({
          id: doc.id,
          question: questionData.question,
          content: questionData.content,
          author: questionData.author,
          authorUid: questionData.authorUid,
          createdAt: questionData.createdAt,
          likes: questionData.likes || 0,
          commentCount: answersSnapshot.size,
        });
      }
      setQuestions(questionList);
      setIsModalOpen(false);
    } catch (error) {
      console.error("질문 추가 실패:", error);
    }
  };

  /**
   * @description 만약 이미 좋아요를 누른 게시물이라면 좋아요를 취소하고, 아니라면 좋아요를 누릅니다.
   * @param id
   */
  const handleLike = async (id: string) => {
    try {
      const likeDocRef = doc(db, "likes", `${currentUser.uid}_${id}`);
      if (likedPosts.has(id)) {
        await deleteDoc(likeDocRef);
        await updateDoc(doc(db, "questions", id), { likes: increment(-1) });
        setLikedPosts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        setQuestions((prev) =>
          prev.map((question) =>
            question.id === id
              ? { ...question, likes: question.likes - 1 }
              : question
          )
        );
      } else {
        await setDoc(likeDocRef, {
          userId: currentUser.uid,
          postId: id,
        });
        await updateDoc(doc(db, "questions", id), { likes: increment(1) });
        setLikedPosts((prev) => new Set(prev).add(id));
        setQuestions((prev) =>
          prev.map((question) =>
            question.id === id
              ? { ...question, likes: question.likes + 1 }
              : question
          )
        );
      }
    } catch (error) {
      console.error("LIKE 에러 발생: ", error);
    }
  };

  const handleOpenModal = () => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      alert("로그인이 필요합니다.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="w-full h-[2rem] bg-purple text-center flex items-center justify-center text-white text-[2vh]">
        R지식in
      </div>
      <button
        className="p-1 mx-auto text-black border "
        onClick={handleOpenModal}
      >
        질문
      </button>
      <div className="w-[23rem] h-full relative overflow-y-auto overflow-x-hidden mx-auto my-[1.5vh] ">
        {questions.map((question) => (
          <div
            key={question.id}
            className=" bg-greenLight w-full h-[5rem] mx-auto my-3 flex items-center justify-between px-3 rounded-4 text-black "
          >
            <NavLink
              to={`/answer/${question.id}`}
              state={{
                questionId: question.id,
                question: question.question,
                content: question.content,
                author: question.author,
                createdAt: question.createdAt
                  ? question.createdAt.toDate().toISOString()
                  : null,
                likes: question.likes,
                likedPosts: Array.from(likedPosts),
                commentCount: question.commentCount,
                currentUser,
              }}
            >
              <span>{question.question}</span>
              <span>{question.author} 님</span>
              {question.createdAt && (
                <p className="text-sm">
                  {formatDateToKoreanTime(question.createdAt.toDate())}
                </p>
              )}
              <p className="text-sm">댓글 {question.commentCount}개</p>
            </NavLink>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLike(question.id)}
              >
                <ThumbsUp
                  className={`w-4 h-4 ${
                    likedPosts.has(question.id) ? "text-blue-500" : ""
                  }`}
                />
              </Button>
              <span>{question.likes}</span>
            </div>
          </div>
        ))}
      </div>
      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddQuestion}
      />
    </Layout>
  );
};

export default Qna;
