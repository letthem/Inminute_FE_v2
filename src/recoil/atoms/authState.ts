import { atom } from 'recoil';

export const isMemberState = atom<boolean | null>({
  key: 'isMemberState', // 고유한 키
  default: null, // 초기값: null (로딩 상태)
});

export const isNickNameState = atom<boolean | null>({
  key: 'isNickNameState',
  default: null,
});
