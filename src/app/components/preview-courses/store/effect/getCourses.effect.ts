import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { PreviewCoursesService } from "src/app/shared/services/preview-courses.service";
import { ICourseData } from "src/app/shared/types/courseData.interface";
import { getCoursesAction, getCoursesFailureAction, getCoursesSuccesAction } from "../action/getCourses.action";

@Injectable()
export class GetCoursesEffect {

  constructor(
    private previewCoursesService: PreviewCoursesService,
    private actions$: Actions
  ) { }
  
  getCourses$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getCoursesAction),
      switchMap(() => {
        return this.previewCoursesService.getAllCourses().pipe(
          map((response: ICourseData[]) => {
            return getCoursesSuccesAction({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getCoursesFailureAction({errors: errorResponse.error}));
          })
        )
      })
    )
  )
}