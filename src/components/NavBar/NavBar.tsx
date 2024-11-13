import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemberStatus, useNickNameStatus } from '@/apis/Member/hooks';
import { LoginModal } from '@/components/Login/LoginModal/LoginModal';
import { JoinModal } from '@/components/Login/JoinModal/JoinModal';

export const NavBar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const { data: isMember } = useMemberStatus(); // 회원 상태
  const { data: isNickName } = useNickNameStatus(); // 닉네임 상태
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isAbout = currentPath === '/';
  const isHome = currentPath.startsWith('/home');

  const navItems = [
    { path: '/home', label: '회의록', width: '57px' },
    { path: '/calendar', label: '캘린더', width: '57px' },
    { path: '/', label: 'ABOUT', width: '77px' },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectUuid = params.get('uuid') || localStorage.getItem('redirectUuid');
    const isFirst = localStorage.getItem('isFirst');

    // 비회원이 note/{uuid} 접근 시
    if (!isMember && redirectUuid) {
      localStorage.setItem('redirectUuid', redirectUuid); // UUID를 LocalStorage에 저장
      setIsLoginModalOpen(true); // 로그인 모달 열기
      nav('/'); // '/'로 리다이렉트
    }
    // source가 'login'일 경우 (= isFirst 가 true : localStorage) JoinModal 띄우기
    if (isMember && !isNickName && isFirst === 'true') {
      setIsJoinModalOpen(true);
      localStorage.removeItem('isFirst'); // 모달을 띄운 후 플래그 삭제
    }
  }, [isMember, isNickName, location, nav]);

  // 로그인 및 닉네임 설정 완료 시 원래 노트 페이지로 리다이렉트
  useEffect(() => {
    const redirectUuid = localStorage.getItem('redirectUuid');
    if (isMember && isNickName && redirectUuid) {
      nav(`/note/${redirectUuid}`);
      localStorage.removeItem('redirectUuid'); // 로드 후 uuid 삭제
    }
  }, [isMember, isNickName, nav]);

  const handleNavigation = (path: string) => {
    if (!isMember && path !== '/') {
      setIsLoginModalOpen(true);
    } else if (!isNickName && path !== '/') {
      setIsJoinModalOpen(true);
    } else {
      nav(path);
    }
  };

  return (
    <>
      <header>
        <div
          className={`fixed w-screen flex font-nanum leading-[22px] z-10 bg-bg justify-between
          ${isAbout && 'relative bg-sub2Black'} `}
        >
          <ul className={`flex ml-9 mt-12 mb-4 ${isAbout && 'ml-[26px]'}`}>
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (isHome && item.path === '/home');

              const textColor =
                isAbout && item.path === '/'
                  ? 'text-white'
                  : isActive
                    ? 'text-mainBlack'
                    : 'text-gray03 hover:text-mainBlack';

              return (
                <li
                  key={item.path}
                  className={`${isAbout && 'ml-[30px] text-gray06 hover:text-white'} 
                  ${textColor}
                  ml-8 flex flex-col cursor-pointer font-bold text-[20px] transition-all duration-300 transform`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <div
                      className={`mt-2 h-[2px] w-[${item.width}] bg-mainBlack ${isAbout && 'bg-white'} transition-all duration-300`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      {isLoginModalOpen && !isMember && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      {isJoinModalOpen && isMember && !isNickName && <JoinModal onClose={() => setIsJoinModalOpen(false)} />}
    </>
  );
};
