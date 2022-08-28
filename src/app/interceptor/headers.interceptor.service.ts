import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeadersInterceptorService implements HttpInterceptor {

  constructor() { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.debug('Intercept request for add token if existe ', req.url);
    const headers = new HttpHeaders({
      'x-token': this.token
    })
    const reqClone = req.clone({
      headers
    })
    return next.handle(reqClone);
  }


}
