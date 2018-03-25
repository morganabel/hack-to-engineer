import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Problem } from '@app/problems/problem';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { Title } from '@angular/platform-browser';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.scss']
})
export class ProblemViewComponent implements OnInit {
  problem$: Observable<FirestoreDoc<Problem>>;
  id: string;

  constructor(private route: ActivatedRoute, private firestore: FirestoreService, private titleService: Title) {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      this.init();
    })
  }

  ngOnInit() {
  }

  private init() {
    this.problem$ = this.firestore.getById$<Problem>(FirestoreCollection.Problems, this.id)
      .do((doc) => {
        this.titleService.setTitle(doc.data.name);
      });
  }

}
