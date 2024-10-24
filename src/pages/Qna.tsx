import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import QuestionModal from "@/components/modal/QuestionModal";

type Question = {
  id: string;
  question: string;
  author: string;
  authorUid: string;
}[];
type QuestionList = {
  id: string;
  question: string;
  author: string;
  authorUid: string;
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

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setCurrentUser({
          displayName: "",
          uid: "",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questionList: QuestionList = [];
      querySnapshot.forEach((doc) => {
        const questionData = doc.data();
        questionList.push({
          id: doc.id,
          question: questionData.question,
          author: questionData.author,
          authorUid: questionData.authorUid,
        });
      });
      setQuestions(questionList);
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = async (title: string, content: string) => {
    if (title.trim() === "" || content.trim() === "") return;
    try {
      await addDoc(collection(db, "questions"), {
        question: title,
        author: currentUser.displayName,
        authorUid: currentUser.uid,
      });

      const updatedQuestions = await getDocs(collection(db, "questions"));
      const questionList: Question = [];
      updatedQuestions.forEach((doc) => {
        const questionData = doc.data();
        questionList.push({
          id: doc.id,
          question: questionData.question,
          author: questionData.author,
          authorUid: questionData.authorUid,
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

  return (
    <Layout>
      <div className="w-full h-[2rem] bg-purple text-center flex items-center justify-center text-white text-[2vh]">
        R지식in
      </div>
      <button
        className=" p-1 mx-auto text-black border"
        onClick={handleOpenModal}
      >
        질문
      </button>
      <div className="w-[23rem] h-full relative overflow-y-auto overflow-x-hidden mx-auto my-[1.5vh] ">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-greenLight w-full h-[5rem] mx-auto my-3 flex items-center justify-between px-3 rounded-4 text-black "
          >
            <Link
              to={`/answer/${question.id}`}
              state={{ question: question.question }}
            >
              {question.question}
            </Link>
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
