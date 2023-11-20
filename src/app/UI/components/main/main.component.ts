import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtensionViewModel } from '../../viewModels/Extension.viewModel';
import { Action } from 'src/app/core/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent { 
  action = Action
  selectionModeActive$ = this.extensionViewModel.selectionModeActive$
  selectedElements$ = this.extensionViewModel.selectedElements$
  similarElements$ = this.extensionViewModel.similarElements$

  constructor(
    private extensionViewModel: ExtensionViewModel
  ) { }

  ngAfterViewInit(): void {
    this.extensionViewModel.init()
  }  

  selectAll(event: Event) {
    this.extensionViewModel.selectAll((event.target as HTMLInputElement).checked)
  }
}
