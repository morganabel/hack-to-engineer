import { Component, OnInit } from '@angular/core';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { Title } from '@angular/platform-browser';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss']
})
export class AlgorithmViewComponent implements OnInit {
  algorithm$: Observable<FirestoreDoc<Algorithm>>
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
    this.algorithm$ = this.firestore.getById$<Algorithm>(FirestoreCollection.Algorithms, this.id)
      .do((doc) => {
        this.titleService.setTitle(doc.data.name);
      });
  }
}
