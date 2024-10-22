import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  MdAlternateEmail,
  MdOutlinePassword,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import LoginToSignUpTitle from "@/components/LoginToSignUpTitle";
import { Button } from "@/components/ui/button";
import GoogleButton from "@/components/GoogleButton";
import { Input } from "@/components/ui/input";
import { getUserProfile } from "@/api/userApi/user";
import { auth } from "@/firebase";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = await getUserProfile(user.uid);
      localStorage.setItem("userData", JSON.stringify(userData));

      navigate("/");
    } catch (error) {
      console.error("이메일 로그인 실패:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <LoginToSignUpTitle title="로그인" />
      <section className="w-full h-[79vh] bg-white relative flex flex-col justify-center items-center gap-3 overflow-hidden">
        <img
          src="/images/loginPageImg.png"
          alt="로그인 페이지 이미지"
          className="w-[14rem] h-[14rem] mb-4"
        />
        <form
          onSubmit={handleLogin}
          className="relative flex flex-col items-center justify-center "
        >
          <div className="relative flex flex-col mb-2">
            <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
            <Input
              type="text"
              placeholder="email@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="relative flex flex-col mb-2">
            <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
            <Input
              placeholder="Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute text-xl right-3 top-4 text-purple"
            >
              {isShowPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
          {error && <p className="mt-1 text-sm text-red">{error}</p>}
          <Button variant="default" type="submit" size="default">
            로그인
          </Button>
        </form>
        <GoogleButton />
        <Button variant="link" size="sm" onClick={() => navigate("/signup")}>
          <span>회원가입</span>
        </Button>
      </section>
    </>
  );
};
