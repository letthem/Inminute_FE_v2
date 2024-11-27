import React, { useState } from 'react';
import todoMint from '@/assets/webps/Note/todoMint.webp';
import { ToDoByMember } from '@/pages/Note/dto';
import { checkToDo } from '@/apis/Note/patchNote';

interface ToDoItemProps {
  name: string; // 사용자 이름
  tasks: ToDoByMember[]; // 할 일 리스트
  ids: number[]; // 고유 ID 리스트
  isDoneList: boolean[]; // 각 작업의 완료 상태
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ name, tasks, ids, isDoneList }) => {
  const [clickedTasks, setClickedTasks] = useState<number[]>(ids.filter((_, i) => isDoneList[i])); // 초기 상태는 완료된 작업

  const handleClick = async (id: number) => {
    const isAlreadyClicked = clickedTasks.includes(id);
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      console.error(`${id} 가 없습니다.`);
      return;
    }

    try {
      // API 호출
      await checkToDo(id, task.content, !isAlreadyClicked);

      // UI 상태 업데이트
      setClickedTasks(
        (prev) =>
          isAlreadyClicked
            ? prev.filter((taskId) => taskId !== id) // 이미 클릭된 항목은 제거
            : [...prev, id] // 새로 클릭된 항목 추가
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
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
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start">
              <div
                onClick={() => handleClick(task.id)}
                className={`${
                  clickedTasks.includes(task.id) ? 'bg-white' : 'bg-transparent'
                } transition-all duration-200 ease-in-out min-w-[10px] h-[10px] mt-[7px] mr-[18px] rounded-full border-[1px] border-white cursor-pointer`}
              />
              <li>{task.content}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
