import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { RecentDoc } from '@app/recent/recent-doc';
import { Observable } from 'rxjs/Observable';
import { CollectionRouterService } from '@app/core/collection-router.service';

@Component({
  selector: 'app-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit {
  mostRecent$: Observable<FirestoreDoc<RecentDoc>[]>

  constructor(private firestore: FirestoreService, private collectionRouter: CollectionRouterService) {
    this.mostRecent$ = this.firestore.query$<RecentDoc>(FirestoreCollection.MostRecent, ref => ref.orderBy("createdAt"));
  }

  ngOnInit() {
  }

  routeItem(doc: FirestoreDoc<RecentDoc>) {
    const formattedDoc: FirestoreDoc<any> = {
      id: doc.data.docId,
      collection: doc.data.docCollection,
      ref: doc.ref,
      data: {}
    };

    return this.collectionRouter.routeToDoc(formattedDoc);
  }
}
