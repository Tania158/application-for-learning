import { IBackendError } from "./backendError.interface";
import { ICourseData } from "./courseData.interface";

export interface ICoursesStateInterface {
  isLoading: boolean;
  error: IBackendError | null;
  data: ICourseData[] | null;
  currentPage: number;
}