import { useEffect, useState } from 'react';
import { NavBar } from '@/components/NavBar/NavBar';
import { Title } from '@/components/About/Title';
import { MainFeature } from '@/components/About/MainFeature/MainFeature';
import { SubFeature } from '@/components/About/SubFeature/SubFeature';
import { Start } from '@/components/About/Start/Start';

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
        <Start />
      </main>
    </>
  );
};
