import React, { useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subDays,
  isSameDay,
} from 'date-fns';
import { DateCell } from '@/components/Calendar/CalendarGrid/DateCell/DateCell';
import { Schedule } from '@/pages/Calendar/dto';

interface CalendarGridProps {
  currentMonth: Date;
  onDateClick: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  selectedDate: Date | null;
  schedules: Schedule[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  onDateClick,
  selectedDate,
  schedules
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let rowIndex = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const isFirstRow = rowIndex === 0;
      const isLastRow = day > subDays(endDate, 7);
      const isFirstCol = i === 0;
      const isLastCol = i === 6;

      const daySchedules = schedules.filter((schedule) =>
        isSameDay(new Date(schedule.startDateTime), day)
      );

      days.push(
        <DateCell
          key={day.toString()}
          day={day}
          currentMonth={currentMonth}
          onClick={onDateClick}
          isSelected={!!selectedDate && isSameDay(day, selectedDate)}
          schedules={daySchedules}
          isFirstRow={isFirstRow}
          isLastRow={isLastRow}
          isFirstCol={isFirstCol}
          isLastCol={isLastCol}
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="flex justify-center" key={rowIndex}>
        {days}
      </div>
    );
    days = [];
    rowIndex++;
  }

  useEffect(() => {
    console.log('Updated schedules:', schedules);
  }, [schedules]);

  return <div className="mb-[46px] w-full">{rows}</div>;
};
