import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from '@app/login/login-routing.module';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    LoginRoutingModule
  ],
  entryComponents: [
    LoginComponent
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
