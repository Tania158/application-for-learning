import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, pipe, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { IBackendErrorInterface } from 'src/app/shared/types/backendError.interface';
import { ICourseResponse } from 'src/app/shared/types/courseResponse.interface';
import { getCourseDataAction } from '../store/action/getCourse.action';
import { courseDataSelector, errorCourseSelector, isLoadingCourseSelector } from '../store/selectors';
import HLS from 'hls.js';

@Component({
  selector: 'app-preview-course',
  templateUrl: './preview-course.component.html',
  styleUrls: ['./preview-course.component.scss']
})
export class PreviewCourseComponent implements OnInit, OnDestroy {

  courseId!: string;
  isLoading$!: Observable<boolean>;
  error$!: Observable<IBackendErrorInterface | null>;

  courseSub!: Subscription;
  courseData!: ICourseResponse;

  constructor(private store: Store<AppStateInterface>, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.courseSub.unsubscribe();
  }

  fetchData(): void {
    this.store.dispatch(getCourseDataAction({courseId: this.courseId}))
  }

  initializeValues(): void {
    this.courseId = this.route.snapshot.paramMap.get('slug') || '';

    this.isLoading$ = this.store.pipe(select(isLoadingCourseSelector));
    this.error$ = this.store.pipe(select(errorCourseSelector));
  }

  initializeListeners(): void {
    this.courseSub = this.store
      .pipe(select(courseDataSelector))
      .subscribe((response: ICourseResponse | null) => {
        if (response) { 
          this.courseData = response;
        }
      })
    
  }
}
