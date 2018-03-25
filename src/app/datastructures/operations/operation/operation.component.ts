import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '@app/datastructures/operation';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { DataStructure } from '@app/datastructures/datastructure';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  @Input() operation: FirestoreDoc<Operation>;
  @Input() importDoc?: FirestoreDoc<DataStructure> = null;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;

  constructor(private firestore: FirestoreService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  onSave(event: any) {
    return this.firestore.partialUpdateByRef(this.operation.ref, event).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }
}
