import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL
  withCredentials: true, // 쿠키를 사용하기 위해 설정
});
