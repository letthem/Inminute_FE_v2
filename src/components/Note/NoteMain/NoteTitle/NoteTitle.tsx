import calendarBlack from '@/assets/webps/Note/calendarBlack.webp';
import timeBlack from '@/assets/webps/Note/timeBlack.webp';

export const NoteTitle = () => {
  return (
    <section className="flex flex-col">
      <p className="text-[26px] font-bold mt-[30px] ml-12 mr-[120px] leading-[30px]">
        브랜드 아이덴티티 전략 회의
      </p>

      <div className="flex ml-[49px] mt-[13px] items-center mb-2">
        <div className="flex items-center">
          <img src={calendarBlack} alt="calendarBlack" className="w-[14px] h-[14px]" />
          <span className="h-4 ml-[6px] text-[10px] font-medium leading-4">24.05.07</span>
        </div>
        <div className="ml-5 flex items-center">
          <img src={timeBlack} alt="timeBlack" className="w-[14px] h-[14px]" />
          <span className="h-4 ml-[6px] text-[10px] font-medium leading-4">1:19:05</span>
        </div>
      </div>
    </section>
  );
};
