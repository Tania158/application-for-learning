import { IBackendErrorInterface } from "./backendError.interface";
import { ICourseData } from "./courseData.interface";

export interface ICoursesStateInterface {
  isLoading: boolean;
  error: IBackendErrorInterface | null;
  data: ICourseData[] | null;
  currentPage: number;
}