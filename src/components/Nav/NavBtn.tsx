import { NavBtnTypes } from "@/lib/types/navBtnTypes";

const NavBtn = ({ image, text, onClick }: NavBtnTypes) => {
  return (
    <div className="relative flex items-center w-auto h-auto">
      <button
        onClick={onClick}
        className="border-none w-[8vh] bg-transparent flex flex-col items-center"
      >
        <img src={image} className="w-6 h-6 mx-auto" />
        <div className="mt-1 text-sm font-medium text-center text-grayDark">
          {text}
        </div>
      </button>
    </div>
  );
};

export default NavBtn;
