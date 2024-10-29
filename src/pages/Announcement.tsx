import { useState } from "react";
import { Layout } from "@/components/layout/Layout";

const TopicItem = ({
  date,
  time,
  details,
}: {
  date: string;
  time: string;
  details: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`my-[1.5vh] mx-auto w-[23rem] ${
        isExpanded
          ? "h-auto bg-[#9747ff] text-white"
          : "h-[5.75vh] bg-[#fef3c1] text-black "
      } rounded-xl text-center pt-4 font-bold text-sm cursor-pointer  transition-all duration-300 ease-in-out overflow-hidden`}
      onClick={handleToggle}
    >
      {date} {time} 점검 예정입니다.
      {isExpanded && (
        <div>
          {/* 여기에 상세내용을 적으시면 됩니다 */}
          {details}
        </div>
      )}
    </div>
  );
};

export const Announcement = () => {
  return (
    <Layout>
      <div className="w-full h-[3.75vh] bg-[#fcd118] text-[#9747ff] text-center align-center leading-[3.75vh] text-[2vh]">
        공지사항
      </div>
      <TopicItem
        date="2024-05-03"
        time="09:00 ~ 10:00 (1시간)"
        details="점검 동안 서비스 이용이 중지됩니다. 양해 부탁드립니다."
      />
      <TopicItem
        date="2024-05-04"
        time="10:00 ~ 11:00 (1시간)"
        details="서버 업데이트로 인해 서비스가 일시 중지됩니다."
      />
      <TopicItem
        date="2024-05-05"
        time="11:00 ~ 12:00 (1시간)"
        details="정기 점검이 진행됩니다. 서비스 이용에 불편을 드려 죄송합니다."
      />
      <TopicItem
        date="2024-05-06"
        time="12:00 ~ 13:00 (1시간)"
        details="시스템 점검으로 인해 잠시 서비스가 중단됩니다."
      />
      <TopicItem
        date="2024-05-07"
        time="13:00 ~ 14:00 (1시간)"
        details="안정적인 서비스 제공을 위해 점검을 실시합니다."
      />
    </Layout>
  );
};
