import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionInfoService } from 'src/generated-api/services/connection-info.service';
import { ConnectionInfoModel } from '../../entity/connection-info-model';
import { map, Subject, takeUntil, tap } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { ConnectionInfo } from '../../../../../generated-api/models/connection-info';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'connections-list',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ConnectionsListComponent implements OnInit, OnDestroy {

  public connections: ConnectionInfoModel[] = [];
  dataSource!: MatTableDataSource<ConnectionInfoModel>;
  selectedConnection: ConnectionInfoModel | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();

  signalRConnection: HubConnection | undefined;

  displayedColumns: string[] = [
    'userName',
    'lastConnection',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private connectionInfoService: ConnectionInfoService,
  ) {
  }

  ngOnInit(): void {
    this.getConnectionsList();
    this.CreateSignalRConnection();
  }

  private getConnectionsList(): void {
    this.connectionInfoService.getApiConnectionInfo()
      .pipe(tap((response) => this.connections = response))
      .pipe(map((value) => new MatTableDataSource(value)))
      .pipe(takeUntil(this.destroy$))
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

  private CreateSignalRConnection(): void {
    this.signalRConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + '/ConnectionInfoHub')
      .build();

    this.signalRConnection
      .start()
      .then(function () {
        // eslint-disable-next-line no-console
        console.info('SignalR connected');
      }).catch(function (err) {
      return console.error(err.toString());
    });

    this.signalRConnection.on('onNewConnectionInfoAdded', (data: ConnectionInfo) => {
      const entity = {...data} as ConnectionInfoModel;
      this.dataSource.data.push(entity);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  ngOnDestroy() {
    this.signalRConnection?.stop();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
