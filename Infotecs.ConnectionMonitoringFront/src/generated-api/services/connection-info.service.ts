/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConnectionInfo } from '../models/connection-info';
@Injectable({
  providedIn: 'root',
})
class ConnectionInfoService extends __BaseService {
  static readonly getApiConnectionInfoPath = '/api/ConnectionInfo';
  static readonly postApiConnectionInfoPath = '/api/ConnectionInfo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiConnectionInfoResponse(): __Observable<__StrictHttpResponse<Array<ConnectionInfo>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ConnectionInfo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConnectionInfo>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiConnectionInfo(): __Observable<Array<ConnectionInfo>> {
    return this.getApiConnectionInfoResponse().pipe(
      __map(_r => _r.body as Array<ConnectionInfo>)
    );
  }

  /**
   * @param body undefined
   */
  postApiConnectionInfoResponse(body?: ConnectionInfo): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ConnectionInfo`,
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
  postApiConnectionInfo(body?: ConnectionInfo): __Observable<null> {
    return this.postApiConnectionInfoResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ConnectionInfoService {
}

export { ConnectionInfoService }
