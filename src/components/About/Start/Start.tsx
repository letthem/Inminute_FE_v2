import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { checkMemberStatus } from '@/apis/Member/checkMember';
import { getMemberInfo } from '@/apis/Member/getMemberInfo';
import { isMemberState, isNickNameState } from '@/recoil/atoms/authState';
import { LoginModal } from '@/components/Login/LoginModal/LoginModal';
import { JoinModal } from '@/components/Login/JoinModal/JoinModal';
import right from '@/assets/svgs/About/right.svg';

export const Start = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const isMember = useRecoilValue(isMemberState); // 로그인 여부 확인
  const isNickName = useRecoilValue(isNickNameState); // 닉네임 여부 확인
  const setIsMember = useSetRecoilState(isMemberState); // 로그인 상태 업데이트
  const setIsNickName = useSetRecoilState(isNickNameState); // 닉네임 상태 업데이트 함수
  const nav = useNavigate();

  // 버튼 클릭 시 로그인 및 닉네임 모달을 제어
  const handleStartClick = () => {
    if (!isMember) {
      setIsLoginModalOpen(true); // 로그인 모달 열기
    } else if (!isNickName) {
      setIsJoinModalOpen(true); // 닉네임 모달 열기
    } else {
      nav('/home'); // 로그인, 닉네임 완료 시 회의록 페이지로 이동
    }
  };

  // 닉네임 상태 체크 함수
  const getNickNameState = async () => {
    try {
      const data = await getMemberInfo();
      setIsNickName(!!data?.nickname); // 닉네임이 있으면 true, 없으면 false
    } catch (error) {
      console.error('Error fetching member info:', error);
    }
  };

  // 회원 상태 확인 및 닉네임 상태 확인
  useEffect(() => {
    checkMemberStatus(setIsMember);
    getNickNameState();
  }, [setIsMember, setIsNickName]);

  return (
    <>
      <section className="bg-bg flex justify-center pb-[277px]">
        {!isMember && (
          <div
            onClick={handleStartClick}
            className="bg-subBlack w-[374px] h-[98px] rounded-[60px] flex justify-center items-center cursor-pointer"
          >
            <span className="text-white font-[700] leading-[180%] text-[28px] mr-[14px]">
              Inminute 시작하기
            </span>
            <img src={right} alt="right" className="w-[32px] h-[25px]" />
          </div>
        )}
      </section>

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      {isJoinModalOpen && <JoinModal onClose={() => setIsJoinModalOpen(false)} />}
    </>
  );
};
