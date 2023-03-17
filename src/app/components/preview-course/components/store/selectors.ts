import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { ICourseDataStateInterface } from "src/app/shared/types/courseState.interface";

export const courseFeatureSelector = (
  state: AppStateInterface
): ICourseDataStateInterface => state.course;

export const isLoadingCourseSelector = createSelector(
  courseFeatureSelector,
  (courseState: ICourseDataStateInterface) => courseState.isLoading
);

export const errorCourseSelector = createSelector(
  courseFeatureSelector,
  (courseState: ICourseDataStateInterface) => courseState.error
);

export const courseDataSelector = createSelector(
  courseFeatureSelector,
  (courseState: ICourseDataStateInterface) => courseState.data
);