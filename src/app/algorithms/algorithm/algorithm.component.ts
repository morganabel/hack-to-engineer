import { Component, OnInit, Input } from '@angular/core';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Observable } from 'rxjs/Observable';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '@app/appstate';
import { AuthService } from '@app/core/auth.service';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { User } from '@app/user/user';
import { mergeDeep } from '@app/utils/merge.functions';
import { Algorithm } from '@app/algorithms/algorithm';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.scss']
})
export class AlgorithmComponent implements OnInit {
  objectKeys = Object.keys;
  @Input() algorithm: FirestoreDoc<Algorithm>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  editEnabled = false;
  collections = FirestoreCollection;

  constructor(private firestore: FirestoreService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  onSave(event: any) {
    Object.assign(this.algorithm.data, event);
    return this.firestore.partialUpdate(this.algorithm.collection, this.algorithm.id, event).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }

  onAdd(event: any) {
    mergeDeep(this.algorithm.data, event);
    return this.firestore.replace(this.algorithm.collection, this.algorithm).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }

  toggleEdit(event: any) {
    this.editEnabled = !this.editEnabled;
  }
}
