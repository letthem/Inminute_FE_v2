import { checkMemberStatus } from '@/apis/Member/checkMember';
import { LoginModal } from '@/components/Login/LoginModal/LoginModal';
import { JoinModal } from '@/components/Login/JoinModal/JoinModal';
import { isMemberState } from '@/recoil/atoms/authState';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const NavBar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isMember = useRecoilValue(isMemberState); // 회원 상태 확인
  const setIsMember = useSetRecoilState(isMemberState); // 회원 상태 업데이트 함수

  const isAbout = currentPath === '/';

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

  // 네비게이션 제어
  const handleNavigation = (path: string) => {
    if (!isMember && path !== '/') {
      // 회원이 아닌 상태에서 'ABOUT' 페이지를 제외한 다른 페이지에 접근 시 로그인 모달을 띄움
      if (path === '/home' || path === '/calendar') {
        openLoginModal();
      }
    } else {
      nav(path); // 네비게이션 진행
    }
  };

  // 회원 상태 확인
  useEffect(() => {
    checkMemberStatus(setIsMember); // 회원 상태 체크할 때 상태 업데이트 함수 전달
  }, [setIsMember]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get('source');
    const redirectUuid = params.get('redirect');

    // uuid가 있으면 LocalStorage에 저장
    if (redirectUuid) {
      localStorage.setItem('redirectUuid', redirectUuid); // LocalStorage에 uuid 저장
    }

    // 로그인이 안 된 상태면 로그인 모달을 열기
    if (!isMember && redirectUuid) {
      setIsLoginModalOpen(true); // LoginModal 열기
    }

    if (isMember) {
      if (source === 'login') {
        setIsJoinModalOpen(true);
      } else {
        // 로그인 후에 uuid가 있으면 해당 노트 페이지로 리다이렉트
        const storedUuid = localStorage.getItem('redirectUuid');
        if (storedUuid) {
          nav(`/note/${storedUuid}`); // 로그인 후 노트 페이지로 이동
          localStorage.removeItem('redirectUuid'); // 사용 후 uuid 삭제
        }
      }
    }
  }, [location, isMember, setIsMember, nav]);

  return (
    <>
      <header>
        <div
          className={`fixed w-screen flex font-nanum leading-[22px] z-10 bg-bg justify-between
          ${isAbout && 'static bg-sub2Black'} `}
        >
          <ul className={`flex ml-9 mt-12 mb-4 ${isAbout && 'ml-[26px]'}`}>
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`${isAbout && 'ml-[30px] text-gray06 hover:text-white'} ${isAbout && currentPath === item.path && 'text-white'} ml-8 flex flex-col cursor-pointer font-bold text-[20px] transition-all duration-300 transform ${
                  currentPath === item.path ? 'text-mainBlack' : 'text-gray03 hover:text-mainBlack'
                } hover:scale-[102%] active:scale-100`}
                onClick={() => handleNavigation(item.path)}
              >
                <span>{item.label}</span>
                {currentPath === item.path && (
                  <div
                    className={`mt-2 h-[2px] w-[${item.width}] bg-mainBlack ${isAbout && 'bg-white'} transition-all duration-300`}
                  />
                )}
              </li>
            ))}
          </ul>
          {!isMember && isAbout && (
            <div
              onClick={openLoginModal}
              className="w-[93px] h-[38px] bg-mainBlack rounded-[3.2px] flex justify-center items-center cursor-pointer mt-[42px] mr-12"
            >
              <span className="text-white text-[13px] font-medium">로그인 하기</span>
            </div>
          )}
        </div>
      </header>
      <section>
        <div className="w-[1158px] h-[661px]"></div>
      </section>

      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      {isJoinModalOpen && <JoinModal onClose={() => setIsJoinModalOpen(false)} />}
    </>
  );
};
