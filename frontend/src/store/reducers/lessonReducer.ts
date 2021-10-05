export interface ILesson {
  id: number;
  title: string;
  description: string;
  numbering: number;
  file: string[];
  body: string;
  watched: boolean;
  block: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  homeworks: any[]
}
