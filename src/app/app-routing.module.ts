import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Page404Component} from "./core/pages/page404/page404.component";
import {FirebaseGuard} from "./core/guards/firebase-guard";
import {canActivate} from "@angular/fire/auth-guard";
import {RouteNames} from "./shared/constants/route-names";

const routes: Routes = [
  {
    path: RouteNames.LAUNCHER,
    loadChildren: () => import('./modules/launcher/launcher.module').then(m => m.LauncherModule)
  },
  {
    path: RouteNames.AUTH,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    ...canActivate(FirebaseGuard.redirectLoggedInToDoList)
  },
  {
    path: RouteNames.TODO_LIST,
    loadChildren: () => import('./modules/todo-list/todo-list.module').then(m => m.TodoListModule),
    ...canActivate(FirebaseGuard.redirectUnauthorizedToAuth)
  },
  {
    path: '**', component: Page404Component
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
