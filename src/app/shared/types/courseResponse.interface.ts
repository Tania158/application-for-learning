import { ICourseData } from "./courseData.interface";

export interface ILessons {
  id: string,
  title: string,
  duration: number,
  order: number,
  type: string,
  status: string,
  link: string,
  previewImageLink: string,
  meta: null
}

export interface ICourseResponse extends ICourseData {
  lessons: ILessons[],
  containsLockedLessons: boolean;
}