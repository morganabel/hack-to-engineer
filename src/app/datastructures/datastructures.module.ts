import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatastructuresRoutingModule } from './datastructures-routing.module';
import { DataStructureViewComponent } from './data-structure-view/data-structure-view.component';
import { DataStructureComponent } from './data-structure/data-structure.component';
import { CoreModule } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { DataStructuresHomeComponent } from './data-structures-home/data-structures-home.component';
import { OperationsComponent } from './operations/operations.component';
import { OperationComponent } from './operations/operation/operation.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    SharedModule,
    DatastructuresRoutingModule
  ],
  declarations: [DataStructureViewComponent, DataStructureComponent, DataStructuresHomeComponent, OperationsComponent, OperationComponent],
  exports: [ DataStructureComponent, DataStructuresHomeComponent, OperationComponent ]
})
export class DatastructuresModule { }
