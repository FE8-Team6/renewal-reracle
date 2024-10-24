import { useState } from "react";

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

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-[23rem] h-auto p-4 bg-white rounded ">
        <h2 className="mb-4 text-2xl">질문</h2>
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
