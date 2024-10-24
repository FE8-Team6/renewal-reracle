import { useLocation, useNavigate } from "react-router-dom";

const Comments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const submittedAnswers = location.state?.submittedAnswers || [];

  return (
    <div>
      <header className="p-4 bg-gray-200">
        <button className="text-blue-500" onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
      </header>
      <h2>댓글</h2>
      <div>
        {submittedAnswers.map((answer) => (
          <div key={answer.id}>
            <p>{answer.author}</p>
            <p>{answer.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
