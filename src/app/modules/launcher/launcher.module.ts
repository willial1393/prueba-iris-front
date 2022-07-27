import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LauncherRoutingModule} from './launcher-routing.module';
import {LauncherComponent} from './layout/launcher.component';


@NgModule({
  declarations: [
    LauncherComponent
  ],
  imports: [
    CommonModule,
    LauncherRoutingModule
  ]
})
export class LauncherModule {
}
