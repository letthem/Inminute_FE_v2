// CardList.tsx

import { CardItem } from '@/components/Main/CardList/CardItem/CardItem';

const cardData = [
  {
    date: '24.05.07',
    title: '해커톤 정기회의 2차',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새로운 브랜드화했다.',
    folder: '학교',
  },
  {
    date: '24.06.15',
    title: '플로우 회의',
    summary: '다양한 마케팅 전략을 통해 브랜드 인지도를 높이는 방안을 논의',
    folder: '학교',
  },
  {
    date: '24.07.10',
    title: '브랜드 아이덴티티 전략 회의',
    summary:
      '새로운 브랜드의 핵심 가치와 시각적 요소를 정의하는 전략을 수립하고 새로운 브랜드의 핵심 가치를 새롭게 브랜드화했다. 새로운 브랜드의 핵심 가치와 시각적 요소를',
    folder: '직장',
  },
];

export const CardList = () => {
  return (
    <div className="overflow-y-auto scrollbar-hide">
      <div className="ml-[72px] mr-[92px] mt-4 mb-10 grid grid-cols-3 gap-x-[28px] gap-y-6">
        {cardData.map((card, index) => (
          <CardItem key={index} {...card} />
        ))}
      </div>
    </div>
  );
};
