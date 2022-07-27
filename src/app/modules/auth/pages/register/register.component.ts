import {Component} from '@angular/core';
import {RouteNames} from "../../../../shared/constants/route-names";
import {AuthService} from "../../../../core/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string;
  password: string;
  loading: boolean;

  constructor(private authService: AuthService,
              private toast: ToastrService,
              private router: Router) {
    this.email = "";
    this.password = "";
    this.loading = false;
  }

  submit(): void {
    this.authService.signUpWithEmailAndPassword(this.email, this.password).then(() => {
      this.toast.success('Bienvenido');
      this.router.navigate([RouteNames.TODO_LIST]);
    }).catch(reason => {
      this.toast.error(reason);
    }).finally(() => this.loading = false);
  }

  signUpGoogle(): void {
    this.loading = true;
    this.authService.signInProvider("google.com").then(() => {
      this.toast.success('Bienvenido');
      this.router.navigate([RouteNames.TODO_LIST]);
    }).catch(reason => {
      this.toast.error(reason);
    }).finally(() => this.loading = false)
  }
}
