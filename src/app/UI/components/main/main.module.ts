import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MainComponent } from './main.component';
import { ToggleInputModule } from '../toggle-input/toggle-input.module';
import { TextInputModule } from '../text-input/text-input.module';
import { ActionButtonComponent } from '../action-button/action-button.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToggleInputModule,
    TextInputModule,
    FormsModule,
    ActionButtonComponent,
    AngularSvgIconModule.forRoot()
  ],
  providers: [],
  exports: [MainComponent]
})
export class MainModule { }
