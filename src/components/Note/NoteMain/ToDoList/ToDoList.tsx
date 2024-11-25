import todo from '@/assets/webps/Note/todo.webp';
import { ToDoItem } from '@/components/Note/NoteMain/ToDoList/ToDoItem/ToDoItem';
import edit from '@/assets/webps/FolderBar/editBlack.webp';
import { NoteDetail, ToDoByMember } from '@/pages/Note/dto';

interface ToDoListProps {
  noteData: NoteDetail | null;
}

const groupByNickname = (toDoResponseList: ToDoByMember[]) => {
  return toDoResponseList.reduce(
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

export const ToDoList: React.FC<ToDoListProps> = ({ noteData }) => {
  if (!noteData?.toDoResponseList) {
    return <></>;
  }

  const groupedData = groupByNickname(noteData.toDoResponseList);

  return (
    <section className="mt-[92px] ml-12">
      <div className="flex items-center">
        <img src={todo} alt="todo icon" className="w-5 h-5 mr-[6px]" />
        <span className="font-extrabold text-[15px]">TO DO</span>
        <img src={edit} alt="edit" className="w-[14px] h-[14px] ml-2 cursor-pointer" />
      </div>
      <div className="flex flex-wrap mt-[28px] mb-[46px] mr-[120px]">
        {Object.entries(groupedData).map(([nickname, tasks], index) => (
          <ToDoItem key={index} name={nickname} tasks={tasks} />
        ))}
      </div>
    </section>
  );
};
