import { routerNavigationAction } from "@ngrx/router-store"
import { Action, createReducer, on } from "@ngrx/store"
import { ICoursesStateInterface } from "src/app/shared/types/coursesState.interface"
import { getCoursesAction, getCoursesFailureAction, getCoursesSuccesAction, setPage } from './action/getCourses.action';

const initialState: ICoursesStateInterface = {
  isLoading: false,
  error: null,
  data: null,
  currentPage: 1
}

const coursesReducer = createReducer(
  initialState,
  on(
    getCoursesAction,
    (state): ICoursesStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getCoursesSuccesAction,
    (state, action): ICoursesStateInterface => ({
      ...state,
      isLoading: false,
      data: action.response,
      error: null,
    })
  ),
  on(
    getCoursesFailureAction,
    (state, action): ICoursesStateInterface => ({
      ...state,
      isLoading: false,
      error: action.errors
    })
  ),
  on(
    setPage,
    (state, action): ICoursesStateInterface => ({
      ...state,
      isLoading: false,
      error: null,
      currentPage: action.pageNumber
    })
  ),
  on(
    routerNavigationAction, (): ICoursesStateInterface => initialState
  )
)

export function reducers(state: ICoursesStateInterface, action: Action) {
  return coursesReducer(state, action)
}