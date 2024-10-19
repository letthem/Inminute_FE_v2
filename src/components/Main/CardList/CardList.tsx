import { CardItem } from '@/components/Main/CardList/CardItem/CardItem';

interface CardData {
  date: string;
  title: string;
  summary: string;
  folder: string;
}

interface CardListProps {
  cards: CardData[];
}

export const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <>
      <div className="absolute mt-[192px] w-[calc(100vw-280px)] h-4 bg-gradient-to-b from-bg to-transparent" />
      <div className="overflow-y-auto scrollbar-hide">
        <div className="ml-[72px] mr-[92px] gap-y-6 gap-x-6 s10:max-w-[calc(840px)] s13:max-w-[calc(100vw-444px)] mt-4 mb-10 grid grid-cols-1 s10:grid-cols-2 s13:grid-cols-3">
          {cards.map((card, index) => (
            <CardItem
              key={index}
              date={card.date}
              title={card.title}
              summary={card.summary}
              folder={card.folder}
            />
          ))}
        </div>
      </div>
    </>
  );
};
