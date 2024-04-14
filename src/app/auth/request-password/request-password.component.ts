import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthService, NbRequestPasswordComponent } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

// TODO: Limpiar - Mantener Nebular?

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',

})
export class RequestPasswordComponent extends NbRequestPasswordComponent {

  emailAddress: String = "";

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService,
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
      super(service, options, cd, router);
  }




  requestReset(): void {
    this.authService.recoverPassword(this.emailAddress).subscribe({
      next: () => {
        // this.toastr.success('Email enviado correctamente');
        this.router.navigate(['/auth/login']);
      },
      error: e => {
        console.error(e);
        // this.toastr.error('Error al enviar el email');
      }
    });
  }


}
