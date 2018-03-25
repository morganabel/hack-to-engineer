import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { Observable } from 'rxjs/Observable';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Problem } from '@app/problems/problem';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { mergeDeep } from '@app/utils/merge.functions';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '@app/appstate';
import { User } from '@app/user/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  objectKeys = Object.keys;
  @Input() problem: FirestoreDoc<Problem>;
  collections = FirestoreCollection;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;

  constructor(private firestore: FirestoreService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  onSave(event: any) {
    Object.assign(this.problem.data, event);
    return this.firestore.partialUpdate(FirestoreCollection.Problems, this.problem.id, event).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }

  onAddSolution(event: any) {
    console.log(event);
  }

  onAdd(event: any) {
    mergeDeep(this.problem.data, event);
    return this.firestore.replace(FirestoreCollection.Problems, this.problem).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }
}
