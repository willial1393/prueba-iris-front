import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {RouteNames} from "../../../../shared/constants/route-names";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  loading: boolean;

  constructor(private toast: ToastrService,
              private authService: AuthService,
              private router: Router) {
    this.email = "";
    this.password = "";
    this.loading = false;
  }

  submit() {
    this.loading = true;
    this.authService.signInWithEmailAndPassword(
      this.email, this.password
    ).then(() => {
      this.toast.success('Bienvenido');
      this.router.navigate([RouteNames.TODO_LIST]);
    }).catch(reason => {
      this.toast.error(reason);
    }).finally(() => this.loading = false)
  }

  signInGoogle(): void {
    this.loading = true;
    this.authService.signInProvider("google.com").then(() => {
      this.toast.success('Bienvenido');
      this.router.navigate([RouteNames.TODO_LIST]);
    }).catch(reason => {
      this.toast.error(reason);
    }).finally(() => this.loading = false)
  }

  goToRegister() {
    this.router.navigate([RouteNames.AUTH, RouteNames.AUTH_REGISTER]);
  }

  recoveryPassword() {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (this.email.match(validRegex)) {
      this.loading = true;
      this.authService.recoverPassword(this.email).catch(reason => {
        this.toast.error(reason);
      }).finally(() => this.loading = false);
    } else {
      this.toast.error('Ingresa un email valido');
    }
  }
}
