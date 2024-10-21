import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PurpleButton, WhiteButton } from "@/components/Buttons";
import loginPageImg from "../assets/images/loginPageImg.png";
import { MdAlternateEmail, MdOutlinePassword } from "react-icons/md";
import LoginToSignUpTitle from "@/components/LoginToSignUpTitle";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    } catch (error: any) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <Layout>
      <LoginToSignUpTitle title="로그인" />
      <section className="w-full h-[79vh] bg-white relative flex flex-col justify-center items-center gap-[2vh] overflow-hidden">
        <img src={loginPageImg} alt="" className="w-[14rem]" />
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
              className=" w-[23rem] h-[6vh] border border-purple rounded-xl mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdAlternateEmail className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple" />
          </div>
          <div className="relative flex">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-[23rem] h-[6vh] border border-purple rounded-xl mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdOutlinePassword className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple" />
          </div>
          {error && (
            <p className="absolute bottom-[7.5vh] animate-vibration text-gray-dark">
              {error}
            </p>
          )}
          <PurpleButton type="submit">로그인</PurpleButton>
        </form>
        <div className="w-[46vh] flex justify-between items-center">
          <WhiteButton onClick={() => navigate("/pwreset")} className="mr-1">
            비밀번호 재설정
          </WhiteButton>
          <WhiteButton onClick={() => navigate("/signup")}>
            회원가입
          </WhiteButton>
        </div>
      </section>
    </Layout>
  );
};
