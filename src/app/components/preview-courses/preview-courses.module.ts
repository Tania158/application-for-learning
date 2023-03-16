import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewCoursesComponent } from './components/preview-courses.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { GetCoursesEffect } from './store/effect/getCourses.effect';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetCoursesEffect]),
    StoreModule.forFeature('allCourses', reducers),
    LoadingModule
  ],
  declarations: [
    PreviewCoursesComponent
  ]
})
export class PreviewCoursesModule {}
