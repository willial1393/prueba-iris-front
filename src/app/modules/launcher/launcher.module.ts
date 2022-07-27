import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LauncherRoutingModule} from './launcher-routing.module';
import {LauncherComponent} from './layout/launcher.component';
import {ChargingComponent} from './pages/charging/charging.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    LauncherComponent,
    ChargingComponent
  ],
  imports: [
    CommonModule,
    LauncherRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class LauncherModule {
}
