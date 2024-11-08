import React, { useEffect, useState } from 'react';
import xGray from '@/assets/svgs/Calendar/xGray.svg';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DetailMenuModal } from '@/components/Calendar/DetailModal/DetailMenuModal/DetailMenuModal';

interface DetailModalProps {
  selectedDate: Date;
  position: { top: number; left: number };
  onClose: () => void;
}

interface MeetingItem {
  id: number;
  time: string;
  title: string;
  color: string;
  textColor: string;
}

export const DetailModal: React.FC<DetailModalProps> = ({ selectedDate, position, onClose }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const [meetings, setMeetings] = useState<MeetingItem[]>([
    { id: 1, time: '20:00', title: 'TF팀 회의', color: '#FCF2EB', textColor: '#DB7A08' },
    { id: 2, time: '22:00', title: '해커톤 정기회의', color: '#F3E9FF', textColor: '#BE5BFF' },
  ]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // 메뉴 아이콘 클릭 시 DetailMenuModal 열기
  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => (prev === id ? null : id)); // 클릭 시 해당 아이템의 메뉴 토글
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  const handleEdit = (id: number) => {
    alert(`수정 기능 실행 - ID: ${id}`);
    setIsMenuOpen(null);
  };

  const handleDelete = (id: number) => {
    setMeetings((prevMeetings) => {
      const updatedMeetings = prevMeetings.filter((meeting) => meeting.id !== id);

      if (updatedMeetings.length === 0) {
        onClose(); // 아이템이 0개가 되면 DetailModal 닫기
      }

      return updatedMeetings;
    });
    setIsMenuOpen(null);
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div
        style={{
          position: 'absolute',
          top: position.top || 0,
          left: position.left || 0,
          boxShadow: '0px 0px 6px 0px rgba(96, 96, 96, 0.16)',
        }}
        className="bg-white rounded-[10px] w-[276px] pb-[26px] z-10"
        onClick={(e) => e.stopPropagation()} // DetailModal 클릭 시 모달 닫히지 않도록 처리
      >
        <div className="flex justify-between">
          <h2 className="text-[18px] font-[500] ml-6 mt-[26px] mb-[18px]">
            {format(selectedDate, 'MM')}월 {format(selectedDate, 'dd')}일 (
            {format(selectedDate, 'E', { locale: ko })})
          </h2>
          <img
            src={xGray}
            alt="close"
            onClick={onClose}
            className="w-[10px] h-[10px] mt-5 mr-5 cursor-pointer"
          />
        </div>

        {/* 회의 일정 내용 */}
        {meetings.map((meeting) => (
          <div key={meeting.id} className="ml-6 mr-[22px] flex mt-[18px]">
            <span className="text-[11px] font-[700] leading-[20px] text-mainBlack mr-[11px] mt-[12px]">
              {meeting.time}
            </span>
            <div
              className="w-full h-8 rounded-[4px] px-[10px] py-[5px] flex justify-between items-center"
              style={{ backgroundColor: meeting.color }}
            >
              <span
                className="text-[13px] leading-[22px] font-[500]"
                style={{ color: meeting.textColor }}
              >
                {meeting.title}
              </span>
              <div
                onClick={(event) => handleMenuClick(event, meeting.id)}
                className="relative w-[2px] h-[11px] flex flex-col justify-between cursor-pointer"
              >
                <div
                  className="w-[2px] h-[2px] rounded-[2px]"
                  style={{ backgroundColor: meeting.textColor }}
                />
                <div
                  className="w-[2px] h-[2px] rounded-[2px]"
                  style={{ backgroundColor: meeting.textColor }}
                />
                <div
                  className="w-[2px] h-[2px] rounded-[2px]"
                  style={{ backgroundColor: meeting.textColor }}
                />
                {isMenuOpen === meeting.id && (
                  <DetailMenuModal
                    onEdit={() => handleEdit(meeting.id)}
                    onDelete={() => handleDelete(meeting.id)}
                    onClose={() => setIsMenuOpen(null)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
