import { Component, OnInit, OnDestroy } from '@angular/core';
import { TagData } from '@app/tags/tag-data';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { Title } from '@angular/platform-browser';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { select } from '@angular-redux/store';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss']
})
export class TagViewComponent implements OnInit, OnDestroy {
  private tagSubscription: Subscription;
  tag$: Observable<FirestoreDoc<TagData>>;
  tag: FirestoreDoc<TagData>;
  @select(['auth', 'editMode']) editMode$: Observable<boolean>;
  id: string;

  constructor(private route: ActivatedRoute, private firestore: FirestoreService, private titleService: Title, private snackBar: MatSnackBar) {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      this.init();
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.tagSubscription)
      this.tagSubscription.unsubscribe();
  }

  init() {
    this.tag$ = this.firestore.getById$<TagData>(FirestoreCollection.Tags, this.id);

    this.tagSubscription = this.tag$
      .subscribe((next) => {
        this.tag = next;
        this.titleService.setTitle(next.data.name);
      }, (err) => {
        
      });
  }

  onSave(event: any) {
    Object.assign(this.tag.data, event);
    return this.firestore.partialUpdate(this.tag.collection, this.tag.id, event).then(() => {
      this.snackBar.open("Saved Successfully", "", { duration: 1500 });
    });
  }
}
