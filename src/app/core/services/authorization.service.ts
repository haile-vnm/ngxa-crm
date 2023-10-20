import { Injectable } from '@angular/core';
import { PermissionsStore } from 'src/app/shared/modules/authorizer';
import { ApiService } from './api.service';
import { UsersService } from './users.service';
import { filter, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private pStore: PermissionsStore,
    private apiService: ApiService,
    private userService: UsersService
  ) { }

  load() {
    return this.userService.getCurrent().pipe(
      filter(Boolean),
      switchMap(user => this.apiService.getPermissions(user.id)),
      map(permissions => this.pStore.update({ allow: permissions }))
    );
  }
}
