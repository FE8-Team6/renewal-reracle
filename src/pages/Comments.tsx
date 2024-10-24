import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
          (answer: { id: string; author: string; content: string }) => (
            <div key={answer.id}>
              <p>{answer.author}</p>
              <p>{answer.content}</p>
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
