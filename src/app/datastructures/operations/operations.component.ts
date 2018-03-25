import { Component, OnInit, Input } from '@angular/core';
import { DataStructure } from '@app/datastructures/datastructure';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Observable } from 'rxjs/Observable';
import { Operation } from '@app/datastructures/operation';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { AuthService } from '@app/core/auth.service';
import { IAppState } from '@app/appstate';
import { NgRedux } from '@angular-redux/store';
import { User } from '@app/user/user';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {
  @Input() dataStructure: FirestoreDoc<DataStructure>;
  operations$: Observable<FirestoreDoc<Operation>[]>;
  canEdit$: Observable<boolean>;
  importDoc?: FirestoreDoc<DataStructure> = null;

  constructor(private ngRedux: NgRedux<IAppState>, private auth: AuthService, private firestore: FirestoreService) {
    this.canEdit$ = ngRedux.select(['auth', 'user'])
      .map((user: User) => {
        return auth.canEdit(user);
      });
  }

  ngOnInit() {
    if (this.dataStructure.data.operationsLinkId) {
      this.operations$ = this.firestore.getById$<DataStructure>(this.dataStructure.collection, this.dataStructure.data.operationsLinkId)
        .switchMap((doc) => {
          this.importDoc = doc;
          return this.getOperations(doc);
        });
    } else {
      this.operations$ = this.getOperations(this.dataStructure);
    }
  }

  getOperations(dataStructure: FirestoreDoc<DataStructure>): Observable<FirestoreDoc<Operation>[]> {
    return this.firestore.getSubCollection$<Operation>(dataStructure, FirestoreCollection.DataStructureOperations, ref => ref.orderBy("order"));
  }
}
