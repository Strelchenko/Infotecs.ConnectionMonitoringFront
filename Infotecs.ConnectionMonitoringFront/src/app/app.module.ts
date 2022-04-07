import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ApiModule} from '../generated-api/api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonitoringModule,
    MatTableModule,
    BrowserAnimationsModule,
    ApiModule.forRoot({ rootUrl: 'https://localhost:7052' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
