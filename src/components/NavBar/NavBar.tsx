import { useNavigate, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: '회의록', width: '62px' },
    { path: '/calendar', label: '캘린더', width: '62px' },
    { path: '/about', label: 'ABOUT', width: '84px' },
  ];

  return (
    <header>
      <div className="flex font-nanum leading-[22px] z-10 bg-bg">
        <ul className="flex ml-9 mt-12 mb-4">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`ml-9 flex flex-col cursor-pointer font-bold text-[22px] transition-all duration-300 transform ${
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
      </div>
    </header>
  );
};
