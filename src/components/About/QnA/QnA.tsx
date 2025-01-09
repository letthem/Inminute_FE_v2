import { Cards } from '@/components/About/QnA/Cards/Cards';

export const QnA = () => {
  return (
    <article className="w-screen flex flex-col items-center relative">
      <h2 className="mt-[56px] s960:mt-[96px] s1400:mt-[112px] text-mainBlack font-[800] leading-[170%] text-[22px] s960:text-[46px] s1400:text-[52px]">
        Q&A
      </h2>
      <div className="w-[54px] h-[2px] s960:w-[112px] s1400:w-[126px] s960:h-[5px] bg-mainBlack mt-[-4px]" />
      <Cards />
    </article>
  );
};
