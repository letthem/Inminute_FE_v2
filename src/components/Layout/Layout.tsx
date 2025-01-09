import React from 'react';
import { FolderBar } from '@/components/FolderBar/FolderBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-row bg-bg font-nanum leading-[22px]">
      <FolderBar />
      {children}
    </div>
  );
};

export default Layout;
