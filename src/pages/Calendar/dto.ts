import { ColorGroup } from '@/constants/colorPalette';

export interface Schedule {
  id: number; 
  name: string; 
  color: ColorGroup;
  startDateTime: string;
}
