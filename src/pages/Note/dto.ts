export interface NoteDetail {
  id: number;
  name: string;
  summary: string | null;
  createdAt: string;
  script: string | null;
  uuid: string;
}
