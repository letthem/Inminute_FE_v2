import { FolderBar } from '@/components/FolderBar/FolderBar';
import { NavBar } from '@/components/NavBar/NavBar';

export const MainPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-bg">
        <FolderBar />
        <section className="flex flex-col w-[calc(100vw-280px)] h-full">
          <NavBar />
          Main 페이지입니다.
        </section>
      </div>
    </>
  );
};
