import Lottie from 'lottie-react';
import aboutTitle from '@/assets/lotties/aboutTitle.json';
import { deleteMember } from '@/apis/Member/deleteMember';

export const Title = () => {
  const handleDeleteMember = async () => {
    await deleteMember();
    alert('탈퇴가 완료되었습니다.');
  };

  return (
    <article className="bg-sub2Black w-screen">
      <div className="s1200:mx-[117px] mt-[144px] s10:w-[967px] mb-[292px]">
        <Lottie animationData={aboutTitle} />
        <div
          className="w-8 h-[22px] bg-gray06 rounded-md cursor-pointer"
          onClick={handleDeleteMember}
        >
          탈퇴
        </div>
      </div>
    </article>
  );
};
