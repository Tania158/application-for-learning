import { Component, ElementRef, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import HLS from 'hls.js';
import { ILessons } from 'src/app/shared/types/courseResponse.interface';
import { VideoPlaylistService } from '../../services/video-playlist.service';
import { ProgressService } from '../../services/video-progress.service';
import { VideoTimeService } from '../../services/video-time.service';
import { VideoService } from '../../services/video.service';
import { VolumeService } from '../../services/volume.service';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-video-wrapper',
  templateUrl: './video-wrapper.component.html',
  styleUrls: ['./video-wrapper.component.scss']
})
export class VideoWrapperComponent implements OnInit, OnDestroy {

  public lessonNumber!: number;
  currentTimeSub!: Subscription;
  public loading!: boolean;
  public ignore!: boolean;
  public playing = false;
  private hls = new HLS();
  private videoListeners: Record<string, any> = {
    loadedmetadata: () => this.videoTimeService.setVideoDuration(this.video.nativeElement.duration),
    canplay: () => this.videoService.setLoading(false),
    seeking: () => this.videoService.setLoading(true),
    timeupdate: () => {
      if (!this.ignore) {
        this.videoTimeService.setVideoProgress(this.video.nativeElement.currentTime);
      }
      if (
        this.video.nativeElement.currentTime === this.video.nativeElement.duration &&
        this.video.nativeElement.duration > 0
      ) {
        this.videoService.pause();
        this.videoService.setVideoEnded(true);
      } else {
        this.videoService.setVideoEnded(false);
      }
    }
  };

  @ViewChild('video', { static: true }) private video!: ElementRef<HTMLVideoElement>;
  @Input('courseLesson') courseLessonProps!: ILessons[];
  @Input('courseId') courseIdProps!: string;


  constructor(
    private videoService: VideoService,
    private volumeService: VolumeService,
    private videoTimeService: VideoTimeService,
    private videoPlaylistService: VideoPlaylistService,
    private progressService: ProgressService
  ) {}

  public ngOnInit(): void {
    this.getLesson();
    this.subscriptions();
    Object.keys(this.videoListeners).forEach(videoListener =>
      this.video.nativeElement.addEventListener(videoListener, this.videoListeners[videoListener])
    );
  }

  ngOnDestroy(): void {
    this.currentTimeSub.unsubscribe();
    this.videoTimeService.setCurrentTime(0);
  }

  getLesson(): void {
    const lessonNumber = this.progressService.getCurrentLesson(this.courseIdProps);
    if (lessonNumber !== null) {
      this.videoPlaylistService.setCurrentVideoNumber(lessonNumber - 1);
    } else {
      this.videoPlaylistService.setCurrentVideoNumber(0);
    }
  }

  /** Play/Pause video on click */
  public onVideoClick(): void {
      if (this.playing) {
        this.videoService.pause();
      } else {
        this.videoService.play();
      }
  }

  /** Go full screen on double click */
  public onDoubleClick(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      const videoPlayerDiv = document.querySelector('.video-player');
      videoPlayerDiv?.requestFullscreen();
    }
  }

  /**
   * Loads the video, if the browser supports HLS then the video use it, else play a video with native support
   */
  public load(currentVideo: string): void {
    if (HLS.isSupported()) {
      this.loadVideoWithHLS(currentVideo);
    } else {
      if (this.video.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
        this.loadVideo(currentVideo);
      }
    }
  }

  /**
   * Play or Pause current video
   */
  private playPauseVideo(playing: boolean) {
    this.playing = playing;
    this.video.nativeElement[playing ? 'play' : 'pause']();
  }

  /**
   * Setup subscriptions
   */
  private subscriptions(): void {
    this.videoService.playingState$
      .pipe(untilDestroyed(this))
      .subscribe(playing => this.playPauseVideo(playing));
  
    this.currentTimeSub = this.videoTimeService.currentTime$
      .pipe(untilDestroyed(this))
      .subscribe(currentTime => {
        if (currentTime !== 0) {
          this.video.nativeElement.currentTime = currentTime;
        }
      });
    
    this.volumeService.volumeValue$
      .pipe(untilDestroyed(this))
      .subscribe(volume => (this.video.nativeElement.volume = volume));
    
    this.videoService.loading$
      .pipe(untilDestroyed(this))
      .subscribe(loading => (this.loading = loading));
    
    this.videoTimeService.ignore$
      .pipe(untilDestroyed(this))
      .subscribe(ignore => (this.ignore = ignore));
    
    this.videoPlaylistService.currentVideo$
      .pipe(untilDestroyed(this))
      .subscribe(video => {
        const lesson = this.courseLessonProps.find((item) => item.link == video);
        if (video && lesson?.status === 'unlocked') {
          this.lessonNumber = lesson.order;
          this.progressService.saveCurrentLesson(this.courseIdProps, this.lessonNumber);
          this.load(video);
          this.setSavedProgress();
        }
      });
  }

  setSavedProgress(): void {
    const savedProgress = this.progressService.getProgress(this.courseIdProps, this.lessonNumber);
    if (savedProgress) {
      this.video.nativeElement.currentTime = savedProgress;
    }
  }

  /**
   * Method that loads the video with HLS support
   */
  private loadVideoWithHLS(currentVideo: string): void {
    this.hls.loadSource(currentVideo);
    this.hls.attachMedia(this.video.nativeElement);
    // this.hls.on(HLS.Events.MANIFEST_PARSED, () => this.video.nativeElement.play());
  }

  /**
   * Method that loads the video without HLS support
   */
  private loadVideo(currentVideo: string): void {
    const savedProgress = this.progressService.getProgress(this.courseIdProps, this.lessonNumber);
    if (savedProgress) {
      this.video.nativeElement.currentTime = savedProgress;
    }
  }

  saveProgress(): void {
    this.progressService.saveProgress(this.courseIdProps, this.lessonNumber, this.video.nativeElement.currentTime);
  }
}
