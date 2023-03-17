import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { ICourseData } from "src/app/shared/types/courseData.interface";
import { ICoursesStateInterface } from "src/app/shared/types/coursesState.interface";

export const coursesFeatureSelector = (
  state: AppStateInterface
): ICoursesStateInterface => state.allCourses;

export const isLoadingCoursesSelector = createSelector(
  coursesFeatureSelector,
  (coursesState: ICoursesStateInterface) => coursesState.isLoading
);

export const errorCoursesSelector = createSelector(
  coursesFeatureSelector,
  (coursesState: ICoursesStateInterface) => coursesState.error
);

export const coursesDataSelector = createSelector(
  coursesFeatureSelector,
  (coursesState: ICoursesStateInterface) => coursesState.data
);

export const setPageSelector = createSelector(
  coursesFeatureSelector,
  (coursesState: ICoursesStateInterface) => coursesState.currentPage
);