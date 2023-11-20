import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleInputComponent } from './toggle-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToggleInputComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ToggleInputComponent],
})
export class ToggleInputModule {}
