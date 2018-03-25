import { Component, OnInit, Input } from '@angular/core';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { BaseFirestoreData } from '@app/datamodels/base-firestore-data';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { debounce as _debounce } from 'lodash-es';

@Component({
  selector: 'app-item-status',
  templateUrl: './item-status.component.html',
  styleUrls: ['./item-status.component.scss']
})
export class ItemStatusComponent implements OnInit {
  @Input() parentDoc: FirestoreDoc<BaseFirestoreData>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  currentStatus = false;
  debouncedUpdateParentDoc: () => void;

  constructor(private firestore: FirestoreService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentStatus = this.parentDoc.data.isComplete && this.parentDoc.data.isComplete === true;
    this.debouncedUpdateParentDoc = _debounce(this.updateParentDoc, 2000);
  }

  onStatusChange(event: MatSlideToggleChange) {
    this.currentStatus = event.checked;
    this.debouncedUpdateParentDoc();
  }

  updateParentDoc() {
    const data: Partial<BaseFirestoreData> = { isComplete: this.currentStatus };
    this.firestore.partialUpdateByRef<BaseFirestoreData>(this.parentDoc.ref, data).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }
}
