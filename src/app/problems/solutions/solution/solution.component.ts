import { Component, OnInit, Input } from '@angular/core';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Solution } from '@app/problems/solution';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '@app/appstate';
import { AuthService } from '@app/core/auth.service';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { Observable } from 'rxjs/Observable';
import { User } from '@app/user/user';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {
  @Input() solution: FirestoreDoc<Solution>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;

  constructor(private firestore: FirestoreService) {

  }

  ngOnInit() {
  }

  onSave(event: any) {
    return this.firestore.partialUpdateByRef(this.solution.ref, event);
  }
}
