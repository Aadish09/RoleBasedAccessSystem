import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar: MatSnackBar = inject(MatSnackBar);

    const authToken = localStorage.getItem('accessToken');
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            // Handle HTTP errors
            if (err.status === 401) {
              snackbar.open('Unauthorized','ERROR', {duration : 2000})
            } else if(err.status === 400 || err.status === 404) {
              snackbar.open(err.error.message,'ERROR', {duration : 2000})
            }
            else {
              // Handle other HTTP error codes
              console.error('HTTP error:', err);
            }
          } else {
            // Handle non-HTTP errors
            console.error('An error occurred:', err);
          }
    
          // Re-throw the error to propagate it further
          return throwError(() => err); 
        })
      );;
  };