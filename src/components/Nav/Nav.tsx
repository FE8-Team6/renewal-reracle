import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { LuClipboardEdit } from 'react-icons/lu';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import NotificationBanner from '../NotificationBanner';

const Nav = () => {
  const navigation = useNavigate();

  const handleNavClick = (path: string) => {
    navigation(path);
  };

  return (
    <div className="w-full h-[12vh] fixed bottom-0">
      <NotificationBanner />
      <div className="w-full h-[8vh] absolute bottom-0 bg-green flex justify-evenly items-center">
        <button
          onClick={() => handleNavClick('/')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-500">
          <IoHomeOutline className="w-6 h-6" />
          {/* <div className="mt-1 text-sm font-medium text-center text-grayDark">홈</div> */}
        </button>
        <button
          onClick={() => handleNavClick('/qna')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-500">
          <HiOutlineQuestionMarkCircle className="w-6 h-6" />
          {/* <div className="mt-1 text-sm font-medium text-center text-grayDark">R지식in</div> */}
        </button>
        <button
          onClick={() => handleNavClick('/announcement')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-500">
          <LuClipboardEdit className="w-6 h-6" />
          {/* <div className="mt-1 text-sm font-medium text-center text-grayDark">공지</div> */}
        </button>
      </div>
    </div>
  );
};

export default Nav;
