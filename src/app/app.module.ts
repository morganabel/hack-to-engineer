import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { ClipboardModule } from 'ngx-clipboard';
//import { NgAisModule } from 'angular-instantsearch';
import { UserModule } from '@app/user/user.module';
import { DatastructuresModule } from '@app/datastructures/datastructures.module';
import { LoginModule } from '@app/login/login.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@app/store/store.module';
import { AboutModule } from '@app/about/about.module';
import { AlgorithmsModule } from '@app/algorithms/algorithms.module';
import { ProblemsModule } from '@app/problems/problems.module';
import { FundamentalsModule } from '@app/fundamentals/fundamentals.module';
import { TagsModule } from '@app/tags/tags.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    //NgAisModule.forRoot(),
    CoreModule,
    SharedModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    ClipboardModule,
    DatastructuresModule,
    AlgorithmsModule,
    ProblemsModule,
    FundamentalsModule,
    TagsModule,
    //AboutModule,
    LoginModule,
    UserModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
