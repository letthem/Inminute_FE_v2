import { useNavigate, useLocation } from 'react-router-dom';
import { useMemberStatus, useNickNameStatus } from '@/apis/Member/hooks';

export const NavBar = () => {
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

  const handleNavigation = (path: string) => {
    if (!isMember && path !== '/') {
      nav('/login');
    } else if (!isNickName && path !== '/') {
      nav('/join');
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
    </>
  );
};
