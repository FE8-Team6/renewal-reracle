import React, { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import LoginToSignUpTitle from "@/components/LoginToSignUpTitle";
import {
  MdAlternateEmail,
  MdOutlinePassword,
  MdOutlineTagFaces,
} from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignUp = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorKey, setErrorKey] = useState<number>(0);
  const navigate = useNavigate();

  const saveUserInfoToFirestore = async (
    userId: string,
    email: string,
    displayName: string
  ) => {
    try {
      await setDoc(doc(db, "users", userId), {
        email: email,
        displayName: displayName,
        uid: userId,
      });
      console.log("사용자 정보가 성공적으로 Firestore에 저장되었습니다.");
    } catch (error) {
      console.error("Firestore에 사용자 정보 저장 중 오류:", error);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (displayName.length < 2) {
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
      await saveUserInfoToFirestore(
        userCredential.user.uid,
        email,
        displayName
      );
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
    } catch (error) {
      setError(error.message);
      setErrorKey((prev) => prev + 1);
    }
  };

  return (
    <>
      <LoginToSignUpTitle title="회원가입" />
      <section className="w-full h-[79vh] bg-white relative flex flex-col justify-center items-center gap-3 overflow-hidden">
        <form
          onSubmit={handleSignUp}
          className="relative flex flex-col items-center justify-center "
        >
          <div className="relative flex flex-col mb-2">
            <Input
              type="text"
              placeholder="닉네임"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
            <MdOutlineTagFaces className="absolute text-xl left-3 top-4 text-purple" />
          </div>
          <div className="relative flex flex-col mb-2">
            <Input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
          </div>
          <div className="relative flex flex-col mb-2">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
          </div>
          <div className="relative flex flex-col mb-2">
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
          </div>
          {error && (
            <p
              key={errorKey}
              className="absolute bottom-[7.5vh] animate-vibration text-gray-dark"
            >
              {error}
            </p>
          )}
          <Button variant="default" type="submit" size="default">
            회원가입
          </Button>
        </form>
        <Button variant="link" size="sm" onClick={() => navigate("/login")}>
          <span>로그인</span>
        </Button>
      </section>
    </>
  );
};
