import { useNavigate } from "react-router-dom";

const BackHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-200">
      <button className="text-blue-500" onClick={() => navigate(-1)}>
        뒤로 가기
      </button>
      <div></div> {/* 빈 div로 공간을 맞추기 위해 사용 */}
    </header>
  );
};

export default BackHeader;
