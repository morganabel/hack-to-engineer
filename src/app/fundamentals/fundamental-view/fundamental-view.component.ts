import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { CsFundamental } from '@app/fundamentals/csfundamental';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';

@Component({
  selector: 'app-fundamental-view',
  templateUrl: './fundamental-view.component.html',
  styleUrls: ['./fundamental-view.component.scss']
})
export class FundamentalViewComponent implements OnInit {
  fundamental$: Observable<FirestoreDoc<CsFundamental>>
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
    this.fundamental$ = this.firestore.getById$<CsFundamental>(FirestoreCollection.Fundamentals, this.id)
      .do((doc) => {
        this.titleService.setTitle(doc.data.name);
      });
  }
}
