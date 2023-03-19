import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {
  @Input() public duration!: number;
  @Input() public currentProgress!: number;

  public padZeros(value = 0, padding = 2): string {
    return `${Math.floor(value)}`.padStart(padding, '0');
  }

  public get durationMinutes(): number {
    return this.duration / 60;
  }

  public get durationSeconds(): number {
    return this.duration - (Math.floor(this.durationMinutes) * 60);
  }

  public get currentMinutes(): number {
    return this.currentProgress / 60;
  }

  public get currentSeconds(): number {
    return this.currentProgress - (Math.floor(this.currentMinutes) * 60);
  }
}
