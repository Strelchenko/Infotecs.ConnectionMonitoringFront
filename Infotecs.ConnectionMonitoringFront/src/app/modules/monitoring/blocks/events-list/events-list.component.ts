import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ConnectionEventModel} from '../../entity/connection-event-model';
import {ConnectionInfoModel} from '../../entity/connection-info-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ConnectionEventService} from '../../../../../generated-api/services/connection-event.service';
import {BehaviorSubject, map, tap} from 'rxjs';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  public events: ConnectionEventModel[] = [];
  dataSource!: MatTableDataSource<ConnectionEventModel>;
  selectedConnection: ConnectionInfoModel | null = null;
  selectedConnectionId = new BehaviorSubject<string | undefined | null>(null);

  displayedColumns: string[] = [
    'name',
    'eventTime',
  ];

  @Input() set SelectedConnection(selectedConnection: ConnectionInfoModel | null) {
    this.selectedConnection = selectedConnection;
    this.selectedConnectionId.next(selectedConnection?.id);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private connectionEventService: ConnectionEventService,
  ) {
  }

  ngOnInit(): void {
    this.selectedConnectionId.subscribe(x => {
      if (x) {
        this.getEventsList(x);
      }
    });
  }

  private getEventsList(connectionId: string): void {
    this.connectionEventService.getApiConnectionEvent(connectionId)
      .pipe(tap((response) => this.events = response))
      .pipe(map((value) => new MatTableDataSource(value)))
      .subscribe(
        (dataSource) => {
          this.dataSource = dataSource;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (errors) => {
          console.error(errors);
        }
      );
  }

}
