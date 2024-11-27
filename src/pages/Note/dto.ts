export interface SummaryByMember {
  nickname: string;
  summary: string;
}

export interface ToDoByMember {
  id: number;
  uuid: string;
  username: string;
  nickname: string;
  content: string;
  isDone: boolean;
}

export interface NoteDetail {
  id: number;
  name: string;
  createdAt: string;
  script: string | null;
  uuid: string;
  summary: string | null;
  summaryByMemberList: SummaryByMember[];
  toDoResponseList: ToDoByMember[];
}
