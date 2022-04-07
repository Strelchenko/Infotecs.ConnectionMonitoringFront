import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionInfoService } from 'src/generated-api/services/connection-info.service';
import { ConnectionInfoModel } from '../../entity/connection-info-model';

@Component({
  selector: 'connections-list-page',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ConnectionsListComponent implements OnInit {

  public connections: ConnectionInfoModel[] = [];
  dataSource!: MatTableDataSource<ConnectionInfoModel>;

  displayedColumns: string[] = [
    'userName',
    'lastConnection',
    'appVersion',
    'os',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private connectionInfoService: ConnectionInfoService,
  ) { }

  ngOnInit(): void {
    this.getConnectionsList();
  }

  private getConnectionsList(): void {
    this.connectionInfoService.getApiConnectionInfo()
      .subscribe(
        (response: any) => {
          try {
            this.connections = response;
            console.log(response);
            console.log(this.connections);
            this.dataSource = new MatTableDataSource(this.connections);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } catch (e) {
            console.error(e);
          }
        }
      );
  }

}