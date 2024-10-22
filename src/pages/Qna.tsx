import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";

type Question = { question: string; author: string; authorUid: string }[];
type QuestionList = {
  question: string;
  author: string;
  authorUid: string;
}[];

export const Qna = () => {
  const [questions, setQuestions] = useState<Question>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    uid: "",
  });

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questionList: QuestionList = [];
      querySnapshot.forEach((doc) => {
        const questionData = doc.data();
        questionList.push({
          question: questionData.question,
          author: questionData.author,
          authorUid: questionData.authorUid,
        });
      });
      setQuestions(questionList);
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      alert("질문을 추가하려면 로그인해야 합니다.");
      return;
    }
    if (currentQuestion.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, "questions"), {
        question: currentQuestion,
        author: currentUser.displayName,
        authorUid: currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);

      setQuestions([
        ...questions,
        {
          question: currentQuestion,
          author: currentUser.displayName,
          authorUid: currentUser.uid,
        },
      ]);
      setCurrentQuestion("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteQuestion = async (index: number) => {
    if (!currentUser) {
      alert("질문을 삭제하려면 로그인해야 합니다.");
      return;
    }
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const deletedQuestion = questions[index];
        if (deletedQuestion.authorUid === currentUser.uid) {
          const updatedQuestions = [...questions];
          updatedQuestions.splice(index, 1);
          setQuestions(updatedQuestions);

          const querySnapshot = await getDocs(collection(db, "questions"));
          querySnapshot.forEach((doc) => {
            if (
              doc.data().question === deletedQuestion.question &&
              doc.data().author === deletedQuestion.author
            ) {
              deleteDoc(doc.ref);
            }
          });
        } else {
          alert("자신의 질문만 삭제할 수 있습니다.");
        }
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <Layout>
      <div className="w-full h-[2rem] bg-purple text-center flex items-center justify-center text-white text-[2vh]">
        R 지식in
      </div>

      <button className="block mx-auto my-[1vh] border-none bg-greenLight text-white text-[2vh]">
        질문하기
      </button>
      <div className="text-center">
        <input
          type="text"
          value={currentQuestion}
          onChange={(event) => setCurrentQuestion(event.target.value)}
          placeholder="질문을 입력하세요"
          className="bg-white border-none rounded-4 h-[2.5vh] w-[35vh] p-[0.5vh] text-[1.5vh]"
        />
        <button
          onClick={handleAddQuestion}
          className="bg-purple border-none rounded-4 h-[2.5vh] text-white cursor-pointer px-[1vh] text-[1.5vh]"
        >
          추가
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden mx-auto my-[1.5vh] w-[52vh] relative">
        {questions.map((questionData, index) => (
          <div
            key={index}
            className="bg-greenLight w-[50vh] mx-auto my-[1.5vh] h-[3.75vh] flex items-center justify-between px-[1vh] rounded-4 text-white text-[2vh]"
          >
            <Link
              to={`/answer/${encodeURIComponent(questionData.question)}`}
              state={{ question: questionData.question }}
              className="text-white overflow-hidden whitespace-nowrap text-ellipsis inline-block w-[35vh]"
            >
              {questionData.question}
            </Link>
            {currentUser && questionData.authorUid === currentUser.uid && (
              <button
                onClick={() => handleDeleteQuestion(index)}
                className="bg-red border-none rounded-4 h-[2.5vh] text-white cursor-pointer px-[1vh] text-[1.5vh]"
              >
                삭제
              </button>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Qna;
