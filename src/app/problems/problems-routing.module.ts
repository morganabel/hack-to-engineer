import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { ProblemViewComponent } from '@app/problems/problem-view/problem-view.component';
import { ProblemsHomeComponent } from '@app/problems/problems-home/problems-home.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/problems', pathMatch: 'full' },
    { path: 'problems', component: ProblemsHomeComponent, data: { title: extract('Problems') } },
    { path: 'problems/:id', component: ProblemViewComponent, data: { title: extract('Problems') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemsRoutingModule { }
