import { routerNavigationAction } from "@ngrx/router-store"
import { Action, createReducer, on } from "@ngrx/store"
import { ICourseDataStateInterface } from "src/app/shared/types/courseState.interface";
import { getCourseDataAction, getCourseDataSuccesAction, getCourseDataFailureAction } from './action/getCourse.action';

const initialState: ICourseDataStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

const courseDataReducer = createReducer(
  initialState,
  on(
    getCourseDataAction,
    (state): ICourseDataStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getCourseDataSuccesAction,
    (state, action): ICourseDataStateInterface => ({
      ...state,
      isLoading: false,
      data: action.response,
      error: null,
    })
  ),
  on(
    getCourseDataFailureAction,
    (state, action): ICourseDataStateInterface => ({
      ...state,
      isLoading: false,
      error: action.errors
    })
  ),
  on(
    routerNavigationAction, (): ICourseDataStateInterface => initialState
  )
)

export function reducers(state: ICourseDataStateInterface, action: Action) {
  return courseDataReducer(state, action)
}