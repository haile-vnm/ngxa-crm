import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { ListComponent } from './components/list/list.component';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [UsersComponent, ListComponent, UserComponent],
  exports: [UsersComponent]
})
export class UsersModule { }
