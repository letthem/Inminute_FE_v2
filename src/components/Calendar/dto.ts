import { ColorGroup } from '@/constants/colorPalette';

export interface Schedule {
  id: number; // ID 추가 (필요에 따라)
  name: string; // 회의 제목
  color: ColorGroup; // 색상 그룹 이름
  startDateTime: string; // 시작 시간 (ISO 문자열)
}
