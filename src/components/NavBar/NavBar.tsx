import { checkMemberStatus } from '@/apis/checkMember';
import { LoginModal } from '@/components/Login/LoginModal/LoginModal';
import { isMemberState } from '@/recoil/atoms/authState';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const NavBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isMember = useRecoilValue(isMemberState); // 회원 상태 확인
  const setIsMember = useSetRecoilState(isMemberState); // 회원 상태 업데이트 함수

  const navItems = [
    { path: '/home', label: '회의록', width: '57px' },
    { path: '/calendar', label: '캘린더', width: '57px' },
    { path: '/', label: 'ABOUT', width: '77px' },
  ];

  // 로그인 하기 클릭하면 LoginModal 열기
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // 모달 외부 클릭 시 LoginModal 닫기
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // 회원 상태 확인
  useEffect(() => {
    checkMemberStatus(setIsMember); // 회원 상태 체크할 때 상태 업데이트 함수 전달
  }, [setIsMember]);

  // 네비게이션 제어
  const handleNavigation = (path: string) => {
    if (!isMember && (path === '/home' || path === '/calendar')) {
      // 회원이 아닌 경우 네비게이션 차단 & 로그인 모달 띄워주기
      openLoginModal();
    } else {
      nav(path); // 네비게이션 진행
    }
  };

  return (
    <>
      <header>
        <div className={`fixed w-screen flex font-nanum leading-[22px] z-10 bg-bg justify-between`}>
          <ul className={`flex ml-9 mt-12 mb-4`}>
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`ml-8 flex flex-col cursor-pointer font-bold text-[20px] transition-all duration-300 transform ${
                  currentPath === item.path ? 'text-mainBlack' : 'text-gray03 hover:text-mainBlack'
                } hover:scale-[102%] active:scale-100`}
                onClick={() => handleNavigation(item.path)}
              >
                <span>{item.label}</span>
                {currentPath === item.path && (
                  <div
                    className={`mt-2 h-[2px] w-[${item.width}] bg-mainBlack transition-all duration-300`}
                  />
                )}
              </li>
            ))}
          </ul>
          {currentPath === '/' && (
            <div
              onClick={openLoginModal}
              className="w-[93px] h-[38px] bg-mainBlack rounded-[3.2px] flex justify-center items-center cursor-pointer mt-[42px] mr-12"
            >
              <span className="text-white text-[13px] font-medium">로그인 하기</span>
            </div>
          )}
        </div>
      </header>

      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </>
  );
};
