import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';

export const GoogleButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const data = await signInWithPopup(auth, provider);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          uid: data.user.uid,
          email: data.user.email,
          displayName: data.user.displayName,
        }),
      );
      navigate('/');
    } catch (error) {
      console.error('구글 로그인 실패:', error);
    }
  };

  return (
    <Button variant="secondary" size="default" onClick={handleGoogleLogin} aria-label="구글로 로그인하기">
      <img src="/icon/google.svg" alt="구글 아이콘" className="mr-2 w-[1.2rem] h-[1.2rem]" />
      구글 계정으로 로그인
    </Button>
  );
};
