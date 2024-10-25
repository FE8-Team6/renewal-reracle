import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

type SubmittedAnswer = {
  id: string;
  author: string;
  authorUid: string;
  content: string;
  createdAt: string;
}[];

export const Answer = () => {
  const location = useLocation();
  const questionId = location.state?.questionId || "";
  const question = location.state?.question || "";
  const content = location.state?.content || "";
  const author = location.state?.author || "";
  const createdAt = location.state?.createdAt
    ? new Date(location.state.createdAt)
    : null;

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
          ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toISOString(),
          } as {
            id: string;
            author: string;
            authorUid: string;
            content: string;
            createdAt: string;
          })
      );
      answersData.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setSubmittedAnswers(answersData);
    };

    fetchAnswers();
  }, [questionId]);

  const formatDateToKoreanTime = (date: Date) => {
    if (!date) return "알 수 없는 시간";
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
      <div className="p-4">
        <p className="text-xl text-center">{question}</p>
        <p className="font-bold text-center">{author}</p>
        {createdAt && (
          <p className="text-center">{formatDateToKoreanTime(createdAt)}</p>
        )}
        <p className="mt-4 text-center">{content}</p>
        <p>댓글 {submittedAnswers.length}</p>
      </div>

      <div className="h-[50vh] mt-4 overflow-y-auto">
        {submittedAnswers.map(({ id, author, content, createdAt }) => (
          <div
            key={id}
            className="relative flex flex-col items-center w-[23rem] mx-auto p-2 text-lg bg-green-400 border rounded-lg"
          >
            <p>{author}</p>
            <p className="text-black break-words whitespace-pre-wrap">
              {content}
            </p>
            {createdAt && (
              <p className="text-xs text-gray-500">
                {formatDateToKoreanTime(new Date(createdAt))}
              </p>
            )}
          </div>
        ))}
        <NavLink
          to={`/comments/${questionId}`}
          state={{ questionId, question, submittedAnswers }}
        >
          <Button variant="link" size="sm">
            댓글을 남겨보세요.
          </Button>
        </NavLink>
      </div>
    </Layout>
  );
};
