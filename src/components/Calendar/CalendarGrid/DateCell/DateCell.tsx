import React from 'react';
import { isSameDay, isSameMonth, format } from 'date-fns';
import { Meeting } from '@/components/Calendar/CalendarGrid/DateCell/Meeting/Meeting';
import { Schedule } from '@/pages/Calendar/dto';

interface DateCellProps {
  day: Date;
  currentMonth: Date;
  onClick: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  isSelected: boolean;
  schedules: Schedule[];
  isFirstRow: boolean;
  isLastRow: boolean;
  isFirstCol: boolean;
  isLastCol: boolean;
}

export const DateCell: React.FC<DateCellProps> = ({
  day,
  currentMonth,
  onClick,
  isSelected,
  schedules,
  isFirstRow,
  isLastRow,
  isFirstCol,
  isLastCol,
}) => {
  const formattedDate = format(day, 'd');
  const isToday = isSameDay(day, new Date());
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
      {schedules.length > 0 && <Meeting meetings={schedules} />}
    </div>
  );
};
