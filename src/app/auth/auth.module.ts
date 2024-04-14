import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NbAuthJWTToken, NbAuthModule, NbOAuth2AuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    // TODO - Eliminar?
    NbAuthModule.forRoot({
      strategies: [
        // DOCS: https://akveo.github.io/nebular/docs/auth/nbpasswordauthstrategy
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3000/api/auth', // TODO - Change for env
          login: {
            endpoint: '/login',
            method: 'post',
          },
          register: {
            endpoint: '/registro',
            method: 'post',
          },
          requestPass: {
            endpoint: '/forgot-password',
            method: 'post',
          },
          resetPass: {
            endpoint: '/reset-password',
            method: 'post',
          },
          refreshToken: {
            endpoint: '/refresh-token',
            method: 'post',
          },
          logout: {
            endpoint: '/logout',
            method: 'post',
          },
          token: {
            class: NbAuthJWTToken,
            key: 'data.accessToken', // this parameter tells where to look for the token
          },
          // redirect: {
          //   success: '/', // welcome page path
          //   failure: null, // stay on the same page
          // },
        }),
      ],
      forms: {},
    }),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent
  ],
})
export class NgxAuthModule {
}
