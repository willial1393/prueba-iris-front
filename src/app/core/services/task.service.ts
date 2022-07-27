import {Injectable} from '@angular/core';
import {IService} from "../../shared/interfaces/i-service";
import {Task} from "../../shared/models/task";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends IService<Task> {

  constructor(angularFirestore: AngularFirestore) {
    super(angularFirestore, 'tasks');
  }
}
