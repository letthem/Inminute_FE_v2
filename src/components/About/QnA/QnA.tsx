import { Cards } from '@/components/About/QnA/Cards/Cards';

export const QnA = () => {
  return (
    <article className="w-screen flex flex-col items-center relative">
      <h2 className="mt-[112px] text-mainBlack font-[800] leading-[170%] text-[52px]">Q&A</h2>
      <div className="w-[126px] h-[5px] bg-mainBlack mt-[-4px]" />
      <Cards />
    </article>
  );
};
