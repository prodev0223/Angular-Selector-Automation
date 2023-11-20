import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TextInputModule } from './UI/components/text-input/text-input.module';
import { ToggleInputModule } from './UI/components/toggle-input/toggle-input.module';
import { AppComponent } from './app.component';
import { MainModule } from './UI/components/main/main.module';
import { MatStepperModule } from '@angular/material/stepper';
import { SaveInfoComponent } from './UI/components/save-info/save-info.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToggleInputModule,
    TextInputModule,
    FormsModule,
    MainModule,
    SaveInfoComponent,
    MatStepperModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
