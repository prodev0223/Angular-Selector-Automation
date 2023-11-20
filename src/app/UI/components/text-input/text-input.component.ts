import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => TextInputComponent),
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() classes: string;
  @Input() disabled = false;
  @Input() invalid? = false;
  @Input() min?: number | string;
  value: string = '';
  @Input() type = 'text';
  @Output() enter = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();
  isValid = true;

  onChange: Function = (value: any) => {};

  onTouched = () => {};

  touched = false;


  constructor() {}

  ngOnInit(): void {}

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
  onInputChange(event: any): void {
    this.value = this.type == 'tel'
      ? this.value.replace(/[^0-9()-]/g, '').replace(/(\..*)\./g, '$1')
      : this.value;
    this.onChange(this.value);
  }

  onFocus(): void {
    this.focus.emit();
  }

  onBlur(): void {
    this.blur.emit();
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
