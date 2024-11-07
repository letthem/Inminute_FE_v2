import React from 'react';
import { isSameDay, isSameMonth, format } from 'date-fns';

interface DateCellProps {
  day: Date;
  currentMonth: Date;
  onClick: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  specialDate?: Date;
  isFirstRow: boolean;
  isLastRow: boolean;
  isFirstCol: boolean;
  isLastCol: boolean;
  isSelected: boolean;
}

export const DateCell: React.FC<DateCellProps> = ({
  day,
  currentMonth,
  onClick,
  specialDate,
  isFirstRow,
  isLastRow,
  isFirstCol,
  isLastCol,
  isSelected,
}) => {
  const formattedDate = format(day, 'd');
  const isToday = isSameDay(day, new Date());
  const isSpecial = specialDate && isSameDay(day, specialDate);
  const dateWidth = formattedDate.length === 1 ? '11px' : '19px';

  return (
    <div
      className={`w-[14.3%] h-[130px] bg-white border-[0.3px] flex flex-col cursor-pointer
      ${isFirstRow && isFirstCol ? 'rounded-tl-[10px]' : ''} 
      ${isFirstRow && isLastCol ? 'rounded-tr-[10px]' : ''} 
      ${isLastRow && isFirstCol ? 'rounded-bl-[10px]' : ''} 
      ${isLastRow && isLastCol ? 'rounded-br-[10px]' : ''}
      ${isSelected ? 'border-gray05 border-[0.5px]' : 'border-gray03'}
      ${isSameMonth(day, currentMonth) ? 'hover:bg-gray01' : ''}
    `}
      onClick={(e) => onClick(day, e)}
      style={{
        boxShadow: isSelected ? '0 0 0 0.5px inset #A6A6A6' : 'none',
      }}
    >
      <span
        className={`ml-4 mt-[12px] ${!isSameMonth(day, currentMonth) ? 'text-transparent' : 'text-mainBlack'} 
                    ${isToday ? 'font-[900]' : 'font-[500]'}`}
        style={{ width: dateWidth }}
      >
        {formattedDate}
      </span>
      {isToday && (
        <div className="h-[1.4px] bg-black ml-4 mt-[-1px]" style={{ width: dateWidth }} />
      )}
      {isSpecial && (
        <div className="flex flex-col mt-[5px] ml-[10px] mr-1 gap-[6px]">
          <div className="flex w-full h-6 bg-[#EAFBEC] rounded-[4px] overflow-hidden items-center">
            <p className="ml-[8.3px] text-[12px] font-[500] leading-[22px] text-[#489D06]">
              TF팀 회의
            </p>
          </div>
          <div className="flex w-full h-6 bg-[#FCF3FD] rounded-[4px] overflow-hidden items-center">
            <div className="w-1 h-full bg-[#FF94A4]" />
            <p className="ml-[8.3px] text-[12px] font-[500] leading-[22px] text-[#E7546A]">
              해커톤 정기회의
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
