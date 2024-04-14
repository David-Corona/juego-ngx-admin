import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthService, NbRegisterComponent } from '@nebular/auth';
import { NuevoUsuario } from '../auth.model';
import { AuthService } from '../auth.service';
import { NbToastrService } from '@nebular/theme';
// import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../../auth.options';
// import { getDeepFromObject } from '../../helpers';

// import { NbAuthService } from '../../services/auth.service';
// import { NbAuthResult } from '../../services/auth-result';

// TODO: Limpiar - Mantener Nebular?


@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',

})
export class RegisterComponent extends NbRegisterComponent {

  // redirectDelay: number = 0;
  // showMessages: any = {};
  // strategy: string = '';

  // submitted = false;
  // errors: string[] = [];
  // messages: string[] = [];
  user: NuevoUsuario;
  // socialLinks: NbAuthSocialLink[] = [];

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService,
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
      super(service, options, cd, router);

    // this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    // this.showMessages = this.getConfigValue('forms.register.showMessages');
    // this.strategy = this.getConfigValue('forms.register.strategy');
    // this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  createAccount(): void {
    this.authService.registrar(this.user).subscribe({
      next: resp => {
        console.log("RESP - ", resp);
        this.toastrService.show(resp.message || 'Cuenta creada correctamente', "¡Correcto!", { status: "success" });
        this.router.navigate(['/auth/login']);
      },
      error: e => {
        console.error(e);
        this.toastrService.show(e.error.message, 'Error', { status: "danger" });
      }
    });
  }

  // getConfigValue(key: string): any {
  //   return getDeepFromObject(this.options, key, null);
  // }
}
