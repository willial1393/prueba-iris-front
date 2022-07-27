import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../shared/models/user";
import {IService} from "../../shared/interfaces/i-service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService extends IService<User> {

  private readonly dataSource = new BehaviorSubject<User>(new User());
  $user = this.dataSource.asObservable();

  constructor(angularFirestore: AngularFirestore) {
    super(angularFirestore, 'users');
  }

  changeUser(user: User): void {
    this.dataSource.next(user);
  }
}
