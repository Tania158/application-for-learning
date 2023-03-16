import { IBackendErrorInterface } from "./backendError.interface";
import { ICourseData } from "./courseData.interface";

export interface ICourseStateInterface {
  isLoading: boolean;
  error: IBackendErrorInterface | null;
  data: ICourseData[] | null;
}