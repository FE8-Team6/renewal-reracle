import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";

const Comments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionId = location.state?.questionId || "";
  const question = location.state?.question || "";
  const [submittedAnswers, setSubmittedAnswers] = useState(
    location.state?.submittedAnswers || []
  );
  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    displayName: string;
  }>({
    uid: "",
    displayName: "",
  });
  const [answer, setAnswer] = useState<string>("");
  const [editingAnswer, setEditingAnswer] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleSubmit = async () => {
    if (!currentUser.uid) {
      alert("로그인이 필요합니다");
      return;
    }

    if (answer.trim() === "") {
      alert("글을 작성해주세요");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "answers"), {
        questionId: questionId,
        question: question,
        author: currentUser.displayName,
        authorUid: currentUser.uid,
        content: answer,
      });
      setSubmittedAnswers([
        ...submittedAnswers,
        {
          id: docRef.id,
          author: currentUser.displayName,
          content: answer,
          authorUid: currentUser.uid,
        },
      ]);
      setAnswer("");
    } catch (error) {
      console.error("POST 에러 발생: ", error);
    }
  };

  const handleDeleteAnswer = async (id: string) => {
    try {
      await deleteDoc(doc(db, "answers", id));
      setSubmittedAnswers(
        submittedAnswers.filter((answer: { id: string }) => answer.id !== id)
      );
    } catch (error) {
      console.error("DELETE 에러 발생: ", error);
    }
  };

  const handleEditAnswer = async () => {
    if (!editingAnswer) return;

    try {
      const answerDoc = doc(db, "answers", editingAnswer);
      await updateDoc(answerDoc, { content: editedContent });
      setSubmittedAnswers(
        submittedAnswers.map((answer: { id: string }) =>
          answer.id === editingAnswer
            ? { ...answer, content: editedContent }
            : answer
        )
      );
      setEditingAnswer(null);
      setEditedContent("");
    } catch (error) {
      console.error("UPDATE 에러 발생: ", error);
    }
  };

  return (
    <div>
      <header className="p-4 bg-gray-200">
        <button className="text-blue-500" onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
      </header>
      <h2>댓글</h2>
      <div>
        {submittedAnswers.map(
          (answer: {
            id: string;
            author: string;
            content: string;
            authorUid: string;
          }) => (
            <div
              key={answer.id}
              className="relative flex flex-col items-center w-[23rem] mx-auto p-2 text-lg bg-green-400 border rounded-lg"
            >
              <p>{answer.author}</p>
              <p className="text-black break-words whitespace-pre-wrap">
                {answer.content}
              </p>
              {currentUser && currentUser.uid === answer.authorUid && (
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                      <Button
                        variant="default"
                        size="default"
                        className="w-full"
                        onClick={() => {
                          setEditingAnswer(answer.id);
                          setEditedContent(answer.content);
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="default"
                        size="default"
                        className="w-full"
                        onClick={() => handleDeleteAnswer(answer.id)}
                      >
                        삭제
                      </Button>
                    </PopoverContent>
                  </Popover>
                  <Dialog
                    open={editingAnswer === answer.id}
                    onOpenChange={() => setEditingAnswer(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>댓글 수정</DialogTitle>
                        <DialogDescription>
                          댓글 내용을 수정하세요.
                        </DialogDescription>
                      </DialogHeader>
                      <textarea
                        value={editedContent}
                        onChange={(event) =>
                          setEditedContent(event.target.value)
                        }
                        className="w-full h-28 border border-gray-300 rounded-4"
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant="default"
                            size="default"
                            onClick={handleEditAnswer}
                          >
                            확인
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )
        )}
      </div>
      <div className="mt-4 overflow-hidden text-center">
        <textarea
          className="w-[23rem] h-28 border border-gray-300 rounded-4"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <Button variant="default" size="default" onClick={handleSubmit}>
          제출
        </Button>
      </div>
    </div>
  );
};

export default Comments;
