import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { RecentDoc } from '@app/recent/recent-doc';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit {
  mostRecent$: Observable<FirestoreDoc<RecentDoc>[]>

  constructor(private firestore: FirestoreService) {
    this.mostRecent$ = this.firestore.query$<RecentDoc>(FirestoreCollection.DataStructures, ref => ref.orderBy("createdAt"));
  }

  ngOnInit() {
  }

}
