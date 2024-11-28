import chat from '@/assets/webps/Note/chat.webp';
import { SummaryBySpeakerItem } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerItem/SummaryBySpeakerItem';
import { NoteDetail, SummaryByMember } from '@/pages/Note/dto';
import editBlack from '@/assets/webps/FolderBar/editBlack.webp';
import editGray from '@/assets/webps/FolderBar/editGray.webp';
import { useState } from 'react';

interface SummaryBySpeakerProps {
  noteData?: NoteDetail | null; // 기존 noteData
  summaryBySpeaker?: SummaryByMember[]; // DB에서 가져온 화자별 요약
}

export const SummaryBySpeakerList: React.FC<SummaryBySpeakerProps> = ({
  noteData,
  summaryBySpeaker,
}) => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 관리

  const speakers = summaryBySpeaker?.length
    ? summaryBySpeaker
    : noteData?.summaryByMemberList || [];

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
        <img
          src={isEditing ? `${editGray}` : `${editBlack}`}
          alt="edit"
          className="w-[14px] h-[14px] ml-2 cursor-pointer"
          onClick={() => setIsEditing(!isEditing)} // 클릭 시 수정 모드 토글
        />
      </div>

      {filteredSpeakers.map((speaker, index) => (
        <SummaryBySpeakerItem
          key={index}
          noteJoinMemberId={speaker.id}
          name={speaker.nickname}
          initialSummary={speaker.summary}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ))}
    </section>
  );
};
