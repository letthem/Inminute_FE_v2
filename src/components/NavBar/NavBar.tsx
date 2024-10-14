import { LoginModal } from '@/components/Login/LoginModal/LoginModal';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navItems = [
    { path: '/', label: '회의록', width: '57px' },
    { path: '/calendar', label: '캘린더', width: '57px' },
    { path: '/about', label: 'ABOUT', width: '77px' },
  ];

  // 로그인 하기 클릭하면 LoginModal 열기
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // 모달 외부 클릭 시 LoginModal 닫기 - props로 전달
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <header>
        <div
          className={`flex font-nanum leading-[22px] z-10 ${currentPath === '/about' ? 'bg-transparent' : 'bg-bg'} justify-between`}
        >
          <ul
            className={`flex ${currentPath === '/about' ? 'ml-[15px] mt-11' : 'ml-9 mt-12'}  mb-4`}
          >
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`ml-8 flex flex-col cursor-pointer font-bold text-[20px] transition-all duration-300 transform ${
                  currentPath === item.path ? 'text-mainBlack' : 'text-gray03 hover:text-mainBlack'
                } hover:scale-[102%] active:scale-100`}
                onClick={() => nav(item.path)}
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
          {currentPath === '/about' && (
            <div
              onClick={openLoginModal}
              className="w-[93px] h-[38px] bg-mainBlack rounded-[3.2px] flex justify-center items-center cursor-pointer mt-10 mr-12"
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
