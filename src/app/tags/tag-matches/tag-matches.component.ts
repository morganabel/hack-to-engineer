import { Component, OnInit, Input } from '@angular/core';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { TagData } from '@app/tags/tag-data';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { GenerateTagId } from '@app/tags/generate-tag-id.function';
import { Observable } from 'rxjs/Observable';
import { SearchService } from '@app/core/search.service';
import { CollectionRouterService } from '@app/core/collection-router.service';

@Component({
  selector: 'app-tag-matches',
  templateUrl: './tag-matches.component.html',
  styleUrls: ['./tag-matches.component.scss']
})
export class TagMatchesComponent implements OnInit {
  @Input() tag: FirestoreDoc<TagData>;
  matches$: Observable<FirestoreDoc<any>[]>;

  constructor(private search: SearchService, private collectionRouter: CollectionRouterService) { }

  ngOnInit() {
    const compoundId = GenerateTagId(this.tag.collection, this.tag.id);

    this.matches$ = Observable
      .fromPromise(this.search.queryByFacet("", "data.tagIndex", compoundId))
      .map(response => {
        return response.hits;
      });
  }

  routeItem(doc: FirestoreDoc<any>) {
    return this.collectionRouter.routeToDoc(doc);
  }
}
