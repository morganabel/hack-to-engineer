import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.scss']
})
export class DatalistComponent implements OnInit {
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  collections = FirestoreCollection;

  constructor() { }

  ngOnInit() {
  }

}
