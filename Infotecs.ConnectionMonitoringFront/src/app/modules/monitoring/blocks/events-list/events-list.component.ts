import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ConnectionEventModel} from '../../entity/connection-event-model';
import { ConnectionInfoModel } from '../../entity/connection-info-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ConnectionEventService} from '../../../../../generated-api/services/connection-event.service';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  public events: ConnectionEventModel[] = [];
  dataSource!: MatTableDataSource<ConnectionEventModel>;
  selectedConnection: ConnectionInfoModel | null = null;

  displayedColumns: string[] = [
    'name',
    'eventTime',
  ];

  @Input() set setSelectedConnection(selectedConnection: ConnectionInfoModel | null) {
    this.selectedConnection = selectedConnection;

    if(this.selectedConnection?.id !== null && this.selectedConnection?.id !== undefined) {
      this.getEventsList(this.selectedConnection.id);
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private connectionEventService: ConnectionEventService,
  ) { }

  ngOnInit(): void {
    this.selectedConnection = null;
  }

  private getEventsList(connectionId: string): void {
      this.connectionEventService.getApiConnectionEvent(connectionId)
        .subscribe(
          (response: any) => {
            try {
              this.events = response;
              console.log(response);
              console.log(this.events);
              this.dataSource = new MatTableDataSource(this.events);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            } catch (e) {
              console.error(e);
            }
          }
        );
  }

}
