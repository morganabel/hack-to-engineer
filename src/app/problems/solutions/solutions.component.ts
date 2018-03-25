import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@app/appstate';
import { AuthService } from '@app/core/auth.service';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { User } from '@app/user/user';
import { Solution } from '@app/problems/solution';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Problem } from '@app/problems/problem';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {
  @Input() problem: FirestoreDoc<Problem>;
  solutions$: Observable<FirestoreDoc<Solution>[]>;
  canEdit$: Observable<boolean>;
  
  constructor(private ngRedux: NgRedux<IAppState>, private auth: AuthService, private firestore: FirestoreService) {
    this.canEdit$ = ngRedux.select(['auth', 'user'])
      .map((user: User) => {
        return auth.canEdit(user);
      });
  }

  ngOnInit() {
    this.solutions$ = this.firestore.getSubCollection$<Solution>(this.problem, FirestoreCollection.ProblemSolutions, ref => ref.orderBy("order"));
  }
}
