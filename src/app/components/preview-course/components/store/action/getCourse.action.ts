import { createAction, props } from "@ngrx/store";
import { IBackendError } from "src/app/shared/types/backendError.interface";
import { ICourseResponse } from "src/app/shared/types/courseResponse.interface";
import { ActionTypes } from "../actionTypes";

export const getCourseDataAction = createAction(
  ActionTypes.GET_COURSE_DATA,
  props<{ courseId: string }>()
);

export const getCourseDataSuccesAction = createAction(
  ActionTypes.GET_COURSE_DATA_SUCCESS,
  props<{ response: ICourseResponse }>()
);

export const getCourseDataFailureAction = createAction(
  ActionTypes.GET_COURSE_DATA_FAILURE,
  props<{ errors: IBackendError }>()
);