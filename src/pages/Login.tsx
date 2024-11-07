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
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

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
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
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
          <div className="w-full h-[5rem] relative mb-2">
            <label htmlFor="email" className="text-lg font-bold text-purple">
              이메일
            </label>
            <div className="relative flex flex-col">
              <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
              <Input
                id="email"
                type="text"
                placeholder="email@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-[5rem] relative mb-2">
            <label htmlFor="password" className="text-lg font-bold text-purple">
              비밀번호
            </label>
            <div className="relative flex flex-col ">
              <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
              <Input
                id="password"
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
          </div>
          {error && <p className="mb-2 text-error-50">{error}</p>}
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
