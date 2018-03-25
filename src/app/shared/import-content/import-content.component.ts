import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { LinkItemDialogComponent } from '@app/shared/link-item/link-item-dialog/link-item-dialog.component';

@Component({
  selector: 'app-import-content',
  templateUrl: './import-content.component.html',
  styleUrls: ['./import-content.component.scss']
})
export class ImportContentComponent implements OnInit {
  @Input() collection: FirestoreCollection;
  @Input() parentDoc: FirestoreDoc<any>;
  @Input() key: string;
  @Output() onLink = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private firestore: FirestoreService) { }

  ngOnInit() {
  }

  start(event: any) {
    const dialogRef = this.dialog.open(LinkItemDialogComponent, { data: { collection: this.collection } });

    dialogRef.afterClosed().subscribe((item: FirestoreDoc<any>) => {
      if (item && item.id && item.data) {
        this.linkImport(item).then(() => {
          let output = {};
          output[this.key] = item.id;
          this.onLink.emit(output);
        });
      }
    });
  }

  linkImport(item: FirestoreDoc<any>) {
    let update = {};
    update[this.key] = item.id;

    return this.firestore.partialUpdate(this.parentDoc.collection, this.parentDoc.id, update);
  }
}
