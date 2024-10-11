import chat from '@/assets/webps/Note/chat.webp';
import { SummaryBySpeakerItem } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerItem/SummaryBySpeakerItem';

const speakerSummaries = [
  {
    name: '심수연',
    summary:
      '브랜드 아이덴티티는 명확한 비전과 일관된 메시지가 중요하며, 고객 경험과 직접적으로 연결되어야 한다고 강조',
  },
  {
    name: '박상욱',
    summary:
      '고객 세분화를 기반으로 한 맞춤형 마케팅이 타겟 고객의 욕구에 부합하는 브랜드 메시지 전달에 필수적이라고 언급',
  },
  {
    name: '노태일',
    summary: '브랜드 인지도를 높이기 위해 간결하면서도 강렬한 비주얼 아이덴티티가 중요하다고 주장',
  },
  {
    name: '유재인',
    summary:
      '브랜드 철학이 제품에 일관되게 반영되어, 고객이 제품을 통해 브랜드 경험을 직관적으로 느껴야 한다고 강조',
  },
  {
    name: '곽민우',
    summary:
      '브랜드 가치를 소셜 미디어 등 디지털 채널을 통해 꾸준히 전달하는 것이 고객 접점에서의 브랜드 인식에 중요하다고 설명',
  },
];

export const SummaryBySpeakerList = () => {
  return (
    <section className="ml-12 mt-[74px]">
      <div className="flex mb-5 items-center">
        <img src={chat} alt="chat icon" className="w-5 h-5 mr-[6px]" />
        <span className="font-bold">화자별 요약</span>
      </div>

      {speakerSummaries.map((speaker, index) => (
        <SummaryBySpeakerItem key={index} name={speaker.name} summary={speaker.summary} />
      ))}
    </section>
  );
};
