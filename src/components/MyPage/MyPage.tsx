import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useSearchStore } from "@/lib/store/useSearchStore";
import LoginToSignUpTitle from "../LoginToSignUpTitle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  MdAlternateEmail,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";

const MyPage = () => {
  const [user, setUser] = useState<{ nickname: string; email: string }>({
    nickname: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((user) => ({ ...user, nickname: event.target!.value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((user) => ({ ...user, email: event.target!.value }));
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    localStorage.setItem("userData", JSON.stringify(user));
    alert("회원정보가 수정되었습니다");
  };

  const searchHistory = useSearchStore((state) => state.searchHistory);

  const handleNavClick = (categoryId: string, itemId: string) => {
    navigate(`/${categoryId}/${itemId}`);
  };

  return (
    <Layout>
      <section className="w-full h-full bg-white relative flex flex-col items-center gap-[2vh] overflow-y-auto">
        <LoginToSignUpTitle title="프로필" />
        <div className="mt-4">
          <div className="w-full h-[5rem] relative">
            <label className="text-lg font-bold text-purple">닉네임</label>
            <MdOutlineDriveFileRenameOutline className="absolute text-xl left-3 top-10 text-purple" />
            <Input
              type="text"
              value={user.nickname}
              onChange={handleNameChange}
              placeholder="닉네임을 입력해주세요"
              className="w-full h-[2.5rem] text-xl bg-transparent focus:outline-none focus:shadow-none pl-10"
            />
          </div>
          <div className="w-full h-[5rem] relative">
            <label className="text-lg font-bold text-purple">이메일</label>
            <MdAlternateEmail className="absolute text-xl left-3 top-10 text-purple" />
            <Input
              type="email"
              value={user.email}
              onChange={handleEmailChange}
              placeholder="이메일을 입력해주세요"
              className="w-full h-[2.5rem] text-xl bg-transparent focus:outline-none focus:shadow-none pl-10"
            />
          </div>
        </div>
        <Button
          variant="default"
          type="submit"
          size="default"
          onClick={handleClick}
        >
          회원정보 수정
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate("/myquestion")}
        >
          <span> 나의 R지식in 보러가기</span>
        </Button>
        <div className="w-full">
          <div className="w-full h-[1px] mt-4 mb-1 bg-purple" />
          <span className="ml-2 text-lg font-bold text-purple">
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
