import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '@app/appstate';
import { AuthService } from '@app/core/auth.service';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { User } from '@app/user/user';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { CsFundamental } from '@app/fundamentals/csfundamental';
import { Observable } from 'rxjs/Observable';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { mergeDeep } from '@app/utils/merge.functions';

@Component({
  selector: 'app-fundamental',
  templateUrl: './fundamental.component.html',
  styleUrls: ['./fundamental.component.scss']
})
export class FundamentalComponent implements OnInit {
  objectKeys = Object.keys;
  @Input() fundamental: FirestoreDoc<CsFundamental>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  editEnabled = false;
  collections = FirestoreCollection;

  constructor(private firestore: FirestoreService) {

  }

  ngOnInit() {
  }

  onSave(event: any) {
    Object.assign(this.fundamental.data, event);
    return this.firestore.partialUpdateByRef(this.fundamental.ref, event);
  }

  onAdd(event: any) {
    mergeDeep(this.fundamental.data, event);
    return this.firestore.replace(this.fundamental.collection, this.fundamental);
  }
}
