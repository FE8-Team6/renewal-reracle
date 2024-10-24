import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

type SubmittedAnswer = {
  id: string;
  author: string;
  authorUid: string;
  content: string;
}[];

export const Answer = () => {
  const location = useLocation();
  const questionId = location.state?.questionId || "";
  const question = location.state?.question || "";
  const content = location.state?.content || "";
  const author = location.state?.author || "";

  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswer>(
    location.state?.submittedAnswers || []
  );
  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    displayName: string;
  }>({
    uid: "",
    displayName: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchAnswers = async () => {
      const answersCollection = collection(db, "answers");
      const answerQuery = query(
        answersCollection,
        where("questionId", "==", questionId)
      );
      const querySnapshot = await getDocs(answerQuery);
      const answersData = querySnapshot.docs.map(
        (doc) =>
          ({ id: doc.id, ...doc.data() } as {
            id: string;
            author: string;
            authorUid: string;
            content: string;
          })
      );
      setSubmittedAnswers(answersData);
    };

    fetchAnswers();
  }, [questionId]);
  // const handleSubmit = async () => {
  //   if (!currentUser.uid) {
  //     alert("로그인이 필요합니다");
  //     return;
  //   }

  //   if (answer.trim() === "") {
  //     alert("글을 작성해주세요");
  //     return;
  //   }
  //   try {
  //     const docRef = await addDoc(collection(db, "answers"), {
  //       question: question,
  //       author: currentUser.displayName,
  //       authorUid: currentUser.uid,
  //       content: answer,
  //     });
  //     setSubmittedAnswers([
  //       ...submittedAnswers,
  //       {
  //         id: docRef.id,
  //         author: currentUser.displayName,
  //         authorUid: currentUser.uid,
  //         content: answer,
  //       },
  //     ]);
  //     setAnswer("");
  //   } catch (error) {
  //     console.error("POST 에러 발생: ", error);
  //   }
  // };

  const handleDeleteAnswer = async (id: string) => {
    try {
      await deleteDoc(doc(db, "answers", id));
      setSubmittedAnswers(
        submittedAnswers.filter((answer) => answer.id !== id)
      );
    } catch (error) {
      console.error("DELETE 에러 발생: ", error);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <p className="text-xl text-center">{question}</p>
        <p className="font-bold text-center">{author}</p>
        <p className="mt-4 text-center">{content}</p>
      </div>
      {/* <div className="mt-4 overflow-hidden text-center">
        <textarea
          className="w-[23rem] h-28 border border-gray-300 rounded-4"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <Button variant="default" size="default" onClick={handleSubmit}>
          제출
        </Button>
      </div> */}
      <p>댓글 {submittedAnswers.length}</p>
      <div className="h-[40vh] mt-4 overflow-y-auto">
        {submittedAnswers.map(({ id, author, authorUid, content }) => (
          <div
            key={id}
            className="relative flex flex-col items-center w-[23rem] mx-auto p-2 text-lg bg-green-400 border rounded-lg"
          >
            <p>{author}</p>
            <p className="text-black break-words whitespace-pre-wrap">
              {content}
            </p>
            {currentUser && currentUser.uid === authorUid && (
              <Button
                variant="default"
                size="default"
                className="w-[4rem] h-[1rem] px-4 mt-2 text-sm "
                onClick={() => handleDeleteAnswer(id)}
              >
                삭제
              </Button>
            )}
          </div>
        ))}
      </div>
      <NavLink
        to={`/comments/${questionId}`}
        state={{ questionId, question, submittedAnswers }}
      >
        댓글을 남겨보세요.
      </NavLink>
    </Layout>
  );
};
