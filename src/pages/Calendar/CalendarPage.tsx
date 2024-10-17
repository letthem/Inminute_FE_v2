import { useState } from 'react';
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  subDays,
} from 'date-fns';
import { FolderBar } from '@/components/FolderBar/FolderBar';
import { NavBar } from '@/components/NavBar/NavBar';
import leftBlack from '@/assets/webps/Calendar/leftBlack.webp';
import rightBlack from '@/assets/webps/Calendar/rightBlack.webp';

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // < yyyy.MM >
  const renderHeader = () => {
    return (
      <div className="w-[270px] flex justify-between items-center mb-9">
        <img
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="w-[22px] h-[22px] cursor-pointer"
          src={leftBlack}
          alt="prev month"
        />
        <h2 className="text-mainBlack text-[32px] font-[700] leading-[35px]">
          {format(currentMonth, 'yyyy.MM')}
        </h2>
        <img
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="w-[22px] h-[22px] cursor-pointer"
          src={rightBlack}
          alt="next month"
        />
      </div>
    );
  };

  // 요일 (일 ~ 토)
  const renderDays = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <div className="w-[calc(100vw-480px)] flex mb-5">
        {days.map((day) => (
          <div
            key={day}
            className="w-[14.3%] text-left ml-[9px] text-mainBlack text-[17px] font-[500]"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  // 날짜
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    let rowIndex = 0;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const isLastRow = day > subDays(endDate, 7); // 마지막 주를 감지하기 위한 조건
        const dateWidth = formattedDate.length === 1 ? '11px' : '19px';

        days.push(
          <div
            className={`w-[14.3%] aspect-[4/3] border-[0.3px] border-gray03 flex flex-col bg-white
              ${rowIndex === 0 && i === 0 ? 'rounded-tl-[10px]' : ''} 
              ${rowIndex === 0 && i === 6 ? 'rounded-tr-[10px]' : ''} 
              ${isLastRow && i === 0 ? 'rounded-bl-[10px]' : ''} 
              ${isLastRow && i === 6 ? 'rounded-br-[10px]' : ''} 
              hover:bg-gray01 cursor-pointer`}
          >
            <span
              className={`ml-4 mt-[12px] ${!isSameMonth(day, monthStart) ? 'text-transparent' : 'text-mainBlack'} 
                        ${isSameDay(day, new Date()) ? 'font-[900]' : 'font-[500]'}`}
              key={day.toString()}
            >
              {formattedDate}
            </span>
            {isSameDay(day, new Date()) && (
              <div className="h-[1.4px] bg-black ml-4 mt-[-1px]" style={{ width: dateWidth }} />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex justify-center" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
      rowIndex++;
    }

    return <div className="mb-11 w-full">{rows}</div>;
  };

  return (
    <div className="w-screen h-screen flex flex-row bg-bg">
      <FolderBar />
      <section className="flex flex-col w-[calc(100vw-280px)] h-full overflow-y-auto scrollbar-hide">
        <NavBar />
        <div className="mt-[96px] mx-[100px] flex flex-col items-center font-nanum leading-[22px]">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      </section>
    </div>
  );
};
