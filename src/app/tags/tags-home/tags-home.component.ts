import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { DatalistComponent } from '@app/shared/datalist/datalist.component';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { groupBy, mergeMap, flatMap } from 'rxjs/operators';
import { TagData } from '@app/tags/tag-data';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { GroupedObservable } from 'rxjs/operators/groupBy';
import { TagType } from '@app/tags/tag-type.enum';
import { GroupByPipe } from 'ngx-pipes';

@Component({
  selector: 'app-tags-home',
  templateUrl: './tags-home.component.html',
  styleUrls: ['./tags-home.component.scss'],
  providers: [ GroupByPipe ]
})
export class TagsHomeComponent extends DatalistComponent {
  tagMap$: Observable<any>;
  objectKeys = Object.keys;

  constructor(private firestore: FirestoreService, private groupBy: GroupByPipe) { 
    super();

    this.tagMap$ = firestore.query$<TagData>(FirestoreCollection.Tags, ref => ref.orderBy("order"))
      .map(results => {
        return groupBy.transform(results, "data.tagType");
      });

    /*
    this.tags$.pipe(
      flatMap(tags => from(tags)),
      groupBy(tag => tag.data.tagType),
      mergeMap((g: GroupedObservable<TagType, FirestoreDoc<TagData>>, i) => {
        g.
      })
    )
    */
  }

  ngOnInit() {
  }

}
