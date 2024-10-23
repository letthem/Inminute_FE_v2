import { useEffect, useState } from 'react';
import { NavBar } from '@/components/NavBar/NavBar';
import { Title } from '@/components/About/Title';
import { MainFeature } from '@/components/About/MainFeature/MainFeature';
import { SubFeature } from '@/components/About/SubFeature/SubFeature';
import right from '@/assets/svgs/About/right.svg';
export const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // about 페이지 로드 시 애니메이션 트리거
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <main
        className={`font-nanum flex flex-col w-screen h-screen transition-opacity duration-500 ease-in-out overflow-y-auto scrollbar-hide ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <NavBar />
        <Title />
        <MainFeature />
        <SubFeature />
        <section className="bg-bg flex justify-center pb-[277px]">
          <div className="bg-subBlack w-[374px] h-[98px] rounded-[60px] flex justify-center items-center cursor-pointer">
            <span className="text-white font-[700] leading-[180%] text-[28px] mr-[14px]">
              Inminute 시작하기
            </span>
            <img src={right} alt="right" className="w-[32px] h-[25px]" />
          </div>
        </section>
      </main>
    </>
  );
};
