import { ICoursesStateInterface } from "./coursesState.interface";
import { ICourseDataStateInterface } from "./courseState.interface";

export interface AppStateInterface {
  allCourses: ICoursesStateInterface;
  course: ICourseDataStateInterface;
}