import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateToKoreanTime } from "@/lib/utils/dateKoreanTime";

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

export const MyQuestion = () => {
  const [questions, setQuestions] = useState<Question>([]);
  const [currentUser, setCurrentUser] = useState<{
    displayName: string;
    uid: string;
  }>({
    displayName: "",
    uid: "",
  });
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser.uid) {
      const fetchQuestions = async () => {
        const q = query(
          collection(db, "questions"),
          where("authorUid", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

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
            likes: questionData.likes || 0,
            commentCount: questionData.commentCount,
          });
        });
        setQuestions(questionList);
      };
      const fetchLikedPosts = async () => {
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
      };
      fetchLikedPosts();
      fetchQuestions();
    }
  }, [currentUser]);

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error("삭제 실패 오류: ", error);
    }
  };

  return (
    <>
      <div className="w-full h-[2rem] bg-purple text-center flex items-center justify-center text-white text-[2vh]">
        마이 R지식in
      </div>
      <div className="overflow-y-auto my-[1.5vh] mx-auto w-[22rem] h-[67vh] relative">
        {questions.map((questionData) => (
          <div
            key={questionData.id}
            className="bg-greenLight my-[1.5vh] mx-auto h-[6rem] flex items-center justify-between px-[1vh] rounded-[10px] text-white text-[2vh]"
          >
            <Link
              to={`/answer/${questionData.id}`}
              state={{
                questionId: questionData.id,
                question: questionData.question,
                content: questionData.content,
                author: questionData.author,
                createdAt: questionData.createdAt
                  ? questionData.createdAt.toDate().toISOString()
                  : null,
                likes: questionData.likes,
                commentCount: questionData.commentCount,
                currentUser,
                authorUid: questionData.authorUid,
                likedPosts: Array.from(likedPosts),
              }}
              className="text-black overflow-hidden whitespace-nowrap text-ellipsis inline-block w-[35vh] no-underline"
            >
              <p>{questionData.question}</p>
              <span className="text-sm text-gray-500">
                {questionData.author}
              </span>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  {questionData.createdAt && (
                    <p className="text-sm">
                      {formatDateToKoreanTime(questionData.createdAt.toDate())}
                    </p>
                  )}
                  {/* <p className="text-sm">댓글 {questionData.commentCount}개</p> */}
                </div>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-black hover:text-purple"
              onClick={() => handleDeleteQuestion(questionData.id)}
            >
              <X width={15} height={15} />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
