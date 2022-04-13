/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConnectionEvent } from '../models/connection-event';
@Injectable({
  providedIn: 'root',
})
class ConnectionEventService extends __BaseService {
  static readonly getApiConnectionEventPath = '/api/ConnectionEvent';
  static readonly postApiConnectionEventPath = '/api/ConnectionEvent';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param connectionId undefined
   * @return Success
   */
  getApiConnectionEventResponse(connectionId?: string): __Observable<__StrictHttpResponse<Array<ConnectionEvent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (connectionId != null) __params = __params.set('connectionId', connectionId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ConnectionEvent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConnectionEvent>>;
      })
    );
  }
  /**
   * @param connectionId undefined
   * @return Success
   */
  getApiConnectionEvent(connectionId?: string): __Observable<Array<ConnectionEvent>> {
    return this.getApiConnectionEventResponse(connectionId).pipe(
      __map(_r => _r.body as Array<ConnectionEvent>)
    );
  }

  /**
   * @param body undefined
   */
  postApiConnectionEventResponse(body?: Array<ConnectionEvent>): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ConnectionEvent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param body undefined
   */
  postApiConnectionEvent(body?: Array<ConnectionEvent>): __Observable<null> {
    return this.postApiConnectionEventResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ConnectionEventService {
}

export { ConnectionEventService }
