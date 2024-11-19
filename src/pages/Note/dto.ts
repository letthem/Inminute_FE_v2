export interface SummaryByMember {
  nickname: string;
  summary: string;
}

export interface ToDoItem {
  todo: string;
}

export interface ToDoByMember {
  nickname: string;
  toDoLists: ToDoItem[];
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
