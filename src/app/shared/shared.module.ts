import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './components/loading/loading.component';
import {NgxLoadingModule} from "ngx-loading";


@NgModule({
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule
  ]
})
export class SharedModule {
}
