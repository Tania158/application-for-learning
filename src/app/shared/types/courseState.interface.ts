import { IBackendError } from "./backendError.interface";
import { ICourseResponse } from "./courseResponse.interface";

export interface ICourseDataStateInterface {
  isLoading: boolean;
  error: IBackendError | null;
  data: ICourseResponse | null;
}