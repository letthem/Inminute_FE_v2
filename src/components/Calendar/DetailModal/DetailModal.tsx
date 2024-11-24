import React, { useEffect, useRef, useState } from 'react';
import xGray from '@/assets/svgs/Calendar/xGray.svg';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DetailMenuModal } from '@/components/Calendar/DetailModal/DetailMenuModal/DetailMenuModal';
import colorPalette, { ColorGroup } from '@/constants/colorPalette';
import { getScheduleByMonth } from '@/apis/Calendar/getSchedule';
import { Schedule } from '@/pages/Calendar/dto';
import { deleteSchedule } from '@/apis/Calendar/deleteSchedule';
import { patchSchedule } from '@/apis/Calendar/patchSchedule';

interface DetailModalProps {
  selectedDate: Date;
  position: { top: number | undefined; bottom: number | undefined; left: number | undefined };
  onClose: () => void;
  onEdit: (id: number, updatedName: string) => void;
  onDelete: (id: number) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  selectedDate,
  position,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [meetings, setMeetings] = useState<Schedule[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 메뉴 아이콘 클릭 시 DetailMenuModal 열기
  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => (prev === id ? null : id)); // 클릭 시 해당 아이템의 메뉴 토글
  };

  // 모달 바깥 클릭 시 모달 닫기
  const handleClickOutsideModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const getColors = (color: ColorGroup) => {
    return colorPalette[color] || colorPalette.orange; // 안전한 접근 및 기본값 설정
  };

  // 일정 삭제
  const handleDelete = async (id: number) => {
    await deleteSchedule(id); // 서버에서 삭제
    setMeetings((prevMeetings) => {
      const updatedMeetings = prevMeetings.filter((meeting) => meeting.id !== id);

      if (updatedMeetings.length === 0) {
        onClose(); // 모달 닫기
      }

      return updatedMeetings;
    });
    onDelete(id); // 부모 컴포넌트에 삭제 알림
  };

  // 일정 수정 버튼 클릭
  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsMenuOpen(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedValue = e.target.value;
    const nameWithoutSpaces = updatedValue.replace(/\s/g, ''); // 공백 제거 후 길이 계산

    if (nameWithoutSpaces.length <= 11) {
      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === id ? { ...meeting, name: updatedValue } : meeting
        )
      );
    }
  };

  // 일정 수정
  const handleInputKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      const updatedName = inputRef.current?.value || '';
      const nameWithoutSpaces = updatedName.replace(/\s/g, ''); // 공백 제거 후 길이 계산

      if (nameWithoutSpaces.trim()) {
        await patchSchedule(id, updatedName.trim()); // 서버에서 수정
        setEditingId(null);
        setIsMenuOpen(null);
        setMeetings((prevMeetings) =>
          prevMeetings.map((meeting) =>
            meeting.id === id ? { ...meeting, name: updatedName.trim() } : meeting
          )
        );
        onEdit(id, updatedName.trim()); // 부모 컴포넌트에 수정 알림
      }
    }
  };

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false); // 모달 닫힐 때 애니메이션 리셋
  }, []);

  // 해당 날짜의 일정을 가져오기
  useEffect(() => {
    const fetchMeetings = async () => {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;

      try {
        const schedules = await getScheduleByMonth(year, month);
        const filteredMeetings = schedules
          .filter((schedule: Schedule) => {
            const scheduleDate = new Date(schedule.startDateTime);
            return (
              scheduleDate.getFullYear() === selectedDate.getFullYear() &&
              scheduleDate.getMonth() === selectedDate.getMonth() &&
              scheduleDate.getDate() === selectedDate.getDate()
            );
          })
          .sort(
            (a: Schedule, b: Schedule) =>
              new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
          ); // 시간 오름차순 정렬

        setMeetings(filteredMeetings);
      } catch (error) {
        console.error('Failed to load meetings:', error);
      }
    };

    fetchMeetings();
  }, [selectedDate]);

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

  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClickOutsideModal}
    >
      <div
        style={{
          position: 'absolute',
          ...(position.top !== undefined && { top: position.top }),
          ...(position.bottom !== undefined && { bottom: position.bottom }),
          left: position.left,
          transform: 'translate(-50%, 0)',
          boxShadow: '0px 0px 6px 0px rgba(96, 96, 96, 0.16)',
        }}
        className="bg-white rounded-[10px] w-[276px] z-10"
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

        <div className="max-h-[176px] overflow-y-auto scrollbar-visible scrollbar-thin-custom mr-1">
          {/* 회의 일정 내용 */}
          {meetings.length === 0 ? (
            <div className="flex flex-col ml-6 justify-center mb-[24px]">
              <p className="text-[14px] text-gray05 font-[500]">등록된 회의 일정이 없어요!</p>
            </div>
          ) : (
            meetings.map((meeting, index) => {
              const colors = getColors(meeting.color);
              const isLastMeeting = index === meetings.length - 1; // 마지막 일정인지 확인

              return (
                <div
                  key={meeting.id}
                  className={`ml-6 mr-[18px] flex mt-[18px]  ${isLastMeeting ? 'mb-[26px]' : ''}`}
                >
                  <span className="min-w-[36px] text-[11px] font-[700] leading-[20px] text-mainBlack mr-[11px] mt-[12px]">
                    {format(new Date(meeting.startDateTime), 'HH:mm')}
                  </span>
                  <div
                    ref={divRef}
                    className="w-full h-8 rounded-[4px] px-[10px] py-[5px] flex justify-between items-center"
                    style={{
                      backgroundColor: editingId === meeting.id ? '#FFFFFF' : colors.bg,
                      boxShadow:
                        editingId === meeting.id ? `0 0 0 1px ${colors.border} inset` : 'none',
                    }}
                  >
                    {editingId === meeting.id ? (
                      <input
                        ref={inputRef}
                        value={meeting.name}
                        onChange={(e) => handleInputChange(e, meeting.id)}
                        onKeyDown={(e) => handleInputKeyPress(e, meeting.id)}
                        className="w-full bg-transparent border-none outline-none text-[13px] leading-[22px] font-[500] text-gray03"
                      />
                    ) : (
                      <span
                        className="w-[156px] text-[13px] leading-[22px] font-[500] truncate"
                        style={{ color: colors.text }}
                      >
                        {meeting.name}
                      </span>
                    )}
                    {editingId !== meeting.id && (
                      <div
                        onClick={(event) => handleMenuClick(event, meeting.id)}
                        className="relative w-[2px] h-[11px] flex flex-col justify-between cursor-pointer"
                      >
                        <div
                          className="w-[2px] h-[2px] rounded-[2px]"
                          style={{ backgroundColor: colors.text }}
                        />
                        <div
                          className="w-[2px] h-[2px] rounded-[2px]"
                          style={{ backgroundColor: colors.text }}
                        />
                        <div
                          className="w-[2px] h-[2px] rounded-[2px]"
                          style={{ backgroundColor: colors.text }}
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
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
