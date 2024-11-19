import { Schedule } from '@/pages/Calendar/dto';
import colorPalette from '@/constants/colorPalette';
import React from 'react';

interface MeetingProps {
  meetings: Schedule[];
}

export const Meeting: React.FC<MeetingProps> = ({ meetings }) => {
  // startDateTime을 기준으로 회의 목록을 정렬 (오름차순)
  const sortedMeetings = meetings.sort(
    (a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
  );

  return (
    <div className="flex flex-col mt-[5px] s1200:mx-3 mx-2 gap-[6px]">
      {sortedMeetings.map((meeting, index) => {
        const colorGroup =
          colorPalette[meeting.color as keyof typeof colorPalette] || colorPalette.orange;
        const bgColor = colorGroup.bg;
        const textColor = colorGroup.text;
        const stripeColor = colorGroup.main;

        // startDateTime을 현재 시간과 비교하여 미래일 경우에만 stripeColor를 표시
        const isFutureEvent = new Date(meeting.startDateTime) > new Date();

        return (
          <div
            key={index}
            className="flex w-full h-6 rounded-[4px] overflow-hidden items-center"
            style={{ backgroundColor: bgColor }}
          >
            {isFutureEvent && stripeColor && (
              <div
                className="min-w-[5px] mr-[-2px] h-full"
                style={{ backgroundColor: stripeColor }}
              />
            )}
            <p
              className={`truncate ml-[8px] mr-1 text-[12px] font-[500] leading-[22px]`}
              style={{ color: textColor }}
            >
              {meeting.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};
