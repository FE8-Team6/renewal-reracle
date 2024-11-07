import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import NotificationBanner from "../NotificationBanner";

const Nav = () => {
  const navigation = useNavigate();

  const handleNavClick = (path: string) => {
    navigation(path);
  };

  return (
    <div className="w-full h-[14vh] fixed bottom-0">
      <NotificationBanner />
      <div className="w-full h-[10.2vh] absolute bottom-0 bg-green flex justify-evenly items-center">
        <div className="relative flex items-center w-auto h-auto">
          <button
            onClick={() => handleNavClick("/")}
            className="border-none w-[8vh] bg-transparent flex flex-col items-center"
          >
            <IoHomeOutline className="w-5 h-5" />
            <div className="mt-1 text-sm font-medium text-center text-grayDark">
              홈
            </div>
          </button>
        </div>
        <div className="relative flex items-center w-auto h-auto">
          <button
            onClick={() => handleNavClick("/qna")}
            className="border-none w-[8vh] bg-transparent flex flex-col items-center"
          >
            <HiOutlineQuestionMarkCircle className="w-5 h-5" />
            <div className="mt-1 text-sm font-medium text-center text-grayDark">
              R지식in
            </div>
          </button>
        </div>
        <div className="relative flex items-center w-auto h-auto">
          <button
            onClick={() => handleNavClick("/announcement")}
            className="border-none w-[8vh] bg-transparent flex flex-col items-center"
          >
            <LuClipboardEdit className="w-5 h-5" />
            <div className="mt-1 text-sm font-medium text-center text-grayDark">
              공지
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
