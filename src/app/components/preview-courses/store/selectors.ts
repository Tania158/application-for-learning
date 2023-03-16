import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { ICourseStateInterface } from "src/app/shared/types/coursesState.interface";

export const coursesFeatureSelector = (
  state: AppStateInterface
): ICourseStateInterface => state.allCourses;

export const isLoadingCoursesSelector = createSelector(
  coursesFeatureSelector,
  (coursesState: ICourseStateInterface) => coursesState.isLoading
);

export const errorCoursesSelector = createSelector(
  coursesFeatureSelector,
  (coursesState: ICourseStateInterface) => coursesState.error
);

export const coursesDataSelector = createSelector(
  coursesFeatureSelector,
  (coursesState: ICourseStateInterface) => coursesState.data
);