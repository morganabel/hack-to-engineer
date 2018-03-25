import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '@app/appstate';
import { AuthService } from '@app/core/auth.service';
import { User } from '@app/user/user';
import { Observable } from 'rxjs/Observable';
import { GenerateMapUpdate } from '@app/core/gen-map-update.function';
import { KEY_VALUE_SEPERATOR } from '@app/shared/keyvalueseperator';
import { SearchBoxComponent } from '@app/shared/search-box/search-box.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @ViewChild('search') searchBox: SearchBoxComponent;
  objectKeys = Object.keys;
  @Input() key: string = "tags";
  @Input() parentDoc: FirestoreDoc<any>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>; 

  constructor(private firestore: FirestoreService) {
    
  }

  ngOnInit() {

  }

  tagSelected(doc: FirestoreDoc<any>) {
    const generatedId = `${doc.collection}${KEY_VALUE_SEPERATOR}${doc.id}`;

    const update = GenerateMapUpdate(this.parentDoc.data, this.key, generatedId, doc.data.name);
    this.firestore.partialUpdateByRef(this.parentDoc.ref, update)
      .then()
      .then(() => {
        this.searchBox.reset();
      });
  }
}
