import { useNavigate } from "react-router-dom";
import { AiOutlineNotification } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

const Nav = () => {
  const navigation = useNavigate();

  const handleNavClick = (path: string) => {
    navigation(path);
  };

  return (
    <div className="w-full h-[14vh] fixed bottom-0">
      <div className="w-full h-[3.75vh] absolute border-t border-b border-purple bg-purpleLight text-[1.5vh] font-bold text-purple flex justify-center items-center gap-2">
        <AiOutlineNotification className="w-4 h-4" />
        찾고자 하는 재활용품이 없을 때 R지식in에 질문 남겨주세요.
      </div>
      <div className="w-full h-[10.2vh] absolute bottom-0 bg-green rounded-b-lg flex justify-evenly items-center">
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
              게시판
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
