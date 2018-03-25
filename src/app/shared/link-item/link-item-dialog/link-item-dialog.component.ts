import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FirestoreService } from '@app/core/firestore/firestore.service';

@Component({
  selector: 'app-link-item-dialog',
  templateUrl: './link-item-dialog.component.html',
  styleUrls: ['./link-item-dialog.component.scss']
})
export class LinkItemDialogComponent implements OnInit {
  items$: Observable<FirestoreDoc<any>[]>;
  selectedOptions: any[] = [];
  filterValue: string = "";
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private firestore: FirestoreService) { 
    this.items$ = this.firestore.query$<any>(this.data.collection);
  }

  ngOnInit() {
  }

}
