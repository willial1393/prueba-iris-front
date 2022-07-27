import {IModel} from '../interfaces/i-model';

export class Task extends IModel {
  done?: boolean;
  userId?: string;
  label?: string;
  list?: string;
}
