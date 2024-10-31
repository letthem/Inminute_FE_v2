import { NoteDetail } from '@/pages/Note/dto';

interface OneLineSummaryProps {
  noteData: NoteDetail | null;
}

export const OneLineSummary: React.FC<OneLineSummaryProps> = ({ noteData }) => {
  if (!noteData?.summary) {
    return <></>;
  }
  return (
    <section className="mt-5 ml-12">
      <div className="mr-[120px] max-w-[865px] rounded-[10px] bg-[#ECECEC]">
        <p className="font-[350] text-[13.5px] font-pretendard leading-[24.3px] py-[14px] px-[20px]">
          {noteData.summary}
        </p>
      </div>
    </section>
  );
};
