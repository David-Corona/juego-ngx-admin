import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';


export const noAuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuth => {
      if (isAuth) {
        router.navigate(['pages/dashboard']); // TODO - cambiar a inicio
        return false;
      } else {
        return true;
      }
    }),
    catchError((error) => {
      console.log("noAuthGuard Error", error);
      return of(false);
    })
  );
};
