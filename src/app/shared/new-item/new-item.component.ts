import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { User } from '@app/user/user';
import { IAppState } from '@app/appstate';
import { DocumentReference } from '@firebase/firestore-types';
import { BaseFirestoreData } from '@app/datamodels/base-firestore-data';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  @Input() collection: FirestoreCollection;
  @Input() key?: string;
  @Input() parentDoc?: FirestoreDoc<any>;
  @Input() isSubDocument? = false;
  @Output() onCreate = new EventEmitter<any>();
  form: FormGroup;
  showForm = false;
  submitting = false;
  user$: Observable<any>
  currentUser: User;

  constructor(protected ngRedux: NgRedux<IAppState>, protected firestore: FirestoreService, protected formBuilder: FormBuilder) {
    this.user$ = ngRedux.select(['auth', 'user']);

    this.user$.do((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  start($event: any) {
    this.showForm = true;
    this.submitting = false;
    this.initForm();
  }

  submit($event: any) {
    this.submitting = true;
    return this.addToCollection(this.form).then((docRef) => {
      let output = {};
      const key = (this.key) ? this.key : this.collection;
      output[key] = {};
      output[key][docRef.id] = this.form.controls.name.value;
      this.onCreate.emit(output);
      this.cancel(null);
    }).then(() => {
      this.submitting = false;
    });
  }

  cancel($event: any) {
    this.showForm = false;
    this.form.reset();
  }

  private addToCollection(formGroup: FormGroup): Promise<DocumentReference> {
    const doc = this.createDocFromForm(formGroup);

    if (this.currentUser) {
      doc["author"] = { id: this.currentUser.id, name: this.currentUser.displayName };
    }

    if (this.isSubDocument) {
      doc['order'] = Date.now();
      return this.firestore.addToSubCollection(this.parentDoc, this.collection, doc);
    } else {
      if (this.parentDoc) {
        const parentTypeField = (this.collection === this.parentDoc.collection) ? "related" : this.parentDoc.collection;
        doc[parentTypeField] = {};
        doc[parentTypeField][this.parentDoc.id] = this.parentDoc.data.name;
      }

      return this.firestore.add(this.collection, doc);
    }
  }

  protected initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  protected createDocFromForm(formGroup: FormGroup): Partial<BaseFirestoreData> {
    return { name: formGroup.controls.name.value };
  }
}
