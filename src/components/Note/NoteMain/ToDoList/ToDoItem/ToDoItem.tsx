import React, { useEffect, useRef, useState } from 'react';
import todoMint from '@/assets/webps/Note/todoMint.webp';
import { ToDoByMember } from '@/pages/Note/dto';
import { patchToDo } from '@/apis/Note/patchNote';

interface ToDoItemProps {
  name: string; // 사용자 이름
  tasks: ToDoByMember[]; // 할 일 리스트
  ids: number[]; // 고유 ID 리스트
  isDoneList: boolean[]; // 각 작업의 완료 상태
  isEditing: boolean; // 수정 가능 상태
  setIsEditing: (editing: boolean) => void; // 수정 상태 종료를 부모에게 알리는 함수
}

export const ToDoItem: React.FC<ToDoItemProps> = ({
  name,
  tasks,
  ids,
  isDoneList,
  isEditing,
  setIsEditing,
}) => {
  const [clickedTasks, setClickedTasks] = useState<number[]>(ids.filter((_, i) => isDoneList[i])); // 초기 상태는 완료된 작업
  const [editedTasks, setEditedTasks] = useState<string[]>(tasks.map((task) => task.content)); // 초기 ToDo 내용 상태
  const textareaRef = useRef<HTMLTextAreaElement[]>([]); // 여러 `textarea` 참조 관리

  // 완료 체크 처리
  const handleCheck = async (id: number) => {
    const isAlreadyClicked = clickedTasks.includes(id);
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      console.error(`${id} 가 없습니다.`);
      return;
    }

    await patchToDo(id, task.content, !isAlreadyClicked);

    // UI 상태 업데이트
    setClickedTasks(
      (prev) =>
        isAlreadyClicked
          ? prev.filter((taskId) => taskId !== id) // 이미 클릭된 항목은 제거
          : [...prev, id] // 새로 클릭된 항목 추가
    );
  };

  // 수정 저장 처리
  const handleEditBlur = async (id: number, index: number) => {
    const task = tasks.find((task) => task.id === id);

    if (task && editedTasks[index] !== task.content) {
      await patchToDo(id, editedTasks[index], task.isDone); // api
      // 수정 UI 반영
      const updatedTasks = [...tasks];
      updatedTasks[index].content = editedTasks[index];
      setEditedTasks(updatedTasks.map((task) => task.content));
    }
    setIsEditing(false);
  };

  // textarea 높이 조정
  const adjustTextareaHeight = (index: number) => {
    const ref = textareaRef.current[index];
    if (ref) {
      ref.style.height = '24px'; // 초기 높이 설정 (li 태그 높이)
      ref.style.height = `${ref.scrollHeight}px`; // scrollHeight 기반으로 조정
    }
  };

  // textarea 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const updatedTasks = [...editedTasks];
    updatedTasks[index] = e.target.value;
    setEditedTasks(updatedTasks);
    adjustTextareaHeight(index); // 높이 조정
  };

  // 엔터키 처리
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    id: number,
    index: number
  ) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      e.preventDefault(); // 줄바꿈 방지
      handleEditBlur(id, index); // 수정 저장
      e.currentTarget.blur(); // 포커스 해제
    }
  };

  // 컴포넌트가 렌더링될 때 높이 초기화
  useEffect(() => {
    if (isEditing) {
      tasks.forEach((_, index) => {
        adjustTextareaHeight(index); // 각 textarea 높이 조정
      });
    }
  }, [isEditing, tasks]);

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
            <div key={task.id} className="flex items-start">
              <div
                onClick={() => handleCheck(task.id)}
                className={`${
                  clickedTasks.includes(task.id) ? 'bg-white' : 'bg-transparent'
                } transition-all duration-200 ease-in-out min-w-[10px] h-[10px] mt-[7px] mr-[18px] rounded-full border-[1px] border-white cursor-pointer`}
              />
              {isEditing ? (
                <textarea
                  ref={(el) => (textareaRef.current[index] = el!)} // 각 `textarea` 참조 저장
                  value={editedTasks[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onBlur={() => handleEditBlur(task.id, index)}
                  onKeyDown={(e) => handleKeyDown(e, task.id, index)}
                  className="bg-transparent resize-none outline-none w-full leading-[24px] text-[12px]"
                  style={{ height: '24px' }} // 기본 높이 설정
                />
              ) : (
                <li className="leading-[24px]">{task.content}</li>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
