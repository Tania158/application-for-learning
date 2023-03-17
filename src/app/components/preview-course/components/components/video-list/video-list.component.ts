import { Component, OnInit } from '@angular/core';
import { ILessons } from 'src/app/shared/types/courseResponse.interface';
import { VideoPlaylistService } from '../../services/video-playlist.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  public playNext!: boolean;
  public videoEnded!: boolean;
  public videoList: ({ name: string, selected: boolean })[] = [];
  private list: ILessons[] = [];
  private activeVideo = 0;

  constructor(
    private videoService: VideoService,
    private videoPlaylistService: VideoPlaylistService
  ) {}

  public ngOnInit() {
    this.videoPlaylistService.list$.subscribe(list => (this.list = list));
    this.videoPlaylistService.currentVideo$.subscribe(currentVideo => {
      this.videoList = this.list.map(item => ({
        name: item.title,
        selected: item.link === currentVideo
      }));
    });
    // this.videoPlaylistService.fetchList('./assets/playlist.json');
    this.videoPlaylistService
      .shouldPlayNext$
      .subscribe(playNext => (this.playNext = playNext));
    this.videoService.videoEnded$.subscribe(ended => {
      if (this.playNext && ended) {
        this.videoPlaylistService.playNextVideo();
        this.videoService.play();
      }
    });
  }

  public playIt(index: number): void {
    this.videoPlaylistService.setCurrentVideoByIndex(index);
    this.videoService.play();
    this.activeVideo = index;
  }

  public onChange(): void {
    this.playNext = !this.playNext;
    this.videoPlaylistService.setShouldPlayNext(this.playNext);
  }
}