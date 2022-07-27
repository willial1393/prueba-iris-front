import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './layout/auth.component';
import {RouteNames} from "../../shared/constants/route-names";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [{
  path: '', component: AuthComponent, children: [
    {path: RouteNames.AUTH_LOGIN, component: LoginComponent},
    {path: RouteNames.AUTH_REGISTER, component: RegisterComponent},
    {path: '**', redirectTo: RouteNames.AUTH_LOGIN},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
