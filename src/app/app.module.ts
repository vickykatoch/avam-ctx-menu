import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FxModule } from 'fx';
import { AppComponent } from './app.component';
import { FxHostComponent } from './fx-host/fx-host.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'typeahead';

@NgModule({
  declarations: [AppComponent, FxHostComponent],
  imports: [BrowserModule, HttpClientModule, FxModule, BrowserAnimationsModule, TypeaheadModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
