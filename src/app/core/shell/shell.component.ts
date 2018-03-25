import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';

import { I18nService } from '../i18n.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '@app/appstate';
import { AuthService } from '@app/core/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from '@app/user/user';
import { MatSlideToggleChange } from '@angular/material';
import { AuthActions } from '@app/core/auth.actions';
import { FirestoreDoc } from '@app/core/firestore/firestore-doc';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  query: string;
  canEdit$: Observable<boolean>;
  currentUser: User;

  constructor(private router: Router,
              private titleService: Title,
              private media: ObservableMedia,
              private i18nService: I18nService,
              private ngRedux: NgRedux<IAppState>,
              private auth: AuthService,
              private authActions: AuthActions) { }

  ngOnInit() {
    this.canEdit$ = this.ngRedux.select(['auth', 'user'])
      .map((user: User) => {
        this.currentUser = user;
        return this.auth.canEdit(user);
      });
  }

  onEditModeChange(event: MatSlideToggleChange) {
    this.ngRedux.dispatch(this.authActions.toggleEditMode(event.checked));
  }

  onSearchSelect(event: FirestoreDoc<any>) {
    // Get route from collection.

    //this.router.navigate();
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
