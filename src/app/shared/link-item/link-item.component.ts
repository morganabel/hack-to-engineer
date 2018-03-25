import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LinkItemDialogComponent } from '@app/shared/link-item/link-item-dialog/link-item-dialog.component';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { Observable } from 'rxjs/Observable';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FirestoreService } from '@app/core/firestore/firestore.service';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})
export class LinkItemComponent implements OnInit {
  @Input() collection: FirestoreCollection;
  @Input() parentDoc: FirestoreDoc<any>;
  @Input() key?: string;
  @Output() onLink = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private firestore: FirestoreService) { }

  ngOnInit() {
  }

  start(event: any) {
    const dialogRef = this.dialog.open(LinkItemDialogComponent, { data: { collection: this.collection } });

    dialogRef.afterClosed().subscribe((item: FirestoreDoc<any>) => {
      if (item && item.id && item.data) {
        this.createTwoWayLink(item).then(() => {
          let output = {};
          const key = (this.key) ? this.key : this.collection;
          output[key] = {};
          output[key][item.id] = item.data.name;
          this.onLink.emit(output);
        });
      }
    });
  }

  private createTwoWayLink(selectedItem: FirestoreDoc<any>) {
    const key = (this.key) ? this.key : this.parentDoc.collection;

    let update = {};

    if (!selectedItem.data.hasOwnProperty(key)) {
      update[key] = {};
      update[key][this.parentDoc.id] = this.parentDoc.data.name;
    } else {
      update[`${key}.${this.parentDoc.id}`] = this.parentDoc.data.name;
    }

    return this.firestore.partialUpdate(selectedItem.collection, selectedItem.id, update);
  }
}
