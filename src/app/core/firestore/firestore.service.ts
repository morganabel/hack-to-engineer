import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { 
  AngularFirestore, 
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentChangeAction
} from 'angularfire2/firestore';
import { CollectionReference, Query, DocumentReference } from '@firebase/firestore-types';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  generateId() {
    return this.db.createId();
  }

  getById$<T>(colName: string, id: string): Observable<FirestoreDoc<T>> {
    return this.db.collection(colName).doc(id).snapshotChanges()
      .map((a) => {
        const data = a.payload.data() as T;
        const id = a.payload.id;
        const collection = colName;
        const ref = a.payload.ref;
        return { id, collection, data, ref };
      });
  }

  query$<T>(colName: string, queryFn?: (ref: CollectionReference) => Query): Observable<FirestoreDoc<T>[]> {
    return this.db.collection(colName, queryFn).snapshotChanges()
      .map((actions: DocumentChangeAction[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as T;
          const id = a.payload.doc.id;
          const collection = colName;
          const ref = a.payload.doc.ref;
          return { id, collection, data, ref };
        });
      });
  }

  getSubCollection$<T>(parentDoc: FirestoreDoc<any>, subColName: string, queryFn?:  (ref: CollectionReference) => Query): Observable<FirestoreDoc<T>[]> {
    return this.db.collection(parentDoc.collection).doc(parentDoc.id).collection(subColName, queryFn).snapshotChanges()
      .map((actions) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as T;
          const id = a.payload.doc.id;
          const collection = subColName;
          const ref = a.payload.doc.ref;
          return { id, collection, data, ref };
        });
      });
  }

  replace<T>(colName: string, doc: FirestoreDoc<T>): Promise<void> {
    this.setMetaData(doc.data);
    return this.db.collection(colName).doc(doc.id).update(doc.data);
  }

  partialUpdate<T>(colName: string, docId: string, data: Partial<T>): Promise<void> {
    this.setMetaData(data);
    return this.db.collection(colName).doc(docId).update(data);
  }

  partialUpdateByRef<T>(ref: DocumentReference, data: Partial<T>): Promise<void> {
    this.setMetaData(data);
    return ref.update(data);
  }

  add<T>(colName: string, doc: T): Promise<DocumentReference> {
    this.setMetaData(doc)
    return this.db.collection(colName).add(doc);
  }

  upsert<T>(colName: string, id: string, doc: Partial<T>): Promise<void> {
    this.setMetaData(doc);
    return this.db.collection(colName).doc(id).set(doc, { merge: true });
  }

  addToSubCollection<T>(parentDoc: FirestoreDoc<any>, subColName: string, doc: T) {
    this.setMetaData(doc);
    return this.db.collection(parentDoc.collection).doc(parentDoc.id).collection(subColName).add(doc);
  }

  private setMetaData(data: {}) {
    data["lastUpdate"] = firebase.firestore.FieldValue.serverTimestamp();
  }
}
