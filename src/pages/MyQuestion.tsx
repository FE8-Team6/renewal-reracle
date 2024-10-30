import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";

export const MyQuestion = () => {
  const [questions, setQuestions] = useState<
    { id: string; question: string; author: string; authorUid: string }[]
  >([]);
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchQuestions = async () => {
        const q = query(
          collection(db, "questions"),
          where("authorUid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const questionList: {
          id: string;
          question: string;
          author: string;
          authorUid: string;
        }[] = [];
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
    }
  }, [currentUser]);

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Layout>
      <div className="w-full h-[3.75vh] bg-purple text-center flex items-center justify-center text-white text-[2vh]">
        마이 R지식in
      </div>
      <div className="overflow-y-auto my-[1.5vh] mx-auto w-[22rem] relative">
        {questions.map((questionData, index) => (
          <div
            key={index}
            className="bg-greenLight  my-[1.5vh] mx-auto h-[3.75vh] flex items-center justify-between px-[1vh] rounded-[10px] text-white text-[2vh]"
          >
            <Link
              to={`/answer/${questionData.id}`}
              state={{ question: questionData.question }}
              className="text-black overflow-hidden whitespace-nowrap text-ellipsis inline-block w-[35vh] no-underline"
            >
              {questionData.question}
            </Link>
            <button
              onClick={() => handleDeleteQuestion(questionData.id)}
              className="bg-error-40 border-none rounded-[5px] h-[2.5vh] text-white cursor-pointer px-[1vh] text-[1.5vh]"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};
