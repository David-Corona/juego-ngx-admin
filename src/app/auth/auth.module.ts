import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NbAuthJWTToken, NbAuthModule, NbOAuth2AuthStrategy, NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions, getDeepFromObject } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpErrorResponse } from '@angular/common/http';


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

    // TODO
    // NbAuthModule.forRoot({
    //   strategies: [
    //     // DOCS: https://akveo.github.io/nebular/docs/auth/nbpasswordauthstrategy
    //     NbPasswordAuthStrategy.setup({
    //       name: 'email',
    //       baseEndpoint: 'http://localhost:3000/api/admin/auth', // TODO - Change for env
    //       login: {
    //         endpoint: '/login',
    //         method: 'post',
    //         // redirect: {
    //         //   success: '/',
    //         //   failure: null,
    //         // },
    //         defaultErrors: ['Login/Email combination is not correct, please try again.'],
    //         defaultMessages: ['You have been successfully logged in.'],
    //       },
    //       register: {
    //         endpoint: '/registro',
    //         method: 'post',
    //       },
    //       requestPass: {
    //         endpoint: '/forgot-password',
    //         method: 'post',
    //       },
    //       resetPass: {
    //         endpoint: '/reset-password',
    //         method: 'post',
    //       },
    //       refreshToken: {
    //         endpoint: '/refresh-token',
    //         method: 'post',
    //       },
    //       logout: {
    //         endpoint: '/logout',
    //         method: 'post',
    //       },
    //       token: {
    //         class: NbAuthJWTToken,
    //         key: 'data.accessToken', // this parameter tells where to look for the token
    //       },
    //       // redirect: {
    //       //   success: '/', // welcome page path
    //       //   failure: null, // stay on the same page
    //       // },
    //       errors: {
    //         // key: 'details',
    //         getter: (module: string, res: HttpErrorResponse, options: NbPasswordAuthStrategyOptions) => {
    //           const errorDetails = getDeepFromObject(res.error, 'details', null);
    //           if (errorDetails !== null) {
    //             return errorDetails;
    //           } else {
    //             return getDeepFromObject(res.error, 'message', options.errors.key);
    //           }
    //         }
    //       },
    //       messages: {
    //         key: 'message',
    //         // getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
    //         //   res.body,
    //         //   options.messages.key,
    //         //   options[module].defaultMessages,
    //         // ),
    //       }


    //     }),
    //   ],
    //   forms: {},
    // }),

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
