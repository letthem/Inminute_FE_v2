export interface CardData {
  date: string;
  title: string;
  summary: string;
  folder: string;
}

export interface NoteResponse {
  id: number;
  name: string;
  createdAt: string;
  summary: string | null;
  folderName: string;
}
