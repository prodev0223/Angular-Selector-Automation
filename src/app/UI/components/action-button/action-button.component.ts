import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ExtensionViewModel } from 'src/app/UI/viewModels/Extension.viewModel';
import { ActionButton, Action } from 'src/app/core/models';

@Component({
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule],
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {

  @Input() action: Action
  @Input() disabled: boolean

  actions: ActionButton[] = [
    {
      message: Action.ClickOnSelectedElements,
      icon: 'assets/icons/click.svg',
      title: 'Click buttons',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      message: Action.FillForms,
      icon: 'assets/icons/form.svg',
      title: 'Fill forms',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      message: Action.ToggleSelectionMode,
      icon: 'assets/icons/select.svg',
      title: 'Select elements',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      message: Action.GetTextContent,
      icon: 'assets/icons/file-download.svg',
      title: 'Save text content',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    }
  ]

  constructor(
    private extensionViewModel: ExtensionViewModel
  ) { }


  get content () {
    return this.actions.find(a => a.message === this.action)!
  }

  execAction() {
    switch (this.action) {
      case Action.ClickOnSelectedElements:
        this.extensionViewModel.clickOnSelectedElements();
        break;
      case Action.FillForms:
        this.extensionViewModel.fillForms();
        break;
      case Action.ToggleSelectionMode:
        this.extensionViewModel.toggleSelectionMode();
        break;
      case Action.SelectAllElements:
        this.extensionViewModel.selectAll(false);
        break;
      case Action.GetTextContent:
        this.extensionViewModel.getTextContent();
        break;
    }
  }
}
