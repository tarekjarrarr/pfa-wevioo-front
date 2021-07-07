import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { credentialsKey } from '../authentication/authentication.service';
import { catchError, map,tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;
    if ((localStorage.getItem(credentialsKey))) {
      token = localStorage.getItem(credentialsKey);
    } else if ((sessionStorage.getItem(credentialsKey))) {
      token = sessionStorage.getItem(credentialsKey);
    }
    if (token) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }

    if (!request.headers.has('Content-Type') && !request.headers.has('File-Upload')) {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    }

    request = request.clone({headers: request.headers.set('Accept', 'application/json')});

    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
            if(evt.body && evt.body.success)
                return(evt)
        }
      }),
      catchError((error: HttpErrorResponse) => {
        
        if (error.error instanceof Error||error.status!==200) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          return throwError(error);
        } else if(error.status!==200) {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`error ${error.status}: ${error.error}`);
          return throwError(error);
        }
        return EMPTY;
      })
    );
  }
  
  private is2xxStatus(response: HttpResponseBase) {
    return response.status >= 200 && response.status < 300 && response.statusText === 'OK';
  }
}


