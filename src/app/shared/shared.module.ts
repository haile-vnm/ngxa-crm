import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconsProviderModule } from '../icons-provider.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    IconsProviderModule,
    NzFormModule,
    NzNotificationModule,
    NzLayoutModule,
    NzCardModule,
    NzAvatarModule,
    NzButtonModule
  ],
  exports: [
    CommonModule,
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    IconsProviderModule,
    NzFormModule,
    NzNotificationModule,
    NzLayoutModule,
    NzCardModule,
    NzAvatarModule,
    NzButtonModule
  ]
})
export class SharedModule { }
