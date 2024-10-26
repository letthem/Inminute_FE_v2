import { useQuery } from 'react-query';
import { checkMemberStatus } from '@/apis/Member/checkMember';
import { getMemberInfo } from '@/apis/Member/getMemberInfo';

// 회원 상태 가져오기
export const useMemberStatus = () => {
  return useQuery('isMember', checkMemberStatus, { staleTime: 600000 });
};

// 닉네임 상태 가져오기
export const useNickNameStatus = () => {
  return useQuery('isNickName', async () => {
    const data = await getMemberInfo();
    return data?.nickname !== null; // 닉네임이 있을 경우 true 반환, 없을 경우 false 반환
  });
};
