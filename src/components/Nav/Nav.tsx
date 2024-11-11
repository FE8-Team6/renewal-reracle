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
    <div className="fixed bottom-0 w-full">
      {/* <div className="absolute bottom-[10vh] w-full">
        <NotificationBanner />
      </div> */}
      <div className="w-full h-[4rem] absolute bottom-0 bg-green flex justify-evenly items-center">
        <button
          onClick={() => handleNavClick('/')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-500">
          <IoHomeOutline className="w-7 h-7" />
          {/* <div className="mt-1 text-sm font-medium text-center text-grayDark">홈</div> */}
        </button>
        <button
          onClick={() => handleNavClick('/qna')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-500">
          <HiOutlineQuestionMarkCircle className="w-7 h-7" />
          {/* <div className="mt-1 text-sm font-medium text-center text-grayDark">R지식in</div> */}
        </button>
        <button
          onClick={() => handleNavClick('/announcement')}
          className="flex flex-col items-center transition-colors duration-300 hover:text-gray-500">
          <LuClipboardEdit className="w-7 h-7" />
          {/* <div className="mt-1 text-sm font-medium text-center text-grayDark">공지</div> */}
        </button>
      </div>
    </div>
  );
};

export default Nav;
