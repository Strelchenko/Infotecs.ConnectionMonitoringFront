import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { ConnectionsListComponent } from './pages/connections-list/connections-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    ConnectionsListComponent
  ],
  exports: [
    ConnectionsListComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MonitoringModule { }
