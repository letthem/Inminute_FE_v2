import React, { useState } from 'react';
import calendarBlack from '@/assets/webps/Calendar/calendarBlack.webp';
import { DateModal } from '@/components/Calendar/AddScheduleModal/DatePicker/DateModal/DateModal';
import { format } from 'date-fns';

interface DatePickerProps {
  selectedDates: Date[];
  onSelectDates: (dates: Date[]) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ selectedDates, onSelectDates }) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleDatePickerClick = () => {
    setIsDateModalOpen(true);
    setIsFocused(true);
  };

  const handleDateModalClose = () => {
    setIsDateModalOpen(false);
    setIsFocused(false);
  };
  return (
    <div
      className="relative w-[196px] h-[53px] rounded-[10px] pl-4 pr-[17px] flex items-center justify-between cursor-pointer"
      onClick={handleDatePickerClick}
      style={{
        boxShadow: isFocused ? '0 0 0 1px #2B2B2B inset' : '0 0 0 1px #D9D9D9 inset',
      }}
    >
      <div className="flex">
        <span className="text-gray05 text-[11px] font-[500] mr-[21px]">날짜</span>
        <span className="text-mainBlack text-[13px] font-[700]">
          {selectedDates.length === 1
            ? format(selectedDates[0], 'yyyy - MM - dd')
            : selectedDates.length > 1
              ? '중복 선택'
              : ''}
        </span>
      </div>
      <img src={calendarBlack} alt="calendar" className="w-4 h-4" />
      {isDateModalOpen && (
        <DateModal
          selectedDates={selectedDates}
          onSelectDates={onSelectDates}
          onClose={handleDateModalClose}
        />
      )}
    </div>
  );
};
