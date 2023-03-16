import { routerNavigationAction } from "@ngrx/router-store"
import { Action, createReducer, on } from "@ngrx/store"
import { ICourseStateInterface } from "src/app/shared/types/coursesState.interface"
import { getCoursesAction, getCoursesFailureAction, getCoursesSuccesAction } from "./action/getCourses.action"

const initialState: ICourseStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

const coursesReducer = createReducer(
  initialState,
  on(
    getCoursesAction,
    (state): ICourseStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getCoursesSuccesAction,
    (state, action): ICourseStateInterface => ({
      ...state,
      isLoading: false,
      data: action.response,
      error: null,
    })
  ),
  on(
    getCoursesFailureAction,
    (state, action): ICourseStateInterface => ({
      ...state,
      isLoading: false,
      error: action.errors
    })
  ),
  on(
    routerNavigationAction, (): ICourseStateInterface => initialState
  )
)

export function reducers(state: ICourseStateInterface, action: Action) {
  return coursesReducer(state, action)
}