import { NgModule, SkipSelf, Optional, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { IAppState } from '@app/appstate';
import { rootReducer } from '@app/store/reducers';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule, 
    NgReduxRouterModule.forRoot()
  ],
  declarations: []
})
export class StoreModule {
  constructor(@Optional() @SkipSelf() parentModule: StoreModule, public store: NgRedux<IAppState>, devTools: DevToolsExtension, ngReduxRouter: NgReduxRouter) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }

    const storeEnhancers = devTools.isEnabled() ?
      [ devTools.enhancer() ] :
      [];

    store.configureStore(
      rootReducer,
      {},
      [],
      storeEnhancers
    );

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
  }
}
