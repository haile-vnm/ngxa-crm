import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanItPipe } from './pipe/can-it.pipe';
import { CanItService } from './services/can-it.service';
import { CanItDirective } from './directives/can-it.directive';
import { PermissionsStore } from './services/permissions-store.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CanItPipe,
    CanItDirective,
  ],
  providers: [],
  exports: [

    CanItPipe,
    CanItDirective,
  ]
})
export class AuthorizerModule {
  static forRoot(): ModuleWithProviders<AuthorizerModule> {
    return {
      ngModule: AuthorizerModule,
      providers: [
        PermissionsStore,
        CanItService,
      ],
    }
  }

  /**
   * contains all the directives, pipes, components, but does not include 
   * 
   */
  static forChild(): ModuleWithProviders<AuthorizerModule> {
    return {
      ngModule: AuthorizerModule,
      providers: [],
    }
  }
}
