import { useState } from 'react';
import { addMonths, subMonths, isSameMonth } from 'date-fns';
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
    left: number;
  } | null>(null);
  const specialDate = new Date(2024, 10, 15);

  const toggleModal = (date: Date, event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSameMonth(date, currentMonth)) return; // 이번 달이 아닌 날짜 클릭 시 함수 종료
    setSelectedDate(new Date(date));
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    setSelectedDatePosition({
      top: rect.top + window.scrollY + 40,
      left: rect.left + window.scrollX - 42,
    });
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
          currentMonth={currentMonth}
          specialDate={specialDate}
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
