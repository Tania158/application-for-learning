import { createAction, props } from "@ngrx/store";
import { IBackendError } from "src/app/shared/types/backendError.interface";
import { ICourseData } from "src/app/shared/types/courseData.interface";
import { ActionTypes } from "../actionTypes";

export const getCoursesAction = createAction(
  ActionTypes.GET_COURSES
);

export const getCoursesSuccesAction = createAction(
  ActionTypes.GET_COURSES_SUCCESS,
  props<{ response: ICourseData[] }>()
);

export const getCoursesFailureAction = createAction(
  ActionTypes.GET_COURSES_FAILURE,
  props<{ errors: IBackendError }>()
);

export const setPage = createAction(
  ActionTypes.SET_PAGE,
  props<{ pageNumber: number }>()
);