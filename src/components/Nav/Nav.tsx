import { useNavigate } from "react-router-dom";
import NavBtn from "@/components/Nav/NavBtn";
import { AiOutlineNotification } from "react-icons/ai";

const Nav = () => {
  const navigation = useNavigate();

  const handleNavClick = (path: string) => {
    navigation(path);
  };

  return (
    <div className="w-full h-[14vh] fixed bottom-0">
      <div className="w-full h-[3.75vh] absolute border-t border-b border-purple bg-purpleLight text-[1.5vh] font-bold text-purple flex justify-center items-center gap-2">
        <AiOutlineNotification className="w-4 h-4" />
        2024-05-03 09:00 ~ 10:00 (1시간) 점검 예정입니다.
      </div>
      <div className="w-full h-[10.2vh] absolute bottom-0 bg-green rounded-b-lg flex justify-evenly items-center">
        <NavBtn
          image="/home_FILL0_wght400_GRAD0_opsz24.svg"
          text="홈"
          onClick={() => handleNavClick("/")}
        />
        <NavBtn
          image="/question_exchange_FILL0_wght400_GRAD0_opsz24.svg"
          text="R지식in"
          onClick={() => handleNavClick("/qna")}
        />

        <NavBtn
          image="/breaking_news_FILL0_wght400_GRAD0_opsz24.svg"
          text="게시판"
          onClick={() => handleNavClick("/topic")}
        />
      </div>
    </div>
  );
};

export default Nav;
