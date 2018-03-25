import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { TagsHomeComponent } from '@app/tags/tags-home/tags-home.component';
import { TagViewComponent } from '@app/tags/tag-view/tag-view.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/tags', pathMatch: 'full' },
    { path: 'tags', component: TagsHomeComponent, data: { title: extract('Tags') } },
    { path: 'tags/:id', component: TagViewComponent, data: { title: extract('Tags') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
