import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { CsFundamental } from '@app/fundamentals/csfundamental';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-fundamentals-home',
  templateUrl: './fundamentals-home.component.html',
  styleUrls: ['./fundamentals-home.component.scss']
})
export class FundamentalsHomeComponent implements OnInit {
  fundamentals$: Observable<FirestoreDoc<CsFundamental>[]>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  collections = FirestoreCollection;

  constructor(private firestore: FirestoreService) { 
    this.fundamentals$ = this.firestore.query$<CsFundamental>(FirestoreCollection.Fundamentals, ref => ref.orderBy("name"));
  }

  ngOnInit() {
  }

}
