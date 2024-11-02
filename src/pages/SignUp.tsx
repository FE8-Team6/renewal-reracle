import React, { useState } from "react";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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
import { z } from "zod";

const signUpSchema = z
  .object({
    displayName: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
    email: z.string().email("이메일을 올바르게 입력해주세요."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const SignUp = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDisplayNameChecked, setIsDisplayNameChecked] =
    useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
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

  const checkDisplayName = async () => {
    setError("");
    if (displayName.length < 2) {
      setError("닉네임은 2자 이상이어야 합니다.");
      setIsDisplayNameChecked(false);
      return;
    }
    const q = query(
      collection(db, "users"),
      where("displayName", "==", displayName)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError("이미 사용 중인 닉네임입니다.");
      setIsDisplayNameChecked(false);
    } else {
      alert("사용 가능한 닉네임입니다.");
      setIsDisplayNameChecked(true);
    }
  };

  const checkEmail = async () => {
    setError("");
    const emailSchema = z.string().email("이메일 형식이 올바르지 않습니다.");
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError("이미 사용 중인 이메일입니다.");
      setIsEmailChecked(false);
    } else {
      alert("사용 가능한 이메일입니다.");
      setIsEmailChecked(true);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const result = signUpSchema.safeParse({
      displayName,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    if (!isDisplayNameChecked) {
      setError("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (!isEmailChecked) {
      setError("이메일 중복 확인을 해주세요.");
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
      }
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다.");
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
          <div className="relative flex flex-row items-center mb-2 gap-1">
            <Input
              type="text"
              placeholder="닉네임"
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value);
                setIsDisplayNameChecked(false);
                setError("");
              }}
              className="w-[16.8rem]"
            />
            <MdOutlineTagFaces className="absolute text-xl left-3 top-4 text-purple" />
            <Button
              variant="secondary"
              size="sm"
              onClick={checkDisplayName}
              className="mt-2"
            >
              중복 확인
            </Button>
          </div>
          <div className="relative flex flex-row items-center mb-2 gap-1">
            <Input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setIsEmailChecked(false);
                setError("");
              }}
              className="w-[16.8rem]"
            />
            <MdAlternateEmail className="absolute text-xl left-3 top-4 text-purple" />
            <Button
              variant="secondary"
              size="sm"
              onClick={checkEmail}
              className="mt-2"
            >
              중복 확인
            </Button>
          </div>
          <div className="relative flex flex-col mb-2">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
            <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
          </div>
          <div className="relative flex flex-col mb-2">
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setError("");
              }}
            />
            <MdOutlinePassword className="absolute text-xl left-3 top-4 text-purple" />
          </div>
          {error && <p className="text-error-30 mb-2">{error}</p>}
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
