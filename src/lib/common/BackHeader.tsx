import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

type BackHeaderProps = {
  comment?: string[];
};

const BackHeader = ({ comment }: BackHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header
      className="fixed top-0 w-full max-w-[500px] z-50 p-3 h-[3rem] bg-purpleLight flex items-center"
      role="banner"
    >
      <button onClick={() => navigate(-1)} aria-label="뒤로 가기" className="flex items-center justify-center">
        <IoChevronBack className="w-5 h-5" />
      </button>
      {comment && (
        <h2 aria-live="polite" tabIndex={0}>
          댓글 {comment.length}개
        </h2>
      )}
    </header>
  );
};

export default BackHeader;
