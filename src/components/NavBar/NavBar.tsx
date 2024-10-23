import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { checkMemberStatus } from '@/apis/Member/checkMember';
import { getMemberInfo } from '@/apis/Member/getMemberInfo';
import { isMemberState, isNickNameState } from '@/recoil/atoms/authState';
import { LoginModal } from '@/components/Login/LoginModal/LoginModal';
import { JoinModal } from '@/components/Login/JoinModal/JoinModal';

export const NavBar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const isMember = useRecoilValue(isMemberState); // 회원 상태 확인
  const isNickName = useRecoilValue(isNickNameState); // 닉네임 상태 확인
  const setIsMember = useSetRecoilState(isMemberState); // 회원 상태 업데이트 함수
  const setIsNickName = useSetRecoilState(isNickNameState); // 닉네임 상태 업데이트 함수
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isAbout = currentPath === '/';

  const navItems = [
    { path: '/home', label: '회의록', width: '57px' },
    { path: '/calendar', label: '캘린더', width: '57px' },
    { path: '/', label: 'ABOUT', width: '77px' },
  ];

  // 네비게이션 제어
  const handleNavigation = (path: string) => {
    if (!isMember && path !== '/') {
      if (path === '/home' || path === '/calendar') {
        setIsLoginModalOpen(true);
      }
    } else {
      nav(path); // 네비게이션 진행
    }
  };

  const getNickNameState = async () => {
    try {
      const data = await getMemberInfo();
      setIsNickName(!!data?.nickname); // 닉네임이 있으면 true, 없으면 false
    } catch (error) {
      console.error('회원 정보 가져오는 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get('source');
    const redirectUuid = params.get('redirect');

    // 회원 상태 체크
    checkMemberStatus(setIsMember);

    // 닉네임 상태 체크
    getNickNameState();

    if (isMember) {
      // 로그인 시도 중이거나 닉네임이 없는 경우 JoinModal을 연다
      if (source === 'login' || !isNickName) {
        setIsJoinModalOpen(true);
      } else if (redirectUuid) {
        // 로그인 후 링크 공유된 노트로 이동
        nav(`/note/${redirectUuid}`);
        localStorage.removeItem('redirectUuid');
        setIsJoinModalOpen(false); // 리다이렉트가 완료되면 모달을 닫는다
      } else {
        // 닉네임이 있고 리다이렉트가 없을 경우 홈으로 이동
        nav('/home');
        setIsJoinModalOpen(false); // 홈으로 이동할 때 모달을 닫는다
      }
    } else if (!isMember && redirectUuid) {
      // 로그인이 안 된 상태에서 링크 공유된 노트 접근 시 로그인 모달 열기
      setIsLoginModalOpen(true);
      localStorage.setItem('redirectUuid', redirectUuid);
      setIsJoinModalOpen(false); // 로그인 모달이 열렸으므로 JoinModal은 닫는다
    } else {
      // 회원이 아니고 리다이렉트도 없는 경우 모달 닫기
      setIsJoinModalOpen(false);
    }
  }, [isMember, isNickName, location, nav, setIsMember, setIsNickName]);

  return (
    <>
      <header>
        <div
          className={`fixed w-screen flex font-nanum leading-[22px] z-10 bg-bg justify-between
          ${isAbout && 'relative bg-sub2Black'} `}
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
        </div>
      </header>

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      {isJoinModalOpen && <JoinModal onClose={() => setIsJoinModalOpen(false)} />}
    </>
  );
};
