import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { DataStructure } from '@app/datastructures/datastructure';
import { Observable } from 'rxjs/Observable';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-data-structures-home',
  templateUrl: './data-structures-home.component.html',
  styleUrls: ['./data-structures-home.component.scss']
})
export class DataStructuresHomeComponent implements OnInit {
  dataStructures$: Observable<FirestoreDoc<DataStructure>[]>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  collections = FirestoreCollection;

  constructor(private firestore: FirestoreService) {
    this.dataStructures$ = this.firestore.query$<DataStructure>(FirestoreCollection.DataStructures, ref => ref.orderBy("name"));
  }

  ngOnInit() {
  }

}
