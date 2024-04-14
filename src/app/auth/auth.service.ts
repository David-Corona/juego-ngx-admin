import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
// import { EMPTY, Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { SessionStorageService } from '../_services/session-storage.service';
import { ApiResponse, NuevoUsuario, TokenResponse, UsuarioLogin } from './auth.model';

const API_URL_AUTH = environment.apiURL + "/auth/";
const API_URL_ADIMN_AUTH = environment.apiURL + "/admin/auth/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    // private storageService: SessionStorageService,
  ) { }


  registrar(usuarioInfo: NuevoUsuario): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_URL_ADIMN_AUTH + "registro", usuarioInfo);
  }

  login(userLogin: UsuarioLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(API_URL_ADIMN_AUTH + "login", userLogin)
      .pipe(
        tap((resp: TokenResponse) => {
          // this.storageService.saveUser(resp.data);
        }),
        catchError(e => { throw e; })
      );
  }

  // // Comprueba accessToken, si es invalido => intenta renovarlo
  // isAuthenticated(): Observable<boolean> {
  //   const token = this.storageService.getUser()?.accessToken;
  //   if (token && this.isAccessTokenValid()) {
  //     return of(true);
  //   } else {
  //     return this.refreshToken().pipe(
  //       switchMap((resp: TokenResponse) => {
  //         this.storageService.saveUser(resp.data);
  //         return of(true);
  //       }),
  //       catchError(e => {
  //         this.storageService.clearUser();
  //         console.error(e);
  //         return of(false);
  //       })
  //     );
  //   }
  // }

  // private isAccessTokenValid(): boolean {
  //   const loggedUser = this.storageService.getUser();
  //   if (!loggedUser || !loggedUser.expires_at) {
  //     return false;
  //   }
  //   const currentTimestamp = Math.floor(Date.now() / 1000);
  //   if (loggedUser.expires_at > currentTimestamp) {
  //     return true;
  //   }
  //   return false;
  // }

  // refreshToken(): Observable<TokenResponse> {
  //   return this.http.post<TokenResponse>(API_URL_AUTH + "refresh-token", null)
  // }

  // logout(): Observable<ApiResponse> {
  //   const usuario_id = this.storageService.getUser()?.usuario_id;
  //   if(usuario_id){
  //     return this.http.post<ApiResponse>(API_URL_AUTH + "logout", {usuario_id})
  //     .pipe(
  //       tap(() => {
  //           this.storageService.clearUser();
  //           this.router.navigate(['/auth/login']);
  //       }),
  //       catchError(e => { throw e; })
  //     );
  //   } else {
  //     return EMPTY;
  //   }
  // }

  recoverPassword(email: String): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_URL_AUTH + "forgot-password", {"email": email})
  }

  resetPassword(usuario_id: String, password: String, token: String): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_URL_AUTH + "reset-password", {usuario_id, password, token})
  }

}
