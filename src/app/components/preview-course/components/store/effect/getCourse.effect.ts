import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { PreviewCoursesService } from "src/app/shared/services/preview-courses.service";
import { ICourseResponse } from "src/app/shared/types/courseResponse.interface";
import { getCourseDataAction, getCourseDataSuccesAction, getCourseDataFailureAction } from '../action/getCourse.action';

@Injectable()
export class GetCourseEffect {

  constructor(
    private previewCoursesService: PreviewCoursesService,
    private actions$: Actions
  ) { }
  
  getCourse$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getCourseDataAction),
      switchMap(({courseId}) => {
        return this.previewCoursesService.getCourseData(courseId).pipe(
          map((response: ICourseResponse) => {
            return getCourseDataSuccesAction({ response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getCourseDataFailureAction({errors: errorResponse.error}));
          })
        )
      })
    )
  )
}