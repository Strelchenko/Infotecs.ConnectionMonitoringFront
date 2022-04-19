import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ConnectionInfoService} from 'src/generated-api/services/connection-info.service';
import {ConnectionInfoModel} from '../../entity/connection-info-model';
import {BehaviorSubject, interval, map, Observable, Subject, Subscription, takeUntil, tap} from 'rxjs';

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

  isAutoUpdate$ = new BehaviorSubject(false);

  subscription: Subscription | undefined;

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

  onCheckboxChange(e: any) {
    const period = interval(30000);
    if (e.checked) {
      this.subscription = period
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getConnectionsList(),
          error: (error) => console.log('error: ', error)
        });
    } else {
      this.subscription?.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
