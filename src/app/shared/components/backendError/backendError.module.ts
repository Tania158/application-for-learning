import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BackendErrorComponent } from './components/backend-error/backend-error.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BackendErrorComponent
  ],
  exports: [BackendErrorComponent]
})
export class BackendErrorModule {}