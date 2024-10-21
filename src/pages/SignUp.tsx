import React, { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import LoginToSignUpTitle from "@/components/LoginToSignUpTitle";
import { PurpleButton, WhiteButton } from "@/components/Buttons";
import {
  MdAlternateEmail,
  MdOutlinePassword,
  MdOutlineTagFaces,
} from "react-icons/md";

export const SignUp = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorKey, setErrorKey] = useState(0);
  const navigate = useNavigate();

  const saveUserInfoToFirestore = async (
    userId: string,
    email: string,
    nickname: string
  ) => {
    try {
      // "users" 컬렉션에 사용자 UID를 문서 ID로 사용하여 사용자 정보 저장
      await setDoc(doc(db, "users", userId), {
        email: email,
        nickname: nickname,
        uid: userId,
      });
      console.log("사용자 정보가 성공적으로 Firestore에 저장되었습니다.");
    } catch (error) {
      console.error("Firestore에 사용자 정보 저장 중 오류:", error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (nickname.length < 2) {
      setError("닉네임은 2자 이상이어야 합니다.");
      setErrorKey((prev) => prev + 1);
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      setErrorKey((prev) => prev + 1);
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setErrorKey((prev) => prev + 1);
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("이메일 형식이 올바르지 않습니다.");
      setErrorKey((prev) => prev + 1);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await saveUserInfoToFirestore(userCredential.user.uid, email, nickname);
      const userInfoDoc = await getDoc(
        doc(db, "users", userCredential.user.uid)
      );
      if (userInfoDoc.exists()) {
        const userInfo = userInfoDoc.data();
        localStorage.setItem("userData", JSON.stringify(userInfo));
        navigate("/login");
      } else {
        setError("사용자 정보를 불러오는 데 실패했습니다.");
        setErrorKey((prev) => prev + 1);
      }
    } catch (error: any) {
      setError(error.message);
      setErrorKey((prev) => prev + 1);
    }
  };

  return (
    <>
      <LoginToSignUpTitle title="회원가입" />
      <section className="w-[56.3vh] h-[79.7vh] bg-white relative flex flex-col justify-center items-center gap-[2vh] overflow-hidden">
        <form
          onSubmit={handleSignUp}
          className="w-[46vh] flex flex-col justify-center items-center relative"
        >
          <div className="relative flex">
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-[46vh] h-[6vh] border border-purple rounded-[1vh] mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdOutlineTagFaces className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple" />
          </div>
          <div className="relative flex">
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[46vh] h-[6vh] border border-purple rounded-[1vh] mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdAlternateEmail className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple" />
          </div>
          <div className="relative flex">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[46vh] h-[6vh] border border-purple rounded-[1vh] mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdOutlinePassword className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple" />
          </div>
          <div className="relative flex">
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[46vh] h-[6vh] border border-purple rounded-[1vh] mb-[1vh] pl-[5vh] box-border text-[2vh]"
            />
            <MdOutlinePassword className="absolute left-[1.5vh] top-[1.8vh] text-[2.5vh] text-purple" />
          </div>
          {error && (
            <p
              key={errorKey}
              className="absolute bottom-[7.5vh] animate-vibration text-gray-dark"
            >
              {error}
            </p>
          )}
          <PurpleButton type="submit">회원가입</PurpleButton>
        </form>
        <WhiteButton onClick={() => navigate("/login")}>취소</WhiteButton>
      </section>
    </>
  );
};
