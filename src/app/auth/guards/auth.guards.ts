import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs/operators';


export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuth => {
      if (!isAuth) {
        router.navigate(['auth/login']); // Redirige en logout
        return false;
      } else {
        return true;
      }
    }),
    catchError((error) => {
      console.log("authGuard Error", error);
      return of(false);
    })
  );
};






// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// // import { NbAuthService } from '@nebular/auth';
// import { tap } from 'rxjs/operators';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class AuthGuard implements CanActivate {

//   constructor(
//     // private authService: NbAuthService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   canActivate() {
//     return this.authService.isAuthenticated()
//       .pipe(
//         tap(authenticated => {
//           console.log("GUARD - ", authenticated);
//           if (!authenticated) {
//             this.router.navigate(['auth/login']);
//           }
//         }),
//       );
//   }
// }
