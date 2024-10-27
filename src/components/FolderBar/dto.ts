export interface Note {
  id: number;
  name: string;
  createdAt: Date;
}

export interface Folder {
  id: number;
  name: string;
  create_at: Date;
  notes: Note[];
}

export interface UnassignedNote {
  id: number;
  name: string;
  createdAt: Date;
}
