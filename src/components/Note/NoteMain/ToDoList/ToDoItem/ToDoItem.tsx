import React from 'react';
import todoMint from '@/assets/webps/Note/todoMint.webp';

interface ToDoItemProps {
  name: string;
  tasks: string[];
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ name, tasks }) => {
  return (
    <div className="w-[200px] relative mr-[48px] mb-[40px]">
      <img
        src={todoMint}
        alt="todo mint"
        className="absolute top-[-12px] left-[92.5px] w-[15.5px] h-[22px] z-10"
      />
      <div className="bg-mainBlack rounded-[10px] flex flex-col">
        <p className="font-bold text-white text-[13px] leading-[14px] mt-6 mb-6 mx-auto">{name}</p>
        <ul className="text-white font-[300] font-pretendard text-[12px] list-outside list-disc ml-8 mr-5 mb-[18px] leading-[24px] tracking-[0.008rem]">
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
