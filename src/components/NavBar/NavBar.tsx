import { useNavigate, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: '회의록', width: '57px' },
    { path: '/calendar', label: '캘린더', width: '57px' },
    { path: '/about', label: 'ABOUT', width: '77px' },
  ];

  return (
    <header>
      <div
        className={`flex font-nanum leading-[22px] z-10 ${currentPath === '/about' ? 'bg-transparent' : 'bg-bg'} justify-between`}
      >
        <ul className="flex ml-9 mt-12 mb-4">
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
          <div className="w-[102px] h-[42px] bg-mainBlack rounded-[3.2px] flex justify-center items-center cursor-pointer mt-10 mr-11">
            <span className="text-white text-[14px] font-medium">로그인 하기</span>
          </div>
        )}
      </div>
    </header>
  );
};
