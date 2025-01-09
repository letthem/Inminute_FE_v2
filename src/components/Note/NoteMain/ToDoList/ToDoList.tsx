import React, { useState } from 'react';
import todo from '@/assets/webps/Note/todo.webp';
import editBlack from '@/assets/webps/FolderBar/editBlack.webp';
import editGray from '@/assets/webps/FolderBar/editGray.webp';
import { ToDoItem } from '@/components/Note/NoteMain/ToDoList/ToDoItem/ToDoItem';
import { NoteDetail, ToDoByMember } from '@/pages/Note/dto';

interface ToDoListProps {
  noteData?: NoteDetail | null; // 기존 NoteData
  toDoByMembers?: ToDoByMember[]; // DB에서 가져온 To Do 데이터
}

const groupByNickname = (toDoResponseList: ToDoByMember[]) => {
  return toDoResponseList
    .filter((item) => item.nickname) // nickname이 null 또는 빈 문자열인 항목 필터링
    .reduce(
      (acc, item) => {
        if (!acc[item.nickname]) {
          acc[item.nickname] = [];
        }
        acc[item.nickname].push(item);
        return acc;
      },
      {} as Record<string, ToDoByMember[]>
    );
};

export const ToDoList: React.FC<ToDoListProps> = ({ noteData, toDoByMembers }) => {
  const toDoData = toDoByMembers?.length ? toDoByMembers : noteData?.toDoResponseList || [];

  const [isEditing, setIsEditing] = useState(false); // 전체 수정 가능 상태

  // 데이터가 없는 경우 아무것도 렌더링하지 않음
  if (!toDoData || toDoData.length === 0) {
    return <></>;
  }

  const groupedData = groupByNickname(toDoData);

  return (
    <section className="mt-[92px] ml-12">
      <div className="flex items-center">
        <img src={todo} alt="todo icon" className="w-5 h-5 mr-[6px]" />
        <span className="font-extrabold text-[15px]">TO DO</span>
        <img
          src={isEditing ? editGray : editBlack}
          alt="edit"
          className="w-[14px] h-[14px] ml-2 cursor-pointer"
          onClick={() => setIsEditing((prev) => !prev)} // 수정 가능 상태 토글
        />
      </div>
      <div className="flex flex-wrap mt-[28px] mb-[46px] mr-[120px]">
        {Object.entries(groupedData).map(([nickname, tasks], index) => {
          const ids = tasks.map((task) => task.id); // nickname에 해당하는 고유 ID 리스트
          const isDoneList = tasks.map((task) => task.isDone); // 해당 nickname의 각 ToDo의 완료 상태

          return (
            <ToDoItem
              key={index}
              name={nickname}
              tasks={tasks}
              ids={ids}
              isDoneList={isDoneList}
              isEditing={isEditing} // 수정 가능 상태 전달
              setIsEditing={setIsEditing}
            />
          );
        })}
      </div>
    </section>
  );
};
