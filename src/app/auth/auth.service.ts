import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
// import { EMPTY, Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';

import { NB_AUTH_STRATEGIES, NbAuthResult, NbAuthService, NbAuthStrategy, NbAuthToken, NbTokenService } from '@nebular/auth';

import { environment } from '../../environments/environment';
import { EMPTY, Observable, of as observableOf, of } from 'rxjs';
// import { SessionStorageService } from '../_services/session-storage.service';
import { ApiResponse, NuevoUsuario, TokenResponse, UsuarioLogin } from './auth.model';
import { SessionStorageService } from '../services/session-storage.service';

const API_URL_AUTH = environment.apiURL + "/admin/auth/";
// const API_URL_ADMIN_AUTH = environment.apiURL + "/admin/auth/";


@Injectable({
  providedIn: 'root'
})
export class AuthService { //extends NbAuthService

  strategy: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    // protected nbAuthService: NbAuthService,
    private storageService: SessionStorageService,

    // tokenservice: NbTokenService,
    // @Inject(NB_AUTH_STRATEGIES) protected strategies

  ) {
    // super(tokenservice, strategies);
    // this.strategy = this.getConfigValue('forms.login.strategy');
  }


  registrar(usuarioInfo: NuevoUsuario): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_URL_AUTH + "registro", usuarioInfo);
  }

  login(userLogin: UsuarioLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(API_URL_AUTH + "login", userLogin)
      .pipe(
        tap((resp: TokenResponse) => {
          // this.nbAuthService.authenticate(this.strategy, userLogin)
          this.storageService.saveUser(resp.data);
        }),
        catchError(e => { throw e; })
      );
  }

  // // Comprueba accessToken, si es invalido => intenta renovarlo
  isAuthenticated(): Observable<boolean> {
    const token = this.storageService.getUser()?.accessToken;
    if (token && this.isStorageUserValid()) {
      return of(true);
    } else {
      return this.refreshToken().pipe(
        switchMap((resp: TokenResponse) => {
          this.storageService.saveUser(resp.data);
          return of(true);
        }),
        catchError(e => {
          this.storageService.clearUser();
          console.error(e);
          return of(false);
        })
      );
    }
  }

  private isStorageUserValid(): boolean {
    const loggedUser = this.storageService.getUser();
    if (!loggedUser || !loggedUser.expires_at) {
      return false;
    }
    if(loggedUser.usuario_rol !== 'admin') {
      return false;
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (loggedUser.expires_at > currentTimestamp) {
      return true;
    }
    return false;
  }

  refreshToken(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(API_URL_AUTH + "refresh-token", null)
  }

  logout(): Observable<ApiResponse> {
    const usuario_id = this.storageService.getUser()?.usuario_id;
    if(usuario_id){
      return this.http.post<ApiResponse>(API_URL_AUTH + "logout", {usuario_id})
      .pipe(
        tap(() => {
            this.storageService.clearUser();
            this.router.navigate(['/auth/login']);
        }),
        catchError(e => { throw e; })
      );
    } else {
      return EMPTY;
    }
  }

  recoverPassword(email: String): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_URL_AUTH + "forgot-password", {"email": email})
  }

  resetPassword(usuario_id: String, password: String, token: String): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_URL_AUTH + "reset-password", {usuario_id, password, token})
  }



  // TODO - Remove, nebular copy of service

  // /**
  //  * Retrieves current authenticated token stored
  //  * @returns {Observable<any>}
  //  */
  // getToken(): Observable<NbAuthToken> {
  //   console.log("getToken - ", this.tokenService.get());
  //   return this.tokenService.get();
  // }

  // /**
  //  * Returns true if auth token is present in the token storage
  //  * @returns {Observable<boolean>}
  //  */
  // isAuthenticated(): Observable<boolean> {
  //   console.log("isAuthenticated");
  //   return this.getToken()
  //     .pipe(map((token: NbAuthToken) => token.isValid()));
  // }

  // /**
  //  * Returns true if valid auth token is present in the token storage.
  //  * If not, calls the strategy refreshToken, and returns isAuthenticated() if success, false otherwise
  //  * @returns {Observable<boolean>}
  //  */
  // isAuthenticatedOrRefresh(): Observable<boolean> {
  //   console.log("isAuthenticatedOrRefresh");
  //   return this.getToken()
  //     .pipe(
  //       switchMap(token => {
  //       if (token.getValue() && !token.isValid()) {
  //         return this.refreshToken(token.getOwnerStrategyName(), token)
  //           .pipe(
  //             switchMap(res => {
  //               if (res.isSuccess()) {
  //                 return this.isAuthenticated();
  //               } else {
  //                 return observableOf(false);
  //               }
  //             }),
  //           )
  //       } else {
  //         return observableOf(token.isValid());
  //       }
  //   }));
  // }

  // /**
  //  * Returns tokens stream
  //  * @returns {Observable<NbAuthSimpleToken>}
  //  */
  // onTokenChange(): Observable<NbAuthToken> {
  //   console.log("onTokenChange - ", this.tokenService.tokenChange());
  //   return this.tokenService.tokenChange();
  // }

  // /**
  //  * Returns authentication status stream
  //  * @returns {Observable<boolean>}
  //  */
  // onAuthenticationChange(): Observable<boolean> {
  //   console.log("onAuthenticationChange - ");
  //   return this.onTokenChange()
  //     .pipe(map((token: NbAuthToken) => token.isValid()));
  // }

  // /**
  //  * Authenticates with the selected strategy
  //  * Stores received token in the token storage
  //  *
  //  * Example:
  //  * authenticate('email', {email: 'email@example.com', password: 'test'})
  //  *
  //  * @param strategyName
  //  * @param data
  //  * @returns {Observable<NbAuthResult>}
  //  */
  // authenticate(strategyName: string, data?: any): Observable<NbAuthResult> {
  //   console.log("authenticate");
  //   return this.getStrategy(strategyName).authenticate(data)
  //     .pipe(
  //       switchMap((result: NbAuthResult) => {
  //         console.log("result - ", result);
  //         return this.processResultToken2(result);
  //       }),
  //     );
  // }

  // /**
  //  * Registers with the selected strategy
  //  * Stores received token in the token storage
  //  *
  //  * Example:
  //  * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
  //  *
  //  * @param strategyName
  //  * @param data
  //  * @returns {Observable<NbAuthResult>}
  //  */
  // register(strategyName: string, data?: any): Observable<NbAuthResult> {
  //   console.log("register" );
  //   return this.getStrategy(strategyName).register(data)
  //     .pipe(
  //       switchMap((result: NbAuthResult) => {
  //         console.log("result - ", result);
  //         return this.processResultToken2(result);
  //       }),
  //     );
  // }


  // /**
  //  * Sign outs with the selected strategy
  //  * Removes token from the token storage
  //  *
  //  * Example:
  //  * logout('email')
  //  *
  //  * @param strategyName
  //  * @returns {Observable<NbAuthResult>}
  //  */
  // logout(strategyName: string): Observable<NbAuthResult> {
  //   console.log("logout");
  //   return this.getStrategy(strategyName).logout()
  //     .pipe(
  //       switchMap((result: NbAuthResult) => {
  //         console.log("result - ", result);
  //         if (result.isSuccess()) {
  //           this.tokenService.clear()
  //             .pipe(map(() => result));
  //         }
  //         return observableOf(result);
  //       }),
  //     );
  // }

  // /**
  //  * Sends forgot password request to the selected strategy
  //  *
  //  * Example:
  //  * requestPassword('email', {email: 'email@example.com'})
  //  *
  //  * @param strategyName
  //  * @param data
  //  * @returns {Observable<NbAuthResult>}
  //  */
  // requestPassword(strategyName: string, data?: any): Observable<NbAuthResult> {
  //   console.log("requestPassword");
  //   return this.getStrategy(strategyName).requestPassword(data);
  // }

  // /**
  //  * Tries to reset password with the selected strategy
  //  *
  //  * Example:
  //  * resetPassword('email', {newPassword: 'test'})
  //  *
  //  * @param strategyName
  //  * @param data
  //  * @returns {Observable<NbAuthResult>}
  //  */
  // resetPassword(strategyName: string, data?: any): Observable<NbAuthResult> {
  //   console.log("resetPassword");
  //   return this.getStrategy(strategyName).resetPassword(data);
  // }

  // /**
  //  * Sends a refresh token request
  //  * Stores received token in the token storage
  //  *
  //  * Example:
  //  * refreshToken('email', {token: token})
  //  *
  //  * @param {string} strategyName
  //  * @param data
  //  * @returns {Observable<NbAuthResult>}
  //  */
  // refreshToken(strategyName: string, data?: any): Observable<NbAuthResult> {
  //   console.log("refreshToken");
  //   return this.getStrategy(strategyName).refreshToken(data)
  //     .pipe(
  //       switchMap((result: NbAuthResult) => {
  //         console.log("result - ", result);
  //         return this.processResultToken2(result);
  //       }),
  //     );
  // }

  // /**
  //  * Get registered strategy by name
  //  *
  //  * Example:
  //  * getStrategy('email')
  //  *
  //  * @param {string} provider
  //  * @returns {NbAbstractAuthProvider}
  //  */
  // protected getStrategy(strategyName: string): NbAuthStrategy {
  //   console.log("getStrategy");
  //   const found = this.strategies.find((strategy: NbAuthStrategy) => strategy.getName() === strategyName);

  //   if (!found) {
  //     throw new TypeError(`There is no Auth Strategy registered under '${strategyName}' name`);
  //   }

  //   return found;
  // }

  // private processResultToken2(result: NbAuthResult) {
  //   console.log("processResultToken2 - ", result);
  //   if (result.isSuccess() && result.getToken()) {
  //     console.log("token1 - ", result.getToken());
  //     return this.tokenService.set(result.getToken())
  //       .pipe(
  //         map((token: NbAuthToken) => {
  //           console.log("token2 - ", token);
  //           return result;
  //         }),
  //       );
  //   }

  //   return observableOf(result);
  // }



}
