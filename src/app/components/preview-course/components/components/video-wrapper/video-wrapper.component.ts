import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import HLS from 'hls.js';
import { VideoPlaylistService } from '../../services/video-playlist.service';
import { VideoTimeService } from '../../services/video-time.service';
import { VideoService } from '../../services/video.service';
import { VolumeService } from '../../services/volume.service';

@Component({
  selector: 'app-video-wrapper',
  templateUrl: './video-wrapper.component.html',
  styleUrls: ['./video-wrapper.component.scss']
})
export class VideoWrapperComponent implements OnInit {
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


  constructor(
    private videoService: VideoService,
    private volumeService: VolumeService,
    private videoTimeService: VideoTimeService,
    private videoPlaylistService: VideoPlaylistService
  ) {}

  public ngOnInit() {
    this.subscriptions();
    Object.keys(this.videoListeners).forEach(videoListener =>
      this.video.nativeElement.addEventListener(videoListener, this.videoListeners[videoListener])
    );
  }

  /** Play/Pause video on click */
  public onVideoClick() {
      if (this.playing) {
        this.videoService.pause();
      } else {
        this.videoService.play();
      }
  }

  /** Go full screen on double click */
  public onDoubleClick() {
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
  private subscriptions() {
    this.videoService.playingState$.subscribe(playing => this.playPauseVideo(playing));
    this.videoTimeService.currentTime$.subscribe(currentTime => (this.video.nativeElement.currentTime = currentTime));
    this.volumeService.volumeValue$.subscribe(volume => (this.video.nativeElement.volume = volume));
    this.videoService.loading$.subscribe(loading => (this.loading = loading));
    this.videoTimeService.ignore$.subscribe(ignore => (this.ignore = ignore));
    this.videoPlaylistService.currentVideo$.subscribe(video => this.load(video));
  }

  /**
   * Method that loads the video with HLS support
   */
  private loadVideoWithHLS(currentVideo: string) {
    this.hls.loadSource(currentVideo);
    this.hls.attachMedia(this.video.nativeElement);
    // this.hls.on(HLS.Events.MANIFEST_PARSED, () => this.video.nativeElement.play());
  }

  /**
   * Method that loads the video without HLS support
   */
  private loadVideo(currentVideo: string) {
    this.video.nativeElement.src = currentVideo;
  }
}
