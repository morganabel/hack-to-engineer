import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { Problem } from '@app/problems/problem';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { Observable } from 'rxjs/Observable';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-problems-home',
  templateUrl: './problems-home.component.html',
  styleUrls: ['./problems-home.component.scss']
})
export class ProblemsHomeComponent implements OnInit {
  problems$: Observable<FirestoreDoc<Problem>[]>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  collections = FirestoreCollection;

  constructor(private firestore: FirestoreService) {
    this.problems$ = this.firestore.query$<Problem>(FirestoreCollection.Problems, ref => ref.orderBy("name"));
  }

  ngOnInit() {
  }

}
