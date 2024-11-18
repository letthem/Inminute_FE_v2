export interface SummaryByMember {
  username: string;
  summary: string;
}

export interface NoteDetail {
  id: number;
  name: string;
  createdAt: string;
  script: string | null;
  uuid: string;
  summary: string | null;
  summaryByMemberList: SummaryByMember[];
}
