import search from '@/assets/webps/Main/search.webp';
import notePlus from '@/assets/webps/Main/notePlus.webp';
import down from '@/assets/webps/Main/downBlack.webp';

export const MainTopBar = () => {
  return (
    <section>
      <div className="h-24 flex justify-between items-center font-nanum leading-[22px] z-10 bg-bg">
        <div className="w-[100px] h-12 ml-[72px] flex items-center bg-white border border-gray03 rounded-[20px]">
          <img className="w-[22px] h-[22px] ml-4" src={search} alt="search" />
          <div className="w-[56px] h-[22px] mr-[6px] cursor-text" />
        </div>
        <div className="flex items-center">
          <div className="w-[68px] h-[22px] mr-6 flex items-center cursor-pointer">
            <span className="w-[40px] mr-2 font-medium text-[14px]">최신순</span>
            <img className="w-5 h-5" src={down} alt='down'/>
          </div>
          <div className="w-[123px] h-[38px] mr-[72px] bg-mainBlack flex items-center rounded cursor-pointer">
            <img className="w-[18px] h-[18px] ml-[14px]" src={notePlus} alt="note plus" />
            <span className="w-[69px] text-[13px] font-medium text-white ml-[8px]">
              새 회의 노트
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
