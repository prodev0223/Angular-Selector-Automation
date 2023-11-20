import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ExtensionViewModel } from './UI/viewModels/Extension.viewModel';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(MatStepper) stepper: MatStepper;
  sub = new SubSink()
  darkMode = true

  constructor(
    private extensionViewModel: ExtensionViewModel
  ) { }

  ngOnInit(): void {
    this.sub.sink = this.extensionViewModel.textContent$.subscribe(() => this.stepper.selectedIndex = 1)
  }

  ngOnDestroy(): void {
    this.extensionViewModel.init()
  }

  updateDarkMode(mode: boolean) {
    document.body.classList.toggle('dark', mode)
  }
}
