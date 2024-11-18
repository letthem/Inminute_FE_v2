import React, { useEffect, useRef, useState } from 'react';
import xGray from '@/assets/svgs/Calendar/xGray.svg';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DetailMenuModal } from '@/components/Calendar/DetailModal/DetailMenuModal/DetailMenuModal';

interface DetailModalProps {
  selectedDate: Date;
  position: { top: number; right: number };
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [meetings, setMeetings] = useState<MeetingItem[]>([
    {
      id: 1,
      time: '20:00',
      title: 'TF팀 회의',
      color: '#FCF2EB',
      textColor: '#DB7A08',
    },
    { id: 2, time: '22:00', title: '해커톤 정기회의', color: '#F3E9FF', textColor: '#BE5BFF' },
  ]);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 바깥 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (editingId !== null) {
      inputRef.current?.focus();
    }
  }, [editingId]);

  // 메뉴 아이콘 클릭 시 DetailMenuModal 열기
  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => (prev === id ? null : id)); // 클릭 시 해당 아이템의 메뉴 토글
  };

  // 모달 바깥 클릭 시 모달 닫기
  const handleClickOutsideModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose(); // 모달 닫기
  };

  // 수정 div 바깥 클릭 시 수정 취소
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingId !== null && divRef.current && !divRef.current.contains(event.target as Node)) {
        setEditingId(null);
        setIsMenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingId]);

  const handleEdit = (id: number) => {
    setEditingId(id);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) => (meeting.id === id ? { ...meeting, title: value } : meeting))
    );
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      setEditingId(null);
      setIsMenuOpen(null);
    }
    console.log(id);
  };

  const getInputBorderColor = (color: string) => {
    switch (color) {
      case '#FCF2EB': // 주황색
        return '#FFD6A6';
      case '#FCF3FD': // 핑크색
        return '#FFCBD3';
      case '#EAFBEC': // 초록색
        return '#BCEAC1';
      case '#EDF3FA': // 파랑색
        return '#C1D0FF';
      case '#F3E9FF': // 보라색
        return '#E4CEFF';
      default:
        return 'transparent';
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center"
      onClick={handleClickOutsideModal}
    >
      <div
        style={{
          position: 'absolute',
          top: position.top || 0,
          right: position.right || 0,
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
              ref={divRef}
              className="w-full h-8 rounded-[4px] px-[10px] py-[5px] flex justify-between items-center"
              style={{
                backgroundColor: editingId === meeting.id ? '#FFFFFF' : meeting.color,
                boxShadow:
                  editingId === meeting.id
                    ? `0 0 0 1px ${getInputBorderColor(meeting.color)} inset`
                    : 'none',
              }}
            >
              {editingId === meeting.id ? (
                <input
                  ref={inputRef}
                  value={meeting.title}
                  onChange={(e) => handleInputChange(e, meeting.id)}
                  onKeyDown={(e) => handleInputKeyPress(e, meeting.id)}
                  className="w-full bg-transparent border-none outline-none text-[13px] leading-[22px] font-[500] text-gray03"
                />
              ) : (
                <span
                  className="w-[156px] text-[13px] leading-[22px] font-[500] truncate"
                  style={{ color: meeting.textColor }}
                >
                  {meeting.title}
                </span>
              )}
              {editingId !== meeting.id && (
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
