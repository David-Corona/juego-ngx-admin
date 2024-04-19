import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// TODO - Export?
import { NbCardModule, NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';



@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,

    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    Ng2SmartTableModule
  ],
  declarations: [
    UsersListComponent,

  ],
})
export class UsersModule {
}
