import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { VolumeService } from '../../services/volume.service';

@UntilDestroy()
@Component({
  selector: 'app-control-volume',
  templateUrl: './control-volume.component.html',
  styleUrls: ['./control-volume.component.scss']
})
export class ControlVolumeComponent implements OnInit {
  public volume = 1;
  public maxVolumeValue = 1;
  public iconVolumeUp = {
    name: 'Unmute',
    value: 'volume_up'
  };
  public iconVolumeMute = {
    name: 'Mute',
    value: 'volume_off'
  };
  public label = "Video progress";
  private savedVolume = 1;

  constructor(private volumeService: VolumeService) {}

  public ngOnInit(): void {
    this.volumeService.volumeValue$
      .pipe(untilDestroyed(this))
      .subscribe(volume => this.volume = volume);
  }

  public onVolumeClick(): void {
    this.savedVolume = this.volume === 0 ? this.savedVolume : this.volume;
    this.volumeService.setVolumeValue(this.volume > 0 ? 0 : this.savedVolume);
  }

  public onInput(event: MatSliderChange): void {
    this.volumeService.setVolumeValue(event.value ?? 1);
  }

  public get icon(): string {
    return this.volume === 0 ? this.iconVolumeMute.value : this.iconVolumeUp.value;
  }

  public get title(): string {
    return this.volume === 0 ? this.iconVolumeMute.name : this.iconVolumeUp.name;
  }

  public get ariaLabel(): string {
    return this.label;
  }
}
