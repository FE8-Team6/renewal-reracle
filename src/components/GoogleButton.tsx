import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

type userDate = {
  uid: string;
  email: string;
  displayName: string;
};

const GoogleButton = () => {
  const [userData, setUserData] = useState<userDate>({
    uid: "",
    email: "",
    displayName: "",
  });
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const data = await signInWithPopup(auth, provider);
      setUserData({
        uid: data.user.uid,
        email: data.user.email || "",
        displayName: data.user.displayName || "",
      });
      console.log(data);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          uid: data.user.uid,
          email: data.user.email,
          displayName: data.user.displayName,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("구글 로그인 실패:", error);
    }
  };

  return (
    <Button variant="secondary" size="default" onClick={handleGoogleLogin}>
      <img
        src="/icon/google.svg"
        alt="Google Icon"
        className="mr-2 w-[1.2rem] h-[1.2rem]"
      />
      구글 계정으로 로그인
    </Button>
  );
};

export default GoogleButton;
