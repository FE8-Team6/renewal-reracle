import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

interface BackHeaderProps {
  comment?: string[];
}

const BackHeader = ({ comment }: BackHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full  max-w-[500px] z-50  flex items-center gap-2 p-3 bg-purpleLight">
      <button onClick={() => navigate(-1)}>
        <IoChevronBack className="w-5 h-5" />
      </button>
      {comment && <h2>댓글 {comment.length}개</h2>}
    </header>
  );
};

export default BackHeader;
