import { Component, OnInit, Input } from '@angular/core';
import { DataStructure } from '@app/datastructures/datastructure';
import { Observable } from 'rxjs/Observable';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { mergeDeep } from '@app/utils/merge.functions';
import { select } from '@angular-redux/store';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-data-structure',
  templateUrl: './data-structure.component.html',
  styleUrls: ['./data-structure.component.scss']
})
export class DataStructureComponent implements OnInit {
  objectKeys = Object.keys;
  @Input() dataStructure: FirestoreDoc<DataStructure>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  editEnabled = false;
  collections = FirestoreCollection;

  constructor(private firestore: FirestoreService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    
  }

  onSave(event: any) {
    Object.assign(this.dataStructure.data, event);
    return this.firestore.partialUpdate(FirestoreCollection.DataStructures, this.dataStructure.id, event).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }

  onAddOperation(event: any) {
    console.log(event);
  }

  onAdd(event: any) {
    mergeDeep(this.dataStructure.data, event);
    return this.firestore.replace(FirestoreCollection.DataStructures, this.dataStructure).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }

  toggleEdit(event: any) {
    this.editEnabled = !this.editEnabled;
  }
}
