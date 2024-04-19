import { Component } from '@angular/core';

import { MENU_ITEMS } from './modules-menu';

@Component({
  selector: 'ngx-modules',
  styleUrls: ['modules.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class ModulesComponent {

  menu = MENU_ITEMS;
}
