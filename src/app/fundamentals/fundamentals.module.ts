import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalsHomeComponent } from './fundamentals-home/fundamentals-home.component';
import { FundamentalViewComponent } from './fundamental-view/fundamental-view.component';
import { FundamentalComponent } from './fundamental/fundamental.component';
import { FundamentalsRoutingModule } from '@app/fundamentals/fundamentals-routing.module';
import { CoreModule } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    SharedModule,
    FundamentalsRoutingModule
  ],
  declarations: [FundamentalsHomeComponent, FundamentalViewComponent, FundamentalComponent],
  exports: [FundamentalsHomeComponent, FundamentalViewComponent, FundamentalComponent]
})
export class FundamentalsModule { }
