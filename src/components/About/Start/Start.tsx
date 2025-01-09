import { useNavigate } from 'react-router-dom';
import { useMemberStatus, useNickNameStatus } from '@/apis/Member/hooks';
import right from '@/assets/svgs/About/right.svg';

export const Start = () => {
  const { data: isMember } = useMemberStatus(); // 회원 여부
  const { data: isNickName } = useNickNameStatus(); // 닉네임 여부
  const nav = useNavigate();

  // 시작하기 버튼 클릭 로직
  const handleStartClick = () => {
    if (!isMember) {
      nav('/login');
    } else if (!isNickName) {
      nav('/join');
    } else {
      nav('/home'); // 로그인 및 닉네임 완료 시 /home 이동
    }
  };

  return (
    <article>
      <section className="bg-bg flex justify-center ph:pb-[120px] s960:pb-[340px]">
        <div
          onClick={handleStartClick}
          className="bg-subBlack ph:w-[147px] ph:h-[42px] s510:w-[176px] s510:h-[47px] s960:w-[316.5px] s960:h-[88px] rounded-[60px] flex justify-center items-center cursor-pointer"
        >
          <span className="text-white font-[700] leading-[180%] ph:text-[10px] s510:text-[13px] s960:text-[22px] ph:mr-2 s960:mr-[14px]">
            Inminute 시작하기
          </span>
          <img
            src={right}
            alt="right"
            className="ph:w-[12px] s510:w-[15px] s960:w-[26px] s960:h-[20px]"
          />
        </div>
      </section>
    </article>
  );
};
