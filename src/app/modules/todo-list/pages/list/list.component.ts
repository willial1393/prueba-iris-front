import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../../../shared/models/task";
import {TaskService} from "../../../../core/services/task.service";
import {UserService} from "../../../../core/services/user.service";
import {User} from "../../../../shared/models/user";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  selectList: string;
  label: string;
  user?: User;
  loading: boolean;
  listNames: string[];

  get filterTasks(): Task[] {
    if (this.selectList == 'Todas') {
      return this.tasks;
    }
    return this.tasks.filter(value => value.list == this.selectList);
  }

  private userSubscription?: Subscription;
  private tasksSubscription?: Subscription;

  constructor(private taskService: TaskService,
              private userService: UserService,
              private toast: ToastrService,
              private authService: AuthService) {
    this.tasks = [];
    this.selectList = 'Todas';
    this.label = '';
    this.listNames = ['Todas', 'Urgente', 'Estudio', 'Casa', 'Otro'];
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.tasksSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.$user.subscribe(value => {
      this.user = value
      if (value) {
        this.tasksSubscription?.unsubscribe();
        this.tasksSubscription = this.taskService.getChanges(ref => ref.where('userId', "==", value?.id)).subscribe(tasks => {
          this.tasks = tasks;
        });
      }
    });
  }

  addTask(): void {
    this.loading = true;
    const task = new Task();
    task.list = this.selectList;
    task.done = false;
    task.label = this.label;
    task.userId = this.user?.id;

    this.taskService.insert(task).then((_) => {
      this.toast.success('Tarea agregada');
      this.label = '';
    }).catch(reason => this.toast.error(reason))
      .finally(() => this.loading = false);
  }

  async closeSession(): Promise<void> {
    await this.authService.signOut();
    window.location.reload();
  }

  updateTask(task: Task): void {
    this.loading = true;
    task.done = !task.done;
    this.taskService.update(new Task(task))
      .catch(reason => {
        task.done = !task.done;
        this.toast.error(reason);
      })
      .finally(() => this.loading = false);
  }

  removeTask(task: Task) {
    this.loading = true;
    this.taskService.deleteById(task.id!)
      .then(_ => this.toast.success('Tarea eliminada'))
      .catch(reason => this.toast.error(reason))
      .finally(() => this.loading = false);
  }
}
