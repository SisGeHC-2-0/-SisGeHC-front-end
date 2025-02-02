import { FC, ReactNode } from "react";

type EventButtonProps = {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
};

const EventButton: FC<EventButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button onClick={onClick} className="w-[110px] h-[110px]">
      <div className="w-[110px] h-[110px] flex items-center justify-center rounded-[10px] bg-[#00A285]">
        {icon}
      </div>
      <p className="text-center text-[18px] font-bold text-[#707070]">{text}</p>
    </button>
  );
};

export default EventButton;
