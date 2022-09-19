import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    return httpHandler.handle(request)
    .pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        this.auth.logout();
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
    
  }
}