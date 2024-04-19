import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { authGuard } from './auth/guards/auth.guards';
import { noAuthGuard } from './auth/guards/no-auth.guard';



export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.NgxAuthModule),
  },
  {
    path: 'modules',
    // canActivate: [authGuard],
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
  },

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
