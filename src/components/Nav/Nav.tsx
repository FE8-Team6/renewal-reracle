import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { LuClipboardEdit } from 'react-icons/lu';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
// import NotificationBanner from '../NotificationBanner';

const Nav = () => {
  const navigation = useNavigate();

  const handleNavClick = (path: string) => {
    navigation(path);
  };

  return (
    <nav className="fixed bottom-0 w-full">
      {/* <div className="absolute bottom-[10vh] w-full">
        <NotificationBanner />
      </div> */}
      <div className="w-full h-[5rem] absolute bottom-0 bg-green flex justify-evenly items-center">
        <button
          onClick={() => handleNavClick('/')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-400 focus:text-gray-500">
          <IoHomeOutline className="w-6 h-6" />
          <span className="mt-1 text-sm font-medium text-center text-grayDark">홈</span>
        </button>
        <button
          onClick={() => handleNavClick('/qna')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-400 focus:text-gray-500">
          <HiOutlineQuestionMarkCircle className="w-6 h-6" />
          <span className="mt-1 text-sm font-medium text-center text-grayDark">R지식in</span>
        </button>
        <button
          onClick={() => handleNavClick('/announcement')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-400 focus:text-gray-500">
          <LuClipboardEdit className="w-6 h-6" />
          <span className="mt-1 text-sm font-medium text-center text-grayDark">공지</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
