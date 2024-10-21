import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PurpleButton, WhiteButton } from "../Buttons";
import UserInfo from "./UserInfo";
import { Layout } from "@/components/layout/Layout";
import { useSearchStore } from "@/lib/store/useSearchStore";
import LoginToSignUpTitle from "../LoginToSignUpTitle";

const getUserData = () => {
  const data = localStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
};

const MyPage = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
  });

  console.log(user);

  useEffect(() => {
    const storedUser = getUserData();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((u) => ({ ...u, displayName: event.target!.value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((u) => ({ ...u, email: event.target!.value }));
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    localStorage.setItem("userData", JSON.stringify(user));
    alert("회원정보가 수정되었습니다");
  };

  const searchHistory = useSearchStore((state) => state.searchHistory);
  const navigate = useNavigate();

  const handleNavClick = (categoryId: string, itemId: string) => {
    navigate(`/${categoryId}/${itemId}`);
  };

  const handleGoToMyQuestions = () => {
    navigate("/myquestion");
  };

  return (
    <Layout>
      <section className="w-full h-auto bg-white relative flex flex-col items-center gap-[2vh] overflow-y-auto">
        <LoginToSignUpTitle title="프로필" />
        <div className="mt-4">
          <UserInfo
            label="아이디"
            type="text"
            value={user.displayName}
            onChange={handleNameChange}
          >
            아이디
          </UserInfo>
          <UserInfo
            label="이메일"
            type="email"
            value={user.email}
            onChange={handleEmailChange}
          >
            이메일
          </UserInfo>
        </div>
        <PurpleButton onClick={handleClick}>회원정보 수정</PurpleButton>
        <WhiteButton onClick={handleGoToMyQuestions}>
          나의 R지식in 보러가기
        </WhiteButton>
        <div className="w-[46vh]">
          <div className="w-[46vh] h-[1px] mt-[2vh] mb-[0.1vh] bg-purple"></div>
          <span className="text-[2vh] font-bold text-purple">
            나의 최근 재활용품 검색 리스트
          </span>
          <ul className="w-[46vh] h-[4vh] flex flex-wrap py-[2vh] gap-[1.5vh]">
            {searchHistory.map((historyItem, index) => (
              <li
                onClick={() =>
                  handleNavClick(historyItem.categoryId, historyItem.itemId)
                }
                key={index}
                className="p-[1vh] bg-yellow text-purple cursor-pointer text-center text-[2vh] font-bold rounded-[14px] transition duration-200"
              >
                {`#${historyItem.queryData}`}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default MyPage;
