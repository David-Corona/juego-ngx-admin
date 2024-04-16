import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
// import { NotFoundComponent } from '../../pages/miscellaneous/not-found/not-found.component';


const routes: Routes = [{
  path: '',
  // component: PagesComponent,
  children: [
    {
      path: 'list',
      component: UsersListComponent,
    },

    // {
    //   path: '',
    //   redirectTo: 'dashboard',
    //   pathMatch: 'full',
    // },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
