import Lottie from 'lottie-react';
import aboutTitle from '@/assets/lotties/aboutTitle.json';

export const Title = () => {
  return (
    <article className="bg-sub2Black w-screen">
      <div className="mx-[12px] s510:mx-[20px] s10:mx-[30px] s1200:mx-[60px] s14:mx-[117px] mt-[144px] s10:w-[967px] mb-[292px]">
        <Lottie animationData={aboutTitle} />
      </div>
    </article>
  );
};
