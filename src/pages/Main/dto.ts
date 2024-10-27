export interface CardData {
  uuid: string;
  date: string;
  title: string;
  createdAt: string;
  summary: string;
  folder: string;
}

export interface NoteResponse {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  summary: string | null;
  folderName: string;
}
