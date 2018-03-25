import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { DataStructure } from '@app/datastructures/datastructure';
import { Observable } from 'rxjs/Observable';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs/operator/share';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-data-structure-view',
  templateUrl: './data-structure-view.component.html',
  styleUrls: ['./data-structure-view.component.scss']
})
export class DataStructureViewComponent implements OnInit {
  isLoading = true;
  dataStructure$: Observable<FirestoreDoc<DataStructure>> = null;
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
    this.dataStructure$ = this.firestore.getById$<DataStructure>(FirestoreCollection.DataStructures, this.id)
      .do((doc) => {
        this.titleService.setTitle(doc.data.name);
      });
  }

}
