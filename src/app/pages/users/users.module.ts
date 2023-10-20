import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';

import { ListComponent } from './components/list/list.component';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  imports: [
    UsersRoutingModule,
    SharedModule,
  ],
  declarations: [
    ListComponent,
    UserComponent,
    EditUserComponent
  ],
  exports: []
})
export class UsersModule { }
