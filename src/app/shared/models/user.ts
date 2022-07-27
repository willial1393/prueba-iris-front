import {IModel} from '../interfaces/i-model';

export class User extends IModel {
  fullName?: string;
  email?: string;
  picture?: string;
  isAdmin?: boolean;
  isClient?: boolean;
}
