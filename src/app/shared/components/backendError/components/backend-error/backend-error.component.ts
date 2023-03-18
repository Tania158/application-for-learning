import { Component, Input, OnInit } from '@angular/core';
import { IBackendError } from 'src/app/shared/types/backendError.interface';

@Component({
  selector: 'app-backend-error',
  templateUrl: './backend-error.component.html',
  styleUrls: ['./backend-error.component.scss']
})
export class BackendErrorComponent implements OnInit {

  @Input('backendErrors') backendErrorsProps!: IBackendError | any;

  errorMessage!: string;

  constructor() { }

  ngOnInit(): void {
    if (this.backendErrorsProps) {
      this.errorMessage = this.backendErrorsProps.message;
    }

    if (this.backendErrorsProps.message == null) {
      this.errorMessage = 'Something went wrong... Please, try again later.';
    }
  }
}
