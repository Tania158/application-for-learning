import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { IBackendError } from 'src/app/shared/types/backendError.interface';
import { ICourseData } from 'src/app/shared/types/courseData.interface';
import { getCoursesAction, setPage } from '../store/action/getCourses.action';
import { coursesDataSelector, errorCoursesSelector, isLoadingCoursesSelector, setPageSelector } from '../store/selectors';
import { environment } from '../../../../environments/environment';
import { UtilsService } from 'src/app/shared/services/utils.service';
import HLS from 'hls.js';

@Component({
  selector: 'app-preview-courses',
  templateUrl: './preview-courses.component.html',
  styleUrls: ['./preview-courses.component.scss']
})
export class PreviewCoursesComponent implements OnInit, OnDestroy {

  isLoading$!: Observable<boolean>;
  error$!: Observable<IBackendError | null>;

  allCoursesSub!: Subscription;
  currentPageSub!: Subscription;

  allCourses!: ICourseData[]
  totalCourses!: number;
  totalPages!: number;
  pages!: number[];
  pageSise = environment.limit;
  currentPage!: number;
  private hls = new HLS();


  @ViewChild('videoElement') videoElement!: ElementRef;

  constructor(
    private store: Store<AppStateInterface>,
    private utilService: UtilsService
  ) { }

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

  previousPage(): void {
    if (this.currentPage > 1) {
      this.store.dispatch(setPage({ pageNumber: this.currentPage - 1 }));
      window.scrollTo(0, 0);
    }
  }

  nextPage(): void {
    this.store.dispatch(setPage({ pageNumber: this.currentPage + 1 }));
    window.scrollTo(0, 0);
  }

  pageChanged(page: number): void {
    this.store.dispatch(setPage({ pageNumber: page }));
    window.scrollTo(0, 0);
  }

  showVideo(course: ICourseData, event: MouseEvent): void {
    if (course.meta.courseVideoPreview) {
      const container = event.target as HTMLElement;
      const videoElement = container.querySelector('video') as HTMLVideoElement;
      const video = this.videoElement.nativeElement as HTMLVideoElement;
      videoElement.src = video.src;
      const hls = new HLS();
      hls.attachMedia(videoElement);
      hls.loadSource(course.meta.courseVideoPreview.link);
      videoElement.style.display = 'block';
      videoElement.play();
    }
  }

  hideVideo(event: MouseEvent): void {
    const container = event.target as HTMLElement;
    const videoElement = container.querySelector('video') as HTMLVideoElement;
    const video = this.videoElement.nativeElement as HTMLVideoElement;
    videoElement.src = video.src;
    videoElement.style.display = 'none';
    videoElement.pause();
  }
}