import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentListComponent } from './recent-list/recent-list.component';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
  ],
  declarations: [RecentListComponent],
  exports: [RecentListComponent]
})
export class RecentModule { }
