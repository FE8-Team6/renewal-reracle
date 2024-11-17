import { useNavigate } from 'react-router-dom';
import { RxPerson } from 'react-icons/rx';

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
    <header className="fixed top-0 w-full max-w-[500px] z-50 h-[3rem] bg-purpleLight flex items-center">
      <img
        src="/icon/REracle_logo.svg"
        alt="reracle 아이콘"
        onClick={() => handleNavClick('/')}
        className="w-[5rem] absolute ml-4 cursor-pointer"
      />
      <RxPerson onClick={handleUserIconClick} className="absolute right-0 w-5 h-5 mr-4 cursor-pointer" />
    </header>
  );
};

export default Header;
