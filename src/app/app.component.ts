import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ExtensionViewModel } from './UI/viewModels/Extension.viewModel';
import { SubSink } from 'subsink';
import { Action } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatStepper) stepper: MatStepper;
  sub = new SubSink()
  darkMode = true
  selectionModeActive$ = this.extensionViewModel.selectionModeActive$
  selectedElements$ = this.extensionViewModel.selectedElements$
  similarElements$ = this.extensionViewModel.similarElements$

  constructor(
    private extensionViewModel: ExtensionViewModel
  ) { }

  ngOnInit(): void {
    this.sub.sink = this.extensionViewModel.actionMode$.subscribe((action) => this.stepper.selectedIndex = action === Action.GetTextContent ? 1 : 0)
  }

  ngAfterViewInit(): void {
    this.extensionViewModel.init()
  }

  ngOnDestroy(): void {
    this.extensionViewModel.init()
  }

  updateDarkMode(mode: boolean) {
    document.body.classList.toggle('dark', mode)
  }

  selectAll(event: Event) {
    this.extensionViewModel.selectAll((event.target as HTMLInputElement).checked)
  }
}
