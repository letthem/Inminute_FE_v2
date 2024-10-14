import { JoinModal } from '@/components/Login/JoinModal/JoinModal';
import { NavBar } from '@/components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 쿼리 파라미터에서 source 값을 확인하여 소셜 로그인 이후 리다이렉트인지 확인
    const params = new URLSearchParams(location.search);
    const source = params.get('source');

    console.log('쿼리 파라미터 확인:', source); // 디버깅을 위해 쿼리 파라미터 값 확인

    // source가 'login'이면 JoinModal을 열기
    if (source === 'login') {
      setIsJoinModalOpen(true);
    }
  }, [location]);

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
        {isJoinModalOpen && <JoinModal onClose={() => setIsJoinModalOpen(false)} />}
      </section>
    </>
  );
};
