import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';

@Injectable()
export class CollectionRouterService {

  constructor(private router: Router) { 
  }

  routeToDoc(doc: FirestoreDoc<any>) {
    let routeName;

    switch (doc.collection) {
      case FirestoreCollection.Algorithms:
      case FirestoreCollection.DataStructures:
      case FirestoreCollection.Fundamentals:
      case FirestoreCollection.Problems:
      case FirestoreCollection.Tags:
      default:
        routeName = `/${doc.collection}`;
        break;
    }

    return this.router.navigate([routeName, doc.id]);
  }
}
