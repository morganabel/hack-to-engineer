import { NgModule, Optional, SkipSelf, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { ShellComponent } from './shell/shell.component';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { ComplexityPipe } from '@app/core/complexity.pipe';
import { AuthActions } from '@app/core/auth.actions';
import { AuthService } from '@app/core/auth.service';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { FormsModule } from '@angular/forms';
import { MonacoLoaderService } from '@app/core/monaco-loader.service';
import { SearchService } from '@app/core/search.service';
import { HtmlService } from '@app/core/html/html.service';
import { CodeService } from './code/code.service';
import { SharedModule } from '@app/shared';
import { SearchBarComponent } from './shell/search-bar/search-bar.component';

export function monacoLoaderFactory(ngZone: NgZone) {
  return new MonacoLoaderService(ngZone);
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ShellComponent,
    ComplexityPipe,
    SearchBarComponent
  ],
  providers: [
    I18nService,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    {
      provide: MonacoLoaderService,
      deps: [NgZone],
      useFactory: monacoLoaderFactory
    },
    AuthActions,
    AuthService,
    FirestoreService,
    SearchService,
    HtmlService,
    CodeService
  ],
  exports: [
    ComplexityPipe
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
