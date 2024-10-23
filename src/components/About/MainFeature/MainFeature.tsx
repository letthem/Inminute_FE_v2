import { TextItem } from '@/components/About/MainFeature/TextItem/TextItem';
import demo1 from '@/assets/svgs/About/demo1.svg';

const textItems = [
  {
    feature: '실시간 스크립트 작성',
    desc1: '모든 회의 내용을 실시간으로 기록해줘요.',
    desc2: '내가 한 말과 다르다면 수정할 수 있어요.',
  },
  {
    feature: '회의 한 줄 요약',
    desc1: '회의 전체 내용을 한 줄로 깔끔하게 정리해드려요.',
    desc2: '수정하고 싶다면 자유롭게 편집할 수 있어요.',
  },
  {
    feature: '화자별 요약',
    desc1: 'AI가 발언 내용을 화자별로 요약해줘요.',
    desc2: '팀원의 의견이 어땠는지 확인해보세요.',
  },
  {
    feature: 'TO DO',
    desc1: '회의 참여자별 해야 할 일을',
    desc2: '메모지로 간편하게 확인하고 체크해요 !',
  },
];

export const MainFeature = () => {
  return (
    <article className="flex flex-col bg-sub2Black">
      <div className="flex">
        <div>
          <div className="sticky top-[23%] transform translate-y-[0%]">
            <img
              src={demo1}
              alt="demo animation"
              className="max-w-[850px] max-h-[451px] ml-[149px]"
            />
          </div>
        </div>
        <section className="ml-[188.5px] h-auto">
          {textItems.map((textItem, index) => (
            <TextItem
              key={index}
              feature={textItem.feature}
              desc1={textItem.desc1}
              desc2={textItem.desc2}
            />
          ))}
        </section>
      </div>
      <div className="h-[262px]" />
    </article>
  );
};
