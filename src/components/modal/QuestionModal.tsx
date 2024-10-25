import { useEffect, useState } from "react";

const QuestionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    setCurrentDate(`${year}년 ${month}월 ${day}일`);
  });

  if (!isOpen) return;

  const handleSubmit = () => {
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-[23rem] h-auto p-4 bg-white rounded ">
        <p className="mb-4 text-lg text-center">{currentDate}</p>
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
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="p-2 mr-2 text-white bg-blue-500 rounded"
          >
            추가
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white bg-gray-500 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
