import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const BackHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-purpleLight">
      <button onClick={() => navigate(-1)}>
        <IoChevronBack className="w-5 h-5" />
      </button>
    </header>
  );
};

export default BackHeader;
