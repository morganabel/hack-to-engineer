import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { AlgorithmsHomeComponent } from '@app/algorithms/algorithms-home/algorithms-home.component';
import { AlgorithmViewComponent } from '@app/algorithms/algorithm-view/algorithm-view.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/algorithms', pathMatch: 'full' },
    { path: 'algorithms', component: AlgorithmsHomeComponent, data: { title: extract('Algorithms') } },
    { path: 'algorithms/:id', component: AlgorithmViewComponent, data: { title: extract('Algorithm') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlgorithmsRoutingModule { }
