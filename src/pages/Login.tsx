import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail, MdOutlinePassword } from "react-icons/md";
import LoginToSignUpTitle from "@/components/LoginToSignUpTitle";
import { Button } from "@/components/ui/button";
import GoogleButton from "@/components/GoogleButton";
import Nav from "@/components/Nav/Nav";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
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

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem(
          "userData",
          JSON.stringify({
            uid: user.uid,
            email: userData.email,
            nickname: userData.nickname,
          })
        );
        navigate("/");
      } else {
        setError("사용자 데이터를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("이메일 로그인 실패:", error);
    }
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
          <div className="relative flex">
            <input
              type="text"
              placeholder="email@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className=" w-[23rem] h-[6vh] border border-purple rounded-2xl mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdAlternateEmail className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple" />
          </div>
          <div className="relative flex">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-[23rem] h-[6vh] border border-purple rounded-2xl mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdOutlinePassword className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple" />
          </div>
          {/* {error && (
            <p className="absolute bottom-[7.5vh] animate-vibration text-gray-dark">
            {error}
            </p>
            )} */}
          <Button variant="default" type="submit" size="default">
            로그인
          </Button>
        </form>
        <GoogleButton />
        <Button variant="link" size="sm" onClick={() => navigate("/signup")}>
          <span>회원가입</span>
        </Button>
      </section>
      <Nav />
    </>
  );
};
