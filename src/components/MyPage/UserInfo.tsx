import React from "react";

const UserInfo = ({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) => (
  <div className="w-[46vh] h-[9vh]">
    <div className="w-[46vh] h-[1px] mt-[2vh] mb-[0.1vh] bg-purple"></div>
    <label className="text-[1.5vh] font-bold text-purple">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-[46vh] h-[5vh] mt-[1.3vh] text-[3vh] border-none text-gray-dark font-bold bg-transparent focus:outline-none focus:shadow-none"
    />
  </div>
);

export default UserInfo;
