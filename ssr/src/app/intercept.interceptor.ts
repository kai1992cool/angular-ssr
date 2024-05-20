import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { PLATFORM_ID, StateKey, inject, makeStateKey } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { map, of } from 'rxjs';

export const interceptInterceptor: HttpInterceptorFn = (req: any, next: HttpHandlerFn) => {  
  const transferState = inject(TransferState);
  if (req.method !== 'GET') {
    return next(req);
  }
  const key: StateKey<string> = makeStateKey<string>(req.urlWithParams);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);
  const url = (isBrowser ? 'http://localhost:3000' : 'http://127.0.0.1:3000') + req.urlWithParams;

  const storedResponse = transferState.get(key, null);
  if (storedResponse) {
    const response = new HttpResponse({ body: storedResponse, status: 200 });
    transferState.remove(key);
    return of(response);
  } else {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json'); 
    const finalReq: HttpRequest<any> = req.clone({ req, url, headers });
    return next(finalReq).pipe(map((event) => { 
      if (event instanceof HttpResponse) {
        transferState.set(key, (<HttpResponse<any>>event).body);
      }
      return event;
    }));
  }
};