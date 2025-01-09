import React from 'react';

export const Days: React.FC = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div className="w-full flex mb-5">
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
