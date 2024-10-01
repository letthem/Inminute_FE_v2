import { FolderBar } from '@/components/FolderBar/FolderBar';
import { MainTopBar } from '@/components/Main/MainTopBar/MainTopBar';
import { NavBar } from '@/components/NavBar/NavBar';
import noteMint from '@/assets/webps/Main/noteMint.webp';

export const MainPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-bg font-nanum leading-[22px]">
        <FolderBar />
        <section className="flex flex-col w-[calc(100vw-280px)] h-full">
          <NavBar />
          <MainTopBar />
          <div className="flex flex-col items-center justify-center">
            <img className="w-[147px] h-[154px] mt-[136px]" src={noteMint} alt="note" />
            <p className='mt-[27.5px] text-mainBlack font-medium text-[15px]'>회의 노트를 추가해보세요 !</p>
          </div>
        </section>
      </div>
    </>
  );
};
