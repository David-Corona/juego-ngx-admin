import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent, // TODO - Remove when auth components aren't extending nebular components
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'reset-password/:usuario_id/:token',
        component: ResetPasswordComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
