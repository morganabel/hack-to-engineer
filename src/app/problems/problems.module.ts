import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from './problem/problem.component';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { ProblemsHomeComponent } from './problems-home/problems-home.component';
import { ProblemsRoutingModule } from '@app/problems/problems-routing.module';
import { CoreModule } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { SolutionsComponent } from './solutions/solutions.component';
import { SolutionComponent } from './solutions/solution/solution.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    SharedModule,
    ProblemsRoutingModule
  ],
  declarations: [ProblemComponent, ProblemViewComponent, ProblemsHomeComponent, SolutionsComponent, SolutionComponent],
  exports: [ProblemComponent, ProblemViewComponent, ProblemsHomeComponent, SolutionsComponent, SolutionComponent]
})
export class ProblemsModule { }
