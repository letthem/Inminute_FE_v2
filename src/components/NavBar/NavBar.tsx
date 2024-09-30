import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // 네비게이션 항목 목록
  const navItems = [
    { path: '/', label: '회의록', width: '62px' },
    { path: '/calendar', label: '캘린더', width: '62px' },
    { path: '/about', label: 'ABOUT', width: '84px' },
  ];

  return (
    <header>
      <div className="w-screen h-full flex font-nanum leading-[22px] z-10 bg-bg">
        <ul className="flex ml-9 mt-12 mb-4">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`ml-9 flex flex-col cursor-pointer font-bold text-[22px] ${
                currentPath === item.path ? 'text-mainBlack' : 'text-gray03'
              }`}
              onClick={() => nav(item.path)}
            >
              <span>{item.label}</span>
              {currentPath === item.path && (
                <div className={`mt-2 w-[${item.width}] h-[2px] bg-mainBlack`} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
