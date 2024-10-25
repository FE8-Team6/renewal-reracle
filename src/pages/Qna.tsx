import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";
import QuestionModal from "@/components/modal/QuestionModal";
import { serverTimestamp } from "firebase/firestore";

type Question = {
  id: string;
  question: string;
  author: string;
  authorUid: string;
  content: string;
  createdAt: Timestamp;
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
    const fetchQuestions = async () => {
      const queryOrderBy = query(
        collection(db, "questions"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(queryOrderBy);
      const questionList: Question = [];
      querySnapshot.forEach((doc) => {
        const questionData = doc.data();
        questionList.push({
          id: doc.id,
          question: questionData.question,
          author: questionData.author,
          authorUid: questionData.authorUid,
          content: questionData.content,
          createdAt: questionData.createdAt,
        });
      });
      setQuestions(questionList);
    };
    fetchQuestions();
  }, []);

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
      });

      const updatedQuestions = await getDocs(
        query(collection(db, "questions"), orderBy("createdAt", "desc"))
      );
      const questionList: Question = [];
      updatedQuestions.forEach((doc) => {
        const questionData = doc.data();
        questionList.push({
          id: doc.id,
          question: questionData.question,
          content: questionData.content,
          author: questionData.author,
          authorUid: questionData.authorUid,
          createdAt: questionData.createdAt,
        });
      });
      setQuestions(questionList);
      setIsModalOpen(false);
    } catch (error) {
      console.error("질문 추가 실패:", error);
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

  const formatDateToKoreanTime = (date: Date) => {
    return date.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              }}
            >
              <span>{question.question}</span>
              <span>{question.author} 님</span>
              {question.createdAt && (
                <p>{formatDateToKoreanTime(question.createdAt.toDate())}</p>
              )}
            </NavLink>
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
