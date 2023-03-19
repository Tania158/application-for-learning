import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PreviewCourseComponent } from './components/preview-course/preview-course.component';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { GetCourseEffect } from "./components/store/effect/getCourse.effect";
import { reducers } from "./components/store/reducers";
import { LoadingModule } from "src/app/shared/components/loading/loading.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { ControlComponent } from "./components/components/control/control.component";
import { ControlVolumeComponent } from "./components/components/control-volume/control-volume.component";
import { ProgressBarComponent } from "./components/components/progress-bar/progress-bar.component";
import { ControlsComponent } from "./components/components/controls/controls.component";
import { TimeComponent } from "./components/components/time/time.component";
import { VideoListComponent } from "./components/components/video-list/video-list.component";
import { VideoWrapperComponent } from "./components/components/video-wrapper/video-wrapper.component";
import { RouterModule } from "@angular/router";
import { BackendErrorModule } from "src/app/shared/components/backendError/backendError.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetCourseEffect]),
    StoreModule.forFeature('course', reducers),
    LoadingModule,
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatListModule,
    BackendErrorModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    PreviewCourseComponent,
    ControlComponent,
    ControlVolumeComponent,
    ProgressBarComponent,
    ControlsComponent,
    TimeComponent,
    VideoListComponent,
    VideoWrapperComponent
  ]
})
export class PreviewCourseModule {}