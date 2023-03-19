import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICourseResponse } from 'src/app/shared/types/courseResponse.interface';
import { VideoPlaylistService } from '../../services/video-playlist.service';
import { ProgressService } from '../../services/video-progress.service';
import { VideoTimeService } from '../../services/video-time.service';
import { VideoService } from '../../services/video.service';

@UntilDestroy()
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input('courseData') courseDataProps!: ICourseResponse;
  public playing = false;
  public currentProgress = 0;
  public duration = 0;
  public currentTime = 0;
  public label = "Audio volume";
  private videoEnded = false;
  public numberLesson!: number | null;
  public disabled!: boolean;

  constructor(
    private videoService: VideoService,
    private videoTimeService: VideoTimeService,
    private videoPlaylistService: VideoPlaylistService,
    private progressService: ProgressService
  ) {}

  public ngOnInit(): void {
    this.videoService
      .playingState$
      .pipe(untilDestroyed(this))
      .subscribe(playing => (this.playing = playing));
    this.videoTimeService.videoDuration$
      .pipe(untilDestroyed(this))
      .subscribe(
      duration => (this.duration = duration)
    );
    this.videoTimeService.videoProgress$.subscribe(
      progress => {
        (this.currentProgress = progress)
      }
    );
    this.videoService
      .videoEnded$
      .pipe(untilDestroyed(this))
      .subscribe(ended => (this.videoEnded = ended));
    
    this.numberLesson = this.progressService.getCurrentLesson(this.courseDataProps.id);
  }

  public onPlayClick(): void {
    if (this.playing) {
      this.videoService.pause();
    } else {
      this.videoService.play();
    }
  }

  public onNextClick(): void {
    if (!this.disabled) {
      this.videoPlaylistService.playNextVideo();
      this.videoService.play();
    }
    if (this.numberLesson) {
      this.disabled = this.courseDataProps.lessons[this.numberLesson + 1].status === 'locked';
    }
  }

  public onInput(event: MatSliderChange): void {
    this.videoTimeService.setIgnore(true);
    this.videoTimeService.setVideoProgress(event.value ?? 0);
  }

  public onChange(event: MatSliderChange): void {
    this.videoTimeService.setIgnore(false);
    this.videoTimeService.setCurrentTime(event.value ?? 0);
  }

  public onFullscreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      const videoPlayerDiv = document.querySelector('.video-player') as Element;
      if (videoPlayerDiv.requestFullscreen) {
        videoPlayerDiv.requestFullscreen();
      }
    }
  }

  public get iconPlaying(): {name: string, value: string} {
    return this.videoEnded
      ? {
          name: 'Replay',
          value: 'replay'
        }
      : this.playing
      ? {
          name: 'Pause',
          value: 'pause'
        }
      : {
          name: 'Play',
          value: 'play_arrow'
        };
  }

  public ariaLabel(): string {
    return this.label;
  }
}
