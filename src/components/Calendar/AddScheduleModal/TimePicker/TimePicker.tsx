import React, { useState } from 'react';

interface TimePickerProps {
  meridiem: 'AM' | 'PM';
  setMeridiem: (value: 'AM' | 'PM') => void;
  hours: string;
  setHours: (value: string) => void;
  minutes: string;
  setMinutes: (value: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  meridiem,
  setMeridiem,
  hours,
  setHours,
  minutes,
  setMinutes,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === '') {
      setHours('');
      return;
    }

    if (value !== '0' && value !== '00') {
      value = value.replace(/^0+/, '');
    }

    if (/^(0?[0-9]|1[0-2])$/.test(value)) {
      setHours(value.length === 1 ? `0${value}` : value);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === '') {
      setMinutes('');
      return;
    }

    if (value !== '0' && value !== '00') {
      value = value.replace(/^0+/, '');
    }

    if (/^([0-5]?[0-9])$/.test(value)) {
      setMinutes(value.length === 1 ? `0${value}` : value);
    }
  };

  return (
    <div
      className="w-[196px] h-[53px] rounded-[10px] flex justify-between px-4 items-center text-[13px]"
      style={{ boxShadow: isFocused ? '0 0 0 1px #2B2B2B inset' : '0 0 0 1px #D9D9D9 inset' }}
      onMouseDown={handleFocus}
      onBlur={handleBlur}
    >
      <div className="flex gap-3 font-[700]">
        <span
          className={`cursor-pointer ${meridiem === 'AM' ? 'text-mainBlack' : 'text-gray02'}`}
          onClick={() => setMeridiem('AM')}
        >
          AM
        </span>
        <span
          className={`cursor-pointer ${meridiem === 'PM' ? 'text-mainBlack' : 'text-gray02'}`}
          onClick={() => setMeridiem('PM')}
        >
          PM
        </span>
      </div>
      <div className="flex gap-3 text-mainBlack">
        <input
          type="text"
          className="w-5 placeholder:text-gray02 font-[700] focus:outline-none"
          placeholder="00"
          value={hours}
          onChange={handleHoursChange}
        />
        <span className="font-[500]">:</span>
        <input
          type="text"
          className="w-5 placeholder:text-gray02 font-[700] focus:outline-none"
          placeholder="00"
          value={minutes}
          onChange={handleMinutesChange}
        />
      </div>
    </div>
  );
};
