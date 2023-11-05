import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsComponent } from './pages/forms/forms.component';
import { FormControlComponent } from './pages/forms/components/form-control/form-control.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormArrayComponent } from './pages/forms/form-array/form-array.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    FormControlComponent,
    FormArrayComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
