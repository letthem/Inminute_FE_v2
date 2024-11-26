import chat from '@/assets/webps/Note/chat.webp';
import { SummaryBySpeakerItem } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerItem/SummaryBySpeakerItem';
import { NoteDetail, SummaryByMember } from '@/pages/Note/dto';
import edit from '@/assets/webps/FolderBar/editBlack.webp';

interface SummaryBySpeakerProps {
  noteData?: NoteDetail | null; // 기존 noteData
  summaryBySpeaker?: SummaryByMember[]; // DB에서 가져온 화자별 요약
}

export const SummaryBySpeakerList: React.FC<SummaryBySpeakerProps> = ({
  noteData,
  summaryBySpeaker,
}) => {
  const speakers = summaryBySpeaker?.length ? summaryBySpeaker : noteData?.summaryByMemberList || [];

  const filteredSpeakers = speakers?.filter((speaker) => speaker.summary);

  // 데이터가 없는 경우 아무것도 렌더링하지 않음
  if (!filteredSpeakers || filteredSpeakers.length === 0) {
    return <></>;
  }

  return (
    <section className="ml-12 mt-[74px]">
      <div className="flex mb-5 items-center">
        <img src={chat} alt="chat icon" className="w-5 h-5 mr-[6px]" />
        <span className="font-bold">화자별 요약</span>
        <img src={edit} alt="edit" className="w-[14px] h-[14px] ml-2 cursor-pointer" />
      </div>

      {filteredSpeakers.map((speaker, index) => (
        <SummaryBySpeakerItem key={index} name={speaker.nickname} summary={speaker.summary} />
      ))}
    </section>
  );
};
