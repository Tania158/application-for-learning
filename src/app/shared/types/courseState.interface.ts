import { IBackendErrorInterface } from "./backendError.interface";
import { ICourseResponse } from "./courseResponse.interface";

export interface ICourseDataStateInterface {
  isLoading: boolean;
  error: IBackendErrorInterface | null;
  data: ICourseResponse | null;
}