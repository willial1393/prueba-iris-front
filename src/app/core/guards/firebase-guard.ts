import {redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {RouteNames} from "../../shared/constants/route-names";

export class FirebaseGuard {
  static redirectUnauthorizedToAuth = () => redirectUnauthorizedTo([RouteNames.AUTH]);
  static redirectLoggedInToDoList = () => redirectLoggedInTo([RouteNames.TODO_LIST]);
}
