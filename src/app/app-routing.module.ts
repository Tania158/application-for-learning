import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewCourseComponent } from './components/preview-course/components/preview-course/preview-course.component';
import { PreviewCoursesComponent } from './components/preview-courses/components/preview-courses.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewCoursesComponent
  },
  {
    path: 'courses/:slug',
    component: PreviewCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
