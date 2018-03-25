import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataStructureViewComponent } from '@app/datastructures/data-structure-view/data-structure-view.component';
import { Route, extract } from '@app/core';
import { DataStructuresHomeComponent } from '@app/datastructures/data-structures-home/data-structures-home.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/datastructures', pathMatch: 'full' },
    { path: 'datastructures', component: DataStructuresHomeComponent, data: { title: extract('Data Structures') } },
    { path: 'datastructures/:id', component: DataStructureViewComponent, data: { title: extract('Data Structure') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatastructuresRoutingModule { }
