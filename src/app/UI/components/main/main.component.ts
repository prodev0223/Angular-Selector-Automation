import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Action } from 'src/app/core/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent { 
  @Input() selectedElements: string[]
  action = Action

  constructor(
  ) { } 

}
