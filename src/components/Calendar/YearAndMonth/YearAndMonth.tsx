import React from 'react';
import { format } from 'date-fns';
import leftBlack from '@/assets/webps/Calendar/leftBlack.webp';
import rightBlack from '@/assets/webps/Calendar/rightBlack.webp';

interface YearAndMonthProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const YearAndMonth: React.FC<YearAndMonthProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}) => (
  <div className="w-[270px] flex justify-between items-center mb-9">
    <img
      onClick={onPrevMonth}
      className="w-[22px] h-[22px] cursor-pointer"
      src={leftBlack}
      alt="prev month"
    />
    <h2 className="text-mainBlack text-[32px] font-[750] leading-[35px]">
      {format(currentMonth, 'yyyy.MM')}
    </h2>
    <img
      onClick={onNextMonth}
      className="w-[22px] h-[22px] cursor-pointer"
      src={rightBlack}
      alt="next month"
    />
  </div>
);
