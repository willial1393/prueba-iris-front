export class IModel {
  id?: string;
  created?: string;
  updated?: string;

  constructor(options?: any) {
    if (options) {
      Object.assign(this, options);
    }
  }

  getObjectFirebase(): any {
    delete this.created;
    delete this.updated;
    return this;
  }
}
