import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

import { UsersService } from '../users.service';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

  users: any; // TODO - User type

  // settings = {
  //   // add: {
  //   //   addButtonContent: '<i class="nb-plus"></i>',
  //   //   createButtonContent: '<i class="nb-checkmark"></i>',
  //   //   cancelButtonContent: '<i class="nb-close"></i>',
  //   // },
  //   // edit: {
  //   //   editButtonContent: '<i class="nb-edit"></i>',
  //   //   saveButtonContent: '<i class="nb-checkmark"></i>',
  //   //   cancelButtonContent: '<i class="nb-close"></i>',
  //   // },
  //   // delete: {
  //   //   deleteButtonContent: '<i class="nb-trash"></i>',
  //   //   confirmDelete: true,
  //   // },
  //   columns: {
  //     id: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     username: {
  //       title: 'Username',
  //       type: 'string',
  //     },
  //     email: {
  //       title: 'E-mail',
  //       type: 'string',
  //     },
  //   },
  // };

  constructor(
    private usersService: UsersService,
    private toastrService: NbToastrService,
    // protected router: Router,

  ) { }


  ngOnInit(): void {

    // TODO - Resolver
    this.usersService.getUsuarios()
    .subscribe({
      next: resp => {
        this.users = resp;
      },
      error: e => {
        console.error("Error al listar usuarios: ", e);
        this.toastrService.show(e.error.details || e.error.message || 'Error al listar usuarios', 'Error', { status: "danger" });
      }
    })


  }





}
