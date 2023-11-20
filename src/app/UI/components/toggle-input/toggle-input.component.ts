import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ToggleInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ToggleInputComponent),
    },
  ],
})
export class ToggleInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() classes: string;
  @Input() id: String | number =   `id-${Math.floor(Math.random()*1000)+1}`
  @Input('value') set setValue(value: boolean){
    this.writeValue(value)
  }
  value: boolean = false;
  isValid = true;
  onChange: Function = (value: any) => {};

  onTouched = () => {};

  touched = false;
 
  disabled = false;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onInputChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).checked;
    this.onChange(this.value);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl) {
    setTimeout(() => {
      this.isValid = control.valid || control.pristine;
    });
  }
}
