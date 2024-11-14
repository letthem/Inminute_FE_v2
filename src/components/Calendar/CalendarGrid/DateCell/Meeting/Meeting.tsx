import React from 'react';

interface MeetingProps {
  meetings: {
    id: number;
    title: string;
    backgroundColor: string;
    textColor: string;
    stripeColor?: string;
  }[];
}

export const Meeting: React.FC<MeetingProps> = ({ meetings }) => (
  <div className="flex flex-col mt-[5px] s1200:mx-3 mx-2 gap-[6px]">
    {meetings.map((meeting) => (
      <div
        key={meeting.id}
        className={`flex w-full h-6 ${meeting.backgroundColor} rounded-[4px] overflow-hidden items-center`}
      >
        {meeting.stripeColor && <div className={`w-[5px] h-full ${meeting.stripeColor}`} />}
        <p
          className={`ml-[${meeting.stripeColor ? '6px' : '8px'}] mr-1 text-[12px] font-[500] leading-[22px] ${meeting.textColor} truncate`}
        >
          {meeting.title}
        </p>
      </div>
    ))}
  </div>
);
