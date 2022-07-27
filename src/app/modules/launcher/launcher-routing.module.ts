import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LauncherComponent} from './layout/launcher.component';
import {ChargingComponent} from "./pages/charging/charging.component";

const routes: Routes = [{
  path: '', component: LauncherComponent, children: [
    {path: '', component: ChargingComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LauncherRoutingModule {
}
