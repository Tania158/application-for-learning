import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { IBackendErrorInterface } from 'src/app/shared/types/backendError.interface';
import { ICourseData } from 'src/app/shared/types/courseData.interface';
import { getCoursesAction } from '../store/action/getCourses.action';
import { coursesDataSelector, errorCoursesSelector, isLoadingCoursesSelector } from '../store/selectors';

@Component({
  selector: 'app-preview-courses',
  templateUrl: './preview-courses.component.html',
  styleUrls: ['./preview-courses.component.scss']
})
export class PreviewCoursesComponent implements OnInit {

  allCourses$!: Observable<ICourseData[] | null>
  isLoading$!: Observable<boolean>;
  error$!: Observable<IBackendErrorInterface | null>;

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
  }

  fetchData(): void {
    this.store.dispatch(getCoursesAction())
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingCoursesSelector));
    this.error$ = this.store.pipe(select(errorCoursesSelector));
    this.allCourses$ = this.store.pipe(select(coursesDataSelector));
  }
}
