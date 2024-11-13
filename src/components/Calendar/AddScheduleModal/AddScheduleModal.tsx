import React, { useState } from 'react';
import xGray from '@/assets/svgs/Main/xGray.svg';
import { TitleInput } from '@/components/Calendar/AddScheduleModal/TitleInput/TitleInput';
import { DatePicker } from '@/components/Calendar/AddScheduleModal/DatePicker/DatePicker';
import { TimePicker } from '@/components/Calendar/AddScheduleModal/TimePicker/TimePicker';

interface AddScheduleModalProps {
  onClose: () => void;
}

export const AddScheduleModal: React.FC<AddScheduleModalProps> = ({ onClose }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>('AM');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const isSubmitEnabled = noteTitle.trim() && selectedDates.length > 0 && hours && minutes;

  const handleSubmit = () => {
    if (isSubmitEnabled) {
      // API 호출 로직
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mainBlack bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="ml-[100px] w-[480px] h-[418px] absolute flex flex-col items-center rounded-[10px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mt-[52px] text-mainBlack text-[24px] font-[700]">새 일정</p>
        <img
          src={xGray}
          alt="close"
          className="w-[15px] h-[15px] absolute right-[27px] top-[27px] cursor-pointer"
          onClick={onClose}
        />

        <TitleInput value={noteTitle} onChange={setNoteTitle} />
        <div className="mt-5 flex gap-4">
          <DatePicker selectedDates={selectedDates} onSelectDates={setSelectedDates} />
          <TimePicker
            meridiem={meridiem}
            setMeridiem={setMeridiem}
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
          />
        </div>

        <div
          onClick={isSubmitEnabled ? handleSubmit : undefined}
          className={`${isSubmitEnabled ? 'bg-mainBlack cursor-pointer' : 'bg-gray03 cursor-default'} w-[59px] h-[46px] rounded-[4px] mt-[60px] flex justify-center items-center`}
        >
          <span className="text-white text-[14px] font-[500]">저장</span>
        </div>
      </div>
    </div>
  );
};
