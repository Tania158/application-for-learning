import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { IBackendErrorInterface } from 'src/app/shared/types/backendError.interface';
import { ICourseData } from 'src/app/shared/types/courseData.interface';
import { getCoursesAction, setPage } from '../store/action/getCourses.action';
import { coursesDataSelector, errorCoursesSelector, isLoadingCoursesSelector, setPageSelector } from '../store/selectors';
import { environment } from '../../../../environments/environment';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-preview-courses',
  templateUrl: './preview-courses.component.html',
  styleUrls: ['./preview-courses.component.scss']
})
export class PreviewCoursesComponent implements OnInit, OnDestroy {

  isLoading$!: Observable<boolean>;
  error$!: Observable<IBackendErrorInterface | null>;

  allCoursesSub!: Subscription;
  currentPageSub!: Subscription;

  allCourses!: ICourseData[]
  totalCourses!: number;
  totalPages!: number;
  pages!: number[];
  pageSise = environment.limit;
  currentPage!: number;

  constructor(private store: Store<AppStateInterface>, private utilService: UtilsService) { }

  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.allCoursesSub.unsubscribe();
    this.currentPageSub.unsubscribe();
  }

  fetchData(): void {
    this.store.dispatch(getCoursesAction())
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingCoursesSelector));
    this.error$ = this.store.pipe(select(errorCoursesSelector));
  }

  initializeListeners(): void {
    this.allCoursesSub = this.store
      .pipe(select(coursesDataSelector))
      .subscribe((response: ICourseData[] | null) => {
        if (response) {
          const allCourses = response;
          this.totalCourses = response.length;
          this.currentPageSub = this.store
            .pipe(select(setPageSelector))
            .subscribe((response: number) => {
              this.currentPage = response;
              this.getVisibleCourses(allCourses);
            });
        }
      });
  }

  getVisibleCourses(allCourses: ICourseData[]): void {
    this.totalPages = Math.ceil(this.totalCourses / this.pageSise);
    this.pages = this.utilService.range(1, this.totalPages);
    const startIndex = (this.currentPage - 1) * this.pageSise;
    const endIndex = startIndex + this.pageSise;
    const allCoursesVisible = allCourses.slice(startIndex, endIndex);
    this.allCourses = allCoursesVisible;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.store.dispatch(setPage({ pageNumber: this.currentPage - 1 }));
    }
  }

  nextPage() {
    this.store.dispatch(setPage({ pageNumber: this.currentPage + 1 }));
  }

  pageChanged(page: number): void {
    this.store.dispatch(setPage({ pageNumber: page }));
  }
}
