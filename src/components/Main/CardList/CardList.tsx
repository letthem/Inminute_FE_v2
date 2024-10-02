import { CardItem } from '@/components/Main/CardList/CardItem/CardItem';

export const CardList = () => {
  return (
    <div className="overflow-y-auto scrollbar-hide">
      <div className="ml-[72px] mr-[92px] mt-4 mb-10 grid grid-cols-3 gap-x-[28px] gap-y-6">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </div>
  );
};
