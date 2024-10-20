import { atom } from 'recoil';

export const isMemberState = atom<boolean | null>({
  key: 'isMemberState',  // 고유한 키
  default: null,  // 초기값: null (로딩 상태)
});

export const userNameState = atom<string>({
  key: 'userNameState', // 고유한 key값
  default: '', // 초기값은 빈 문자열
});