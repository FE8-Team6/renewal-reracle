import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { formatDateToKoreanTime } from "@/lib/utils/dateKoreanTime";
import Nav from "@/components/Nav/Nav";
import BackHeader from "@/lib/common/BackHeader";

type SubmittedAnswer = {
  id: string;
  author: string;
  authorUid: string;
  content: string;
  createdAt: string;
  likes: number;
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
  const currentUser = location.state?.currentUser || {
    displayName: "",
    uid: "",
  };
  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswer>(
    location.state?.submittedAnswers || []
  );
  const [likes, setLikes] = useState<number>(location.state?.likes || 0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(
    new Set(location.state?.likedPosts || [])
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
            likes: number;
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
        setLikes((prev) => prev - 1);
      } else {
        await setDoc(likeDocRef, {
          userId: currentUser.uid,
          postId: id,
        });
        await updateDoc(doc(db, "questions", id), { likes: increment(1) });
        setLikedPosts((prev) => new Set(prev).add(id));
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.error("LIKE 에러 발생: ", error);
    }
  };

  return (
    <>
      <BackHeader />
      <div className="p-4">
        <p className="text-xl text-center">{question}</p>
        <p className="font-bold text-center">{author}</p>
        {createdAt && (
          <p className="text-center">{formatDateToKoreanTime(createdAt)}</p>
        )}
        <p className="mt-4 text-center">{content}</p>
        <div className="flex gap-3">
          <p>댓글 {submittedAnswers.length}</p>
          <div className="flex items-center">
            <button className="pr-1" onClick={() => handleLike(questionId)}>
              <ThumbsUp
                className={`w-5 h-5 ${
                  likedPosts.has(questionId) ? "text-blue-500" : ""
                }`}
              />
            </button>
            <span>{likes}</span>
          </div>
        </div>
      </div>

      <div className="h-[50vh] mt-4 space-y-2">
        {submittedAnswers.map(({ id, author, content, createdAt }) => (
          <div
            key={id}
            className="relative flex flex-col w-[23rem] mx-auto p-2 text-lg bg-purpleLight "
          >
            <p className="text-lg text-black">{content}</p>
            <p className="text-sm">{author}</p>
            {createdAt && (
              <p className="text-xs text-gray-500">
                {formatDateToKoreanTime(new Date(createdAt))}
              </p>
            )}
          </div>
        ))}
      </div>
      <NavLink
        to={`/comments/${questionId}`}
        state={{ questionId, question, submittedAnswers }}
      >
        <Button variant="link" size="sm">
          댓글을 남겨보세요.
        </Button>
      </NavLink>
      <Nav />
    </>
  );
};
