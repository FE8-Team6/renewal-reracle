import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";

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

  return (
    <Layout>
      <div className="p-4">
        <p className="text-xl text-center">{question}</p>
        <p className="font-bold text-center">{author}</p>
        <p className="mt-4 text-center">{content}</p>
      </div>

      <p>댓글 {submittedAnswers.length}</p>
      <div className="h-[40vh] mt-4 overflow-y-auto">
        {submittedAnswers.map(({ id, author, content }) => (
          <div
            key={id}
            className="relative flex flex-col items-center w-[23rem] mx-auto p-2 text-lg bg-green-400 border rounded-lg"
          >
            <p>{author}</p>
            <p className="text-black break-words whitespace-pre-wrap">
              {content}
            </p>
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
