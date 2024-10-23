import Lottie from 'lottie-react';
import aboutTitle from '@/assets/lotties/aboutTitle.json';

export const Title = () => {
  return (
    <article className="bg-sub2Black">
      <div className="s10:mx-[117px] mt-[144px] s10:w-[967px] mb-[252px]">
        <Lottie animationData={aboutTitle} loop={false} />
      </div>
    </article>
  );
};
