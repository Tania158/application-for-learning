import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewCoursesComponent } from './components/preview-courses.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { GetCoursesEffect } from './store/effect/getCourses.effect';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { RouterModule } from '@angular/router';
import { BackendErrorModule } from 'src/app/shared/components/backendError/backendError.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetCoursesEffect]),
    StoreModule.forFeature('allCourses', reducers),
    LoadingModule,
    BackendErrorModule,
    MatIconModule,
  ],
  declarations: [
    PreviewCoursesComponent
  ],
  providers: [UtilsService]
})
export class PreviewCoursesModule {}
