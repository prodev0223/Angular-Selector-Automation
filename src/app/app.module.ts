import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToggleInputModule } from './UI/components/toggle-input/toggle-input.module';
import { AppComponent } from './app.component';
import { MainModule } from './UI/components/main/main.module';
import { MatStepperModule } from '@angular/material/stepper';
import { SaveInfoComponent } from './UI/components/save-info/save-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToggleInputModule,
    FormsModule,
    MainModule,
    SaveInfoComponent,
    BrowserAnimationsModule,
    MatStepperModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
