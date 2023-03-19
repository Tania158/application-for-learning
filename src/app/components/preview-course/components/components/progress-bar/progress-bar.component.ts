import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() public max!: number;
  @Input() public value!: number;
  @Input() public label!: string;
  @Output() public input = new EventEmitter<MatSliderChange>();
  @Output() public change = new EventEmitter<MatSliderChange>();

  public inputHandler(event: MatSliderChange): void {
    this.input.emit(event);
  }

  public changeHandler(event: MatSliderChange): void {
    this.change.emit(event);
  }
}
