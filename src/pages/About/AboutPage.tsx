import { NavBar } from '@/components/NavBar/NavBar';
import { useEffect, useState } from 'react';

export const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // 페이지 로드 시 애니메이션 트리거
  }, []);

  return (
    <>
      <section
        className={`flex flex-col w-full h-full transition-opacity duration-500 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <NavBar />
        About 페이지입니다.
      </section>
    </>
  );
};
