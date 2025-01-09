import React, { useEffect, useRef, useState } from 'react';
import { startOfMonth, endOfMonth, addDays, format, getDay } from 'date-fns';
import leftBlack from '@/assets/webps/Calendar/leftBlack.webp';
import rightBlack from '@/assets/webps/Calendar/rightBlack.webp';

interface DateModalProps {
  selectedDates: Date[];
  onSelectDates: (dates: Date[]) => void;
  onClose: () => void;
}

export const DateModal: React.FC<DateModalProps> = ({ selectedDates, onSelectDates, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempSelectedDates, setTempSelectedDates] = useState<Date[]>(selectedDates);
  const modalRef = useRef<HTMLDivElement>(null);

  const daysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = [];
    let day = start;

    // 빈칸 추가
    for (let i = 0; i < getDay(start); i++) {
      days.push(null);
    }

    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const handleDayClick = (day: Date) => {
    setTempSelectedDates((prevDates) => {
      const isSelected = prevDates.some(
        (date) => format(date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      );
      return isSelected
        ? prevDates.filter((date) => format(date, 'yyyy-MM-dd') !== format(day, 'yyyy-MM-dd'))
        : [...prevDates, day];
    });
  };

  const handleConfirmClick = () => {
    if (tempSelectedDates.length > 0) {
      onSelectDates(tempSelectedDates);
      onClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute top-[39px] left-[17px] z-20 bg-white w-[272px] p-5 rounded-[10px] cursor-default"
      onClick={(e) => e.stopPropagation()}
      style={{
        filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
      }}
    >
      <div className="flex justify-center items-center mb-[18px]">
        <div className="flex items-center gap-[12px]">
          <img
            src={leftBlack}
            alt="prev button"
            className="w-3 h-3 cursor-pointer"
            onClick={() => setCurrentMonth((prev) => addDays(prev, -30))}
          />
          <span className="font-[800] text-mainBlack text-[15px]">
            {format(currentMonth, 'yyyy-MM')}
          </span>
          <img
            src={rightBlack}
            alt="next button"
            className="w-3 h-3 cursor-pointer"
            onClick={() => setCurrentMonth((prev) => addDays(prev, 30))}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-x-[13px] gap-y-[6px] text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <span key={day} className="text-center text-mainBlack text-[11px] font-[500]">
            {day}
          </span>
        ))}
        {daysInMonth().map((day, index) => {
          const isToday = day && format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

          return day ? (
            <div
              key={index}
              className={`text-[12px] w-5 h-[22px] cursor-pointer hover:text-mainBlack ${
                tempSelectedDates.some(
                  (date) => format(date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                )
                  ? 'font-[900] text-mainBlack'
                  : isToday
                    ? 'font-[700] text-gray05'
                    : 'font-[700] text-gray03'
              }`}
              onClick={() => handleDayClick(day)}
            >
              {format(day, 'd')}
            </div>
          ) : (
            <div key={index} className="w-5 h-[22px]" />
          );
        })}
      </div>
      <div className="w-full flex mt-5 justify-center">
        <div
          className={`w-[42px] h-[30px] rounded-[4px] text-[9px] flex justify-center items-center cursor-pointer text-white ${
            tempSelectedDates.length > 0 ? 'bg-mainBlack' : 'bg-gray03 cursor-default'
          }`}
          onClick={tempSelectedDates.length > 0 ? handleConfirmClick : undefined}
        >
          확인
        </div>
      </div>
    </div>
  );
};
