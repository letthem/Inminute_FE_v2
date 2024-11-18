import { useState } from 'react';
import { addMonths, subMonths, isSameMonth, getWeekOfMonth, getWeeksInMonth } from 'date-fns';
import { NavBar } from '@/components/NavBar/NavBar';
import { DetailModal } from '@/components/Calendar/DetailModal/DetailModal';
import { YearAndMonth } from '@/components/Calendar/YearAndMonth/YearAndMonth';
import { Days } from '@/components/Calendar/Days/Days';
import { CalendarGrid } from '@/components/Calendar/CalendarGrid/CalendarGrid';

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 모달에 보여줄 선택된 날짜
  const [selectedDatePosition, setSelectedDatePosition] = useState<{
    top: number;
    right: number;
  } | null>(null);

  const toggleModal = (date: Date, event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSameMonth(date, currentMonth)) return; // 이번 달이 아닌 날짜 클릭 시 함수 종료

    // 날짜 클릭 위치 가져오기
    const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
    const isLastWeek = getWeekOfMonth(date) === getWeeksInMonth(currentMonth);

    // 마지막 주 클릭 시 뜨는 모달은 위로 보이게 조정
    setSelectedDatePosition({
      top: isLastWeek ? rect.top + window.scrollY - 92 : rect.top + window.scrollY + 40,
      right: window.innerWidth - rect.right,
    });
    setSelectedDate(new Date(date));
  };

  const closeModal = () => {
    setSelectedDate(null);
    setSelectedDatePosition(null);
  };

  return (
    <section className="flex flex-col w-full h-full overflow-y-auto scrollbar-hide">
      <NavBar />
      <div className="mt-[96px] mx-[4.2%] flex flex-col items-center font-nanum leading-[22px]">
        {/* YYYY.MM */}
        <YearAndMonth
          currentMonth={currentMonth}
          onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
          onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
        />
        {/* 요일 */}
        <Days />
        {/* 날짜 */}
        <CalendarGrid
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          onDateClick={toggleModal}
        />
      </div>
      {/* 선택한 날짜 상세 회의 일정 모달 */}
      {selectedDate && selectedDatePosition && (
        <DetailModal
          selectedDate={selectedDate}
          position={selectedDatePosition}
          onClose={closeModal}
        />
      )}
    </section>
  );
};
