import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";

const Header = () => {
  const navigation = useNavigate();
  const handleNavClick = (path: string) => {
    navigation(path);
  };
  const handleUserIconClick = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      handleNavClick("/mypage");
    } else {
      handleNavClick("/login");
    }
  };
  return (
    <div className="w-full h-[3rem] bg-purpleLight rounded-t-lg flex items-center">
      <img
        src="/public/icon/REracle_logo.svg"
        alt="reracle 아이콘"
        onClick={() => handleNavClick("/")}
        className="w-[5rem] absolute ml-4 cursor-pointer"
      />
      <RxPerson
        onClick={handleUserIconClick}
        className="w-5 h-5 absolute right-0 mr-4 cursor-pointer"
      />
    </div>
  );
};

export default Header;
