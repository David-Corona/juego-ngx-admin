import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthService, NbResetPasswordComponent } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';

// TODO: Limpiar - Mantener Nebular?

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',

})
export class ResetPasswordComponent extends NbResetPasswordComponent implements OnInit {

  password1: String = "";
  password2: String = "";
  token: String = "";
  usuario_id: String = "";

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
      super(service, options, cd, router);
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
    this.usuario_id = this.route.snapshot.paramMap.get('usuario_id')!;
  }

  resetPassword(){
    this.authService.resetPassword(this.usuario_id, this.password1, this.token).subscribe({
      next: () => {
        this.toastrService.show('Contraseña actualizada', "¡Correcto!", { status: "success" });
        this.router.navigate(['/auth/login']);
      },
      error: e => {
        console.error(e);
        this.toastrService.show(e.error.message || 'Error al actualizar la contraseña', 'Error', { status: "danger" });
      }
    });
  }


}
