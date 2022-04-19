import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConnectionEventModel} from '../../entity/connection-event-model';
import {ConnectionInfoModel} from '../../entity/connection-info-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ConnectionEventService} from '../../../../../generated-api/services/connection-event.service';
import {
  BehaviorSubject,
  empty, filter,
  interval,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap
} from 'rxjs';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnDestroy, AfterViewInit {

  public events: ConnectionEventModel[] = [];
  dataSource!: MatTableDataSource<ConnectionEventModel>;
  selectedConnection: ConnectionInfoModel | null = null;
  selectedConnectionId = new BehaviorSubject<string | undefined>(undefined);
  destroy$: Subject<boolean> = new Subject<boolean>();

  isAutoUpdate$ = new BehaviorSubject(false);

  subscription: Subscription | undefined;

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

  ngAfterViewInit(): void {
    this.selectedConnectionId
      .pipe(
        switchMap((x) => this.getEventsList(x)),
        takeUntil(this.destroy$))
      .subscribe();
  }

  // @ts-ignore
  private getEventsList(connectionId: string | undefined): Observable<any> {
    if (connectionId) {
      return this.connectionEventService.getApiConnectionEvent(connectionId)
        .pipe(tap((response) => this.events = response))
        .pipe(map((value) => new MatTableDataSource(value)))
        .pipe(tap((dataSource) => {
          this.dataSource = dataSource;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }));
    }
  }

  onCheckboxChange(e: any) {
    const period = interval(30000);
    if (e.checked) {
      this.subscription = period
        .pipe(
          switchMap(() => this.getEventsList(this.selectedConnection?.id)),
          takeUntil(this.destroy$))
        .subscribe({
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
