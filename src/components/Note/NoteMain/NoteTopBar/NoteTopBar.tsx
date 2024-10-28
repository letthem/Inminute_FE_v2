import { useNavigate } from 'react-router-dom';
import leftBlack from '@/assets/webps/Note/leftBlack.webp';
import kebab from '@/assets/webps/Note/kebab.webp';
import { NoteDetail } from '@/pages/Note/dto';

interface NoteTopBarProps {
  noteData: NoteDetail | null;
}

export const NoteTopBar: React.FC<NoteTopBarProps> = () => {
  const nav = useNavigate();

  return (
    <section className="flex justify-between mt-10">
      <img
        src={leftBlack}
        alt="back button"
        className="w-[18px] h-[18px] cursor-pointer ml-9"
        onClick={() => nav(-1)}
      />
      <div className="px-2 mr-[18px] cursor-pointer">
        <img src={kebab} alt="kebab menu" className="h-[18.2px]" />
      </div>
    </section>
  );
};
