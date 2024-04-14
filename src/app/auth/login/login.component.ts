import { ChangeDetectorRef, Component, Inject  } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbLoginComponent } from '@nebular/auth';
import { UsuarioLogin } from '../auth.model';
import { AuthService } from '../auth.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

// TODO: Limpiar - Mantener Nebular?

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {

  user: UsuarioLogin;

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService,
    protected router: Router,
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
  ) {
    super(service, options, cd, router)
  }

  tryLogin(): void {
    this.authService.login(this.user)
      .subscribe({
        next: () => {
          this.toastrService.show('Logueado correctamente', "¡Correcto!", { status: "success" });
          this.router.navigate(['/pages/dashboard']);
        },
        error: e => {
          console.error("Login error", e);
          console.log(this.showMessages.success, this.errors, !this.submitted);
          this.errors[0] = e.error.details || e.error.message || 'Error al loguear';
          this.toastrService.show(e.error.details || e.error.message || 'Error al loguear', 'Error', { status: "danger" });
        }
      });
  }

  // login(): void {
  //   this.errors = [];
  //   this.messages = [];
  //   this.submitted = true;

  //   this.authService.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
  //     this.submitted = false;

  //     if (result.isSuccess()) {
  //       this.messages = result.getMessages();
  //     } else {
  //       this.errors = result.getErrors();
  //     }

  //     const redirect = result.getRedirect();
  //     if (redirect) {
  //       setTimeout(() => {
  //         return this.router.navigateByUrl(redirect);
  //       }, this.redirectDelay);
  //     }
  //     this.cd.detectChanges();
  //   });
  // }
}
