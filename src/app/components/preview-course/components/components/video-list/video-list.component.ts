import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ILessons } from 'src/app/shared/types/courseResponse.interface';
import { VideoPlaylistService } from '../../services/video-playlist.service';
import { VideoTimeService } from '../../services/video-time.service';
import { VideoService } from '../../services/video.service';

@UntilDestroy()
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  @Input('courseLesson') courseLessonProps!: ILessons[];

  public playNext!: boolean;
  public videoEnded!: boolean;
  public videoList: ({
    name: string,
    selected: boolean,
    duration: number,
    order: number,
    status: string,
    id: string
  })[] = [];
  private list: ILessons[] = [];
  private activeVideo = 0;

  constructor(
    private videoService: VideoService,
    private videoPlaylistService: VideoPlaylistService
  ) {}

  public ngOnInit(): void {
    this.videoPlaylistService.list$
      .pipe(untilDestroyed(this))
      .subscribe(list => (this.list = list));
    this.videoPlaylistService.currentVideo$
      .pipe(untilDestroyed(this))
      .subscribe(currentVideo => {
      this.videoList = this.list.map(item => ({
        name: item.title,
        selected: item.link === currentVideo,
        duration: item.duration,
        order: item.order,
        status: item.status,
        id: item.id
      }));
    });
    this.videoPlaylistService.fetchList(this.courseLessonProps);
    this.videoPlaylistService
      .shouldPlayNext$
      .pipe(untilDestroyed(this))
      .subscribe(playNext => (this.playNext = playNext));
    this.videoService.videoEnded$
      .pipe(untilDestroyed(this))
      .subscribe(ended => {
      if (this.playNext && ended) {
        this.videoPlaylistService.playNextVideo();
        this.videoService.play();
      }
      });
  }

  public playIt(index: number): void {
    if (this.videoList[index].status === 'unlocked') {
      this.videoPlaylistService.setCurrentVideoByIndex(index);
      this.videoService.play();
      this.activeVideo = index;
    }
    return;
  }

  public onChange(): void {
    this.playNext = !this.playNext;
    this.videoPlaylistService.setShouldPlayNext(this.playNext);
  }
}
