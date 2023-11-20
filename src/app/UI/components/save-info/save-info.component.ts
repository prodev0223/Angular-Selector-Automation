import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtensionViewModel } from '../../viewModels/Extension.viewModel';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-info',
  standalone: true,
  imports: [
    CommonModule, FormsModule, AngularSvgIconModule, ClipboardModule, MatSnackBarModule
  ],
  templateUrl: './save-info.component.html',
  styleUrls: ['./save-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveInfoComponent {
  textContent$ = this.extensionViewModel.textContent$;
  @Output() back = new EventEmitter<void>()

  constructor(
    private extensionViewModel: ExtensionViewModel,
    private snackBar: MatSnackBar
  ) { }

  copied() {
    // this.snackBar.open('Content copied to clipboard', undefined, {
    //   duration: 2500
    // })
    this.back.emit();
  }
}
