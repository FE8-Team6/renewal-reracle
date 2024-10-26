import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { db } from "../firebase";
import { Layout } from "@/components/layout/Layout";
import { serverTimestamp } from "firebase/firestore";
import { formatDateToKoreanTime } from "@/lib/utils/dateKoreanTime";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

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
    const getQuestions = async () => {
      const queryOrderBy = query(
        collection(db, "questions"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(queryOrderBy);
      const questionList: Question = [];
      for (const doc of querySnapshot.docs) {
        const questionData = doc.data();
        const answersSnapshot = await getDocs(
          query(collection(db, "answers"), where("questionId", "==", doc.id))
        );
        questionList.push({
          id: doc.id,
          question: questionData.question,
          author: questionData.author,
          authorUid: questionData.authorUid,
          content: questionData.content,
          createdAt: questionData.createdAt,
          likes: questionData.likes || 0,
          commentCount: answersSnapshot.size,
        });
      }
      setQuestions(questionList);
    };

    const getLiked = async () => {
      if (currentUser.uid) {
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
      }
    };

    getQuestions();
    getLiked();
  }, [currentUser.uid]);

  const handleAddQuestion = async () => {
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
        likes: 0,
        commentCount: 0,
      });

      const updatedQuestions = await getDocs(
        query(collection(db, "questions"), orderBy("createdAt", "desc"))
      );
      const questionList: Question = [];
      for (const doc of updatedQuestions.docs) {
        const questionData = doc.data();
        const answersSnapshot = await getDocs(
          query(collection(db, "answers"), where("questionId", "==", doc.id))
        );
        questionList.push({
          id: doc.id,
          question: questionData.question,
          content: questionData.content,
          author: questionData.author,
          authorUid: questionData.authorUid,
          createdAt: questionData.createdAt,
          likes: questionData.likes || 0,
          commentCount: answersSnapshot.size,
        });
      }
      setQuestions(questionList);
      setIsModalOpen(false);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("질문 추가 실패:", error);
    }
  };

  /**
   * @description 만약 이미 좋아요를 누른 게시물이라면 좋아요를 취소하고, 아니라면 좋아요를 누릅니다.
   * @param id
   */
  const handleLiked = async (id: string) => {
    try {
      if (!currentUser.uid) {
        alert("로그인을 해주세요.");
        return;
      }
      const likeDocRef = doc(db, "likes", `${currentUser.uid}_${id}`);
      if (likedPosts.has(id)) {
        await deleteDoc(likeDocRef);
        await updateDoc(doc(db, "questions", id), { likes: increment(-1) });
        setLikedPosts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        setQuestions((prev) =>
          prev.map((question) =>
            question.id === id
              ? { ...question, likes: question.likes - 1 }
              : question
          )
        );
      } else {
        await setDoc(likeDocRef, {
          userId: currentUser.uid,
          postId: id,
        });
        await updateDoc(doc(db, "questions", id), { likes: increment(1) });
        setLikedPosts((prev) => new Set(prev).add(id));
        setQuestions((prev) =>
          prev.map((question) =>
            question.id === id
              ? { ...question, likes: question.likes + 1 }
              : question
          )
        );
      }
    } catch (error) {
      console.error("LIKE 에러 발생: ", error);
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

  const truncateTitle = (title: string) => {
    return title.length > 20 ? `${title.slice(0, 20)}...` : title;
  };

  return (
    <Layout>
      <div className="w-full h-[2rem] bg-purple text-center flex items-center justify-center text-white text-[2vh]">
        R지식in
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button
            className="p-1 mx-auto text-black border "
            onClick={handleOpenModal}
          >
            질문
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>질문</DialogTitle>
            <DialogDescription>질문을 추가하세요.</DialogDescription>
          </DialogHeader>
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
            className="w-full h-[30vh] p-2 mb-2 border"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default" size="lg" onClick={handleAddQuestion}>
                추가
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="default" size="lg">
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="w-[23rem] h-[60vh] relative overflow-y-auto overflow-x-hidden mx-auto my-[1.5vh] ">
        {questions.map((question) => (
          <div
            key={question.id}
            className=" bg-greenLight w-full h-[6rem] mx-auto my-3 flex items-center justify-between px-3 rounded-4 text-black "
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
                likes: question.likes,
                likedPosts: Array.from(likedPosts),
                commentCount: question.commentCount,
                currentUser,
                authorUid: question.authorUid,
              }}
              className="flex flex-col flex-grow"
            >
              <div className="flex flex-col">
                <span className="text-base font-semibold text-gray-900 truncate">
                  {truncateTitle(question.question)}
                </span>
                <span className="text-sm text-gray-500">{question.author}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex gap-2">
                  {question.createdAt && (
                    <p className="text-sm">
                      {formatDateToKoreanTime(question.createdAt.toDate())}
                    </p>
                  )}
                  <p className="text-sm">댓글 {question.commentCount}개</p>
                </div>
                <div className="flex items-center">
                  <Button
                    className="bg-transparent hover:bg-transparent"
                    variant="secondary"
                    size="icon"
                    onClick={(event) => {
                      event.preventDefault();
                      handleLiked(question.id);
                    }}
                  >
                    <ThumbsUp
                      className={`w-[1rem] h-[1rem] ${
                        likedPosts.has(question.id) ? "text-blue-500" : ""
                      }`}
                    />
                  </Button>
                  <span>{question.likes}</span>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Qna;
