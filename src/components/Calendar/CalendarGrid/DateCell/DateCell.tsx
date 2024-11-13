import React from 'react';
import { isSameDay, isSameMonth, format } from 'date-fns';
import { Meeting } from '@/components/Calendar/CalendarGrid/DateCell/Meeting/Meeting';

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

  const meetings = [
    {
      id: 1,
      title: 'TF팀 회의',
      backgroundColor: 'bg-[#EAFBEC]',
      textColor: 'text-[#489D06]',
    },
    {
      id: 2,
      title: '해커톤 정기회의',
      backgroundColor: 'bg-[#FCF3FD]',
      textColor: 'text-[#E7546A]',
      stripeColor: 'bg-[#FF94A4]',
    },
  ];

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
      {isSpecial && <Meeting meetings={meetings} />}
    </div>
  );
};
