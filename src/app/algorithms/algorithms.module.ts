import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmsRoutingModule } from '@app/algorithms/algorithms-routing.module';
import { CoreModule } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { AlgorithmsHomeComponent } from './algorithms-home/algorithms-home.component';
import { AlgorithmViewComponent } from './algorithm-view/algorithm-view.component';
import { AlgorithmComponent } from './algorithm/algorithm.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    SharedModule,
    AlgorithmsRoutingModule
  ],
  declarations: [AlgorithmsHomeComponent, AlgorithmViewComponent, AlgorithmComponent],
  exports: [AlgorithmsHomeComponent, AlgorithmViewComponent, AlgorithmComponent]
})
export class AlgorithmsModule { }
