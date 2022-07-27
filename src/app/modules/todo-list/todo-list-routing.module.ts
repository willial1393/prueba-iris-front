import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './layout/todo-list.component';
import {ListComponent} from "./pages/list/list.component";

const routes: Routes = [{
  path: '', component: TodoListComponent, children: [
    {path: '', component: ListComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule {
}
