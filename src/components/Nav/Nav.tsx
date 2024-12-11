import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { LuClipboardList } from 'react-icons/lu';
import { MdOutlineArticle } from 'react-icons/md';
import { PiArticleNyTimesLight } from 'react-icons/pi';

export const Nav = () => {
  const navigation = useNavigate();

  const handleNavClick = (path: string) => {
    navigation(path);
  };

  return (
    <nav className="w-full max-w-[500px] fixed bottom-0 left-1/2 flex justify-around bg-white -translate-x-1/2  px-1 py-2">
      <div className="w-full h-[5rem] absolute bottom-0 bg-green flex justify-evenly items-center">
        <button
          onClick={() => handleNavClick('/')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-400 focus:text-gray-500"
        >
          <IoHomeOutline className="w-6 h-6" />
          <span className="mt-1 text-sm font-medium text-center text-grayDark">홈</span>
        </button>
        <button
          onClick={() => handleNavClick('/qna')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-400 focus:text-gray-500"
        >
          <PiArticleNyTimesLight className="w-6 h-6" />
          <span className="mt-1 text-sm font-medium text-center text-grayDark">R지식in</span>
        </button>
        <button
          onClick={() => handleNavClick('/article')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-400 focus:text-gray-500"
        >
          <MdOutlineArticle className="w-6 h-6" />
          <span className="mt-1 text-sm font-medium text-center text-grayDark">아티클</span>
        </button>
        <button
          onClick={() => handleNavClick('/announcement')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-400 focus:text-gray-500"
        >
          <LuClipboardList className="w-6 h-6" />
          <span className="mt-1 text-sm font-medium text-center text-grayDark">공지</span>
        </button>
      </div>
    </nav>
  );
};
