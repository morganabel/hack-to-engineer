import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { FundamentalsHomeComponent } from '@app/fundamentals/fundamentals-home/fundamentals-home.component';
import { FundamentalViewComponent } from '@app/fundamentals/fundamental-view/fundamental-view.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/fundamentals', pathMatch: 'full' },
    { path: 'fundamentals', component: FundamentalsHomeComponent, data: { title: extract('CS Fundamentals') } },
    { path: 'fundamentals/:id', component: FundamentalViewComponent, data: { title: extract('CS Fundamentals') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundamentalsRoutingModule { }
