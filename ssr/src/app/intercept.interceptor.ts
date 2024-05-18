import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../environments/environment.development';


export const interceptInterceptor: HttpInterceptorFn = (req: any, next: HttpHandlerFn) => {
  const url = `${(environment as any).baseBackendUrl}${req.url}`
  console.log(url);
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json'); 
  const finalReq: HttpRequest<any> = req.clone({ url, headers });

  return next(finalReq);
};

// import { inject, makeStateKey, PLATFORM_ID, StateKey, TransferState } from '@angular/core';
// import { map, of, tap } from 'rxjs';
// import { isPlatformServer } from '@angular/common';

  // const transferState = inject(TransferState);
  // if (req.method !== 'GET') {
  //   return next(req);
  // }

  // const key: StateKey<string> = makeStateKey<string>(req.urlWithParams);

  // const storedResponse = transferState.get<any>(key, null);
  // if (storedResponse) {
  //   const response = new HttpResponse({ body: storedResponse, status: 200 });
  //   transferState.remove(key);
  //   return of(response);
  // } else {
  //   return next(req).pipe(map((event) => { 
  //     if (event instanceof HttpResponse) {
  //       transferState.set(key, (<HttpResponse<any>>event).body);
  //     }
  //     return event;
  //   }));
  // }