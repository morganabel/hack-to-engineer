import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsHomeComponent } from './tags-home/tags-home.component';
import { TagsRoutingModule } from '@app/tags/tags-routing.module';
import { CoreModule } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { NewTagComponent } from './new-tag/new-tag.component';
import { NgStringPipesModule } from 'ngx-pipes';
import { TagViewComponent } from './tag-view/tag-view.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    SharedModule,
    TagsRoutingModule,
    NgStringPipesModule
  ],
  declarations: [TagsHomeComponent, NewTagComponent, TagViewComponent],
  exports: [TagsHomeComponent, TagViewComponent]
})
export class TagsModule { }
