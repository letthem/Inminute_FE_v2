import { useNavigate } from 'react-router-dom';
import leftBlack from '@/assets/webps/Note/leftBlack.webp';
import kebab from '@/assets/webps/Note/kebab.webp';

export const NoteTopBar = () => {
  const nav = useNavigate();
  return (
    <section className="flex justify-between mt-10">
      <img
        src={leftBlack}
        alt="back button"
        className="w-[18px] h-[18px] cursor-pointer ml-9"
        onClick={() => nav(-1)}
      />
      <img
        src={kebab}
        alt="kebab menu"
        className="w-[18px] h-[18px] mr-[26px] px-2 cursor-pointer"
      />
    </section>
  );
};
