import React, { useState } from 'react';
import { format } from 'date-fns';
import leftBlack from '@/assets/webps/Calendar/leftBlack.webp';
import rightBlack from '@/assets/webps/Calendar/rightBlack.webp';
import calendarMint from '@/assets/webps/Calendar/calendarMint.webp';
import { AddScheduleModal } from '@/components/Calendar/AddScheduleModal/AddScheduleModal';

interface YearAndMonthProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const YearAndMonth: React.FC<YearAndMonthProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}) => {
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);

  // 일정 추가 클릭하면 AddScheduleModal 열기
  const openAddScheduleModal = () => {
    setIsAddScheduleModalOpen(true);
  };

  // 모달 외부 클릭 시 AddScheduleModal 닫기
  const closeAddScheduleModal = () => {
    setIsAddScheduleModalOpen(false);
  };
  return (
    <>
      <div className="w-full flex justify-between">
        <div className="flex flex-1 justify-center mb-9">
          <div className="w-[270px] flex justify-between items-center ">
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
        </div>
        {/* 일정 추가 */}
        <div
          onClick={openAddScheduleModal}
          className="w-[101px] mb-[30px] h-[38px] bg-mainBlack rounded-[4px] px-[14px] py-2 gap-2 flex items-center cursor-pointer"
        >
          <img src={calendarMint} alt="calendar mint" className="w-4 h-4" />
          <span className="text-white text-[12px] font-[500] leading-[22px]">일정 추가</span>
        </div>
      </div>
      {isAddScheduleModalOpen && <AddScheduleModal onClose={closeAddScheduleModal} />}
    </>
  );
};
