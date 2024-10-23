import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

const QuestionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="p-4 bg-white rounded ">
        <h2 className="mb-4 text-xl">질문 추가</h2>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목"
          className="w-full p-2 mb-2 border"
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용"
          className="w-full p-2 mb-2 border"
        />
        <button
          onClick={handleSubmit}
          className="p-2 mr-2 text-white bg-blue-500 rounded"
        >
          추가
        </button>
        <button
          onClick={onClose}
          className="p-2 text-white bg-gray-500 rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

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
