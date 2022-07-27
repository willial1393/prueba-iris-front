import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoListRoutingModule} from './todo-list-routing.module';
import {TodoListComponent} from './layout/todo-list.component';
import {ListComponent} from './pages/list/list.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    TodoListComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ]
})
export class TodoListModule {
}
