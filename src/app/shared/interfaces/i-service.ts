import {firstValueFrom, Observable} from 'rxjs';
import {IModel} from './i-model';
import {AngularFirestore, CollectionReference, Query} from "@angular/fire/compat/firestore";
import {DateUtils} from "../utils/date-utils";

export class IService<Model extends IModel> {
  collection: string;

  constructor(public angularFirestore: AngularFirestore, collection: string) {
    this.collection = collection;
  }

  get(query?: (ref: CollectionReference) => Query): Promise<Model[]> {
    return new Promise(async (resolve, reject) => {
      if (query) {
        firstValueFrom(this.angularFirestore.collection(this.collection, query).get())
          .then((value => resolve(value.docs.map(data => data.data() as Model))))
          .catch(reason => reject(reason));
      } else {
        firstValueFrom(this.angularFirestore.collection(this.collection).get())
          .then(value => resolve(value.docs.map(data => data.data() as Model)))
          .catch(reason => reject(reason));
      }
    });
  }

  getById(id: string): Promise<Model> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.angularFirestore.collection(this.collection).doc(id).get())
        .then(value => resolve(value.data() as Model))
        .catch(reason => reject(reason));
    });
  }

  getChanges(query?: (ref: CollectionReference) => Query): Observable<Model[]> {
    if (query) {
      return this.angularFirestore.collection(this.collection, query).valueChanges() as Observable<Model[]>;
    } else {
      return this.angularFirestore.collection(this.collection).valueChanges() as Observable<Model[]>;
    }
  }

  getByIdChanges(id: string): Observable<Model> {
    return this.angularFirestore.collection(this.collection).doc(id).valueChanges() as Observable<Model>;
  }

  insert(model: Model, id?: string): Promise<Model> {
    if (id) {
      return new Promise((resolve, reject) => {
        model.id = id;
        model.updated = DateUtils.currentTimestamp();
        this.angularFirestore.collection(this.collection).doc(id).set({
          ...model.getObjectFirebase(),
          created: DateUtils.currentTimestamp()
        })
          .then(() => {
            resolve(model);
          })
          .catch(reason => reject(reason));
      });
    } else {
      return new Promise((resolve, reject) => {
        this.angularFirestore.collection(this.collection).add({
          ...model.getObjectFirebase(),
          created: DateUtils.currentTimestamp()
        })
          .then((val) => {
            model.id = val.id;
            model.updated = DateUtils.currentTimestamp();
            val.update({
              id: val.id,
              updated: DateUtils.currentTimestamp()
            })
              .then(() => resolve(model))
              .catch(reason => reject(reason));
          })
          .catch(reason => reject(reason));
      });
    }
  }

  update(model: Model): Promise<Model> {
    return new Promise((resolve, reject) => {
      this.angularFirestore.collection(this.collection).doc(model.id).update({
        ...model.getObjectFirebase(),
        updated: DateUtils.currentTimestamp()
      })
        .then(() => {
          model.updated = DateUtils.currentTimestamp();
          resolve(model);
        })
        .catch(reason => reject(reason));
    });
  }
}
