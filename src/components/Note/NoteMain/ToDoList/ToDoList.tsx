import todo from '@/assets/webps/Note/todo.webp';
import { ToDoItem } from '@/components/Note/NoteMain/ToDoList/ToDoItem/ToDoItem';

const todoData = [
  {
    name: '심수연',
    tasks: ['브랜딩 레퍼런스 찾기', '카드뉴스 만들기', '추후 프로젝트 이름 고민해오기'],
  },
  {
    name: '박상욱',
    tasks: ['브랜딩 레퍼런스 찾기'],
  },
  {
    name: '노태일',
    tasks: ['브랜딩 레퍼런스 찾기', '카드뉴스 만들기'],
  },
  {
    name: '심수연',
    tasks: ['브랜딩 레퍼런스 찾기', '카드뉴스 만들기', '추후 프로젝트 이름 고민해오기'],
  },
];

export const ToDoList = () => {
  return (
    <section className="mt-[92px] ml-12">
      <div className="flex items-center">
        <img src={todo} alt="todo icon" className="w-5 h-5 mr-[6px]" />
        <span className="font-extrabold text-[15px]">TO DO</span>
      </div>
      <div className="flex flex-wrap mt-[28px] mb-[46px] mr-[120px]">
        {todoData.map((todo, index) => (
          <ToDoItem key={index} name={todo.name} tasks={todo.tasks} />
        ))}
      </div>
    </section>
  );
};
