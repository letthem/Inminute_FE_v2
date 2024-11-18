import chat from '@/assets/webps/Note/chat.webp';
import { SummaryBySpeakerItem } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerItem/SummaryBySpeakerItem';
import { NoteDetail } from '@/pages/Note/dto';

interface SummaryBySpeakerProps {
  noteData: NoteDetail | null;
}

export const SummaryBySpeakerList: React.FC<SummaryBySpeakerProps> = ({ noteData }) => {
  if (!noteData?.summaryByMemberList) {
    return <></>;
  }
  return (
    <section className="ml-12 mt-[74px]">
      <div className="flex mb-5 items-center">
        <img src={chat} alt="chat icon" className="w-5 h-5 mr-[6px]" />
        <span className="font-bold">화자별 요약</span>
      </div>

      {noteData.summaryByMemberList.map((speaker, index) => (
        <SummaryBySpeakerItem key={index} name={speaker.username} summary={speaker.summary} />
      ))}
    </section>
  );
};
