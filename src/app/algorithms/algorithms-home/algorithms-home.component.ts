import { Component, OnInit } from '@angular/core';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-algorithms-home',
  templateUrl: './algorithms-home.component.html',
  styleUrls: ['./algorithms-home.component.scss']
})
export class AlgorithmsHomeComponent implements OnInit {
  algorithms$: Observable<FirestoreDoc<Algorithm>[]>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  collections = FirestoreCollection;
  
  constructor(private firestore: FirestoreService) { 
    this.algorithms$ = this.firestore.query$<Algorithm>(FirestoreCollection.Algorithms, ref => ref.orderBy("name"));
  }

  ngOnInit() {
  }

}
