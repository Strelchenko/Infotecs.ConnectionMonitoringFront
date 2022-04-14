import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { ConnectionsListComponent } from './blocks/connections-list/connections-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MonitoringComponent} from './pages/monitoring/monitoring.component';
import { EventsListComponent } from './blocks/events-list/events-list.component';


@NgModule({
  declarations: [
    ConnectionsListComponent,
    MonitoringComponent,
    EventsListComponent
  ],
  exports: [
    ConnectionsListComponent,
    MonitoringComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MonitoringModule { }
