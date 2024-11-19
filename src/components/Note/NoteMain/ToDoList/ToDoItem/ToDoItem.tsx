import React, { useState } from 'react';
import todoMint from '@/assets/webps/Note/todoMint.webp';
import { ToDoItem as TaskItem } from '@/pages/Note/dto';

interface ToDoItemProps {
  name: string; // 사용자 이름
  tasks: TaskItem[]; // 할 일 리스트
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ name, tasks }) => {
  const [clickedTasks, setClickedTasks] = useState<number[]>([]); // 클릭된 항목의 ID 추적 (배열)

  // 항목 클릭 핸들러
  const handleClick = (index: number) => {
    setClickedTasks((prev) => {
      if (prev.includes(index)) {
        // 이미 선택된 항목이면 선택 해제
        return prev.filter((id) => id !== index);
      } else {
        // 선택되지 않은 항목이면 추가
        return [...prev, index];
      }
    });
  };

  return (
    <div className="w-[230px] relative mr-[48px] mb-[40px]">
      <img
        src={todoMint}
        alt="todo mint"
        className="absolute top-[-12px] left-[108px] w-[15.5px] h-[22px] z-10"
      />
      <div className="bg-mainBlack rounded-[10px] flex flex-col">
        <p className="font-bold text-white text-[13px] leading-[14px] mt-6 mb-6 mx-auto">{name}</p>
        <ul className="text-white font-[300] font-pretendard text-[12px] list-none ml-[26px] mr-8 mb-[18px] leading-[24px] tracking-[0.008rem]">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-start">
              <div
                onClick={() => handleClick(index)}
                className={`${clickedTasks.includes(index) ? 'bg-white' : 'bg-transparent'} min-w-[10px] h-[10px] mt-[7px] mr-[18px] rounded-full border-[1px] border-white cursor-pointer`}
              />
              <li>{task.todo}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
