import { useEffect, useState } from 'react';
import { addMonths, subMonths, isSameMonth, getWeekOfMonth, getWeeksInMonth } from 'date-fns';
import { NavBar } from '@/components/NavBar/NavBar';
import { DetailModal } from '@/components/Calendar/DetailModal/DetailModal';
import { YearAndMonth } from '@/components/Calendar/YearAndMonth/YearAndMonth';
import { Days } from '@/components/Calendar/Days/Days';
import { CalendarGrid } from '@/components/Calendar/CalendarGrid/CalendarGrid';
import { Schedule } from '@/pages/Calendar/dto';
import { getScheduleByMonth } from '@/apis/Calendar/getSchedule';

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 모달에 보여줄 선택된 날짜
  const [selectedDatePosition, setSelectedDatePosition] = useState<{
    top: number | undefined;
    bottom: number | undefined;
    left: number | undefined;
  } | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // 일정 불러오기
  const loadSchedules = async () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const data = await getScheduleByMonth(year, month);
    setSchedules(data);
  };

  useEffect(() => {
    loadSchedules();
  }, [currentMonth]);

  // 일정 추가
  const handleAddSchedule = async (newSchedule: Schedule) => {
    setSchedules((prevSchedules) => [...prevSchedules, newSchedule]); // 상태 업데이트
    loadSchedules();
  };

  // 일정 수정
  const handleEditSchedule = (id: number, updatedName: string) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id ? { ...schedule, name: updatedName } : schedule
      )
    );
  };

  // 일정 삭제
  const handleDeleteSchedule = async (id: number) => {
    setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== id));
  };

  const toggleModal = (date: Date, event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSameMonth(date, currentMonth)) return; // 이번 달이 아닌 날짜 클릭 시 함수 종료

    const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
    const isLastWeek = getWeekOfMonth(date) === getWeeksInMonth(currentMonth);

    // 마지막 주 클릭 시 bottom 기준, 다른 경우 top 기준으로 위치 조정
    setSelectedDatePosition(
      isLastWeek
        ? {
            top: undefined,
            bottom: window.innerHeight - rect.bottom + 40, // bottom 기준
            left: rect.left + rect.width / 2,
          }
        : {
            top: rect.top + window.scrollY + 40, // top 기준
            bottom: undefined,
            left: rect.left + rect.width / 2,
          }
    );

    setSelectedDate(new Date(date));
  };

  const closeModal = () => {
    setSelectedDate(null);
    setSelectedDatePosition(null);
  };

  // 일정 불러오기
  useEffect(() => {
    const loadSchedules = async () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      const data = await getScheduleByMonth(year, month);
      setSchedules(data);
    };

    loadSchedules();
  }, [currentMonth]);

  return (
    <section className="flex flex-col w-full min-h-screen overflow-y-auto scrollbar-hide">
      <NavBar />
      <div className="mt-[96px] mx-[4.2%] flex flex-col items-center font-nanum leading-[22px]">
        {/* YYYY.MM */}
        <YearAndMonth
          currentMonth={currentMonth}
          onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
          onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
          onAddSchedule={handleAddSchedule}
        />
        {/* 요일 */}
        <Days />
        {/* 날짜 */}
        <CalendarGrid
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          schedules={schedules}
          onDateClick={toggleModal}
        />
      </div>
      {/* 선택한 날짜 상세 회의 일정 모달 */}
      {selectedDate && selectedDatePosition && (
        <DetailModal
          selectedDate={selectedDate}
          position={selectedDatePosition}
          onClose={closeModal}
          onEdit={handleEditSchedule} // 수정 핸들러 전달
          onDelete={handleDeleteSchedule} // 삭제 핸들러 전달
        />
      )}
    </section>
  );
};
