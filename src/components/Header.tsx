import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigation = useNavigate();
  const handleNavClick = (path: string) => {
    navigation(path);
  };
  const handleUserIconClick = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      handleNavClick('/mypage');
    } else {
      handleNavClick('/login');
    }
  };
  return (
    <div className="w-full h-[3rem] bg-purpleLight rounded-t-lg flex items-center">
      <img
        src="/logosmall.svg"
        alt="reracle 아이콘"
        onClick={() => handleNavClick('/')}
        className="w-[5rem] absolute ml-4 cursor-pointer"
      />
      <img
        src="/person_20dp_FILL1_wght400_GRAD0_opsz20.svg"
        alt="유저 아이콘"
        onClick={handleUserIconClick}
        className="w-[2rem] absolute right-0 mr-4 cursor-pointer"
      />
    </div>
  );
};

export default Header;
