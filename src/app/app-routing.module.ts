import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewCoursesComponent } from './components/preview-courses/components/preview-courses.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewCoursesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
