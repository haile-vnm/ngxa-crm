import { Injectable, OnDestroy, SimpleChange } from '@angular/core';
import { Subscription, of, switchMap } from 'rxjs';
import ProvidedPermissions from '../types/provided-permissions';
import { PermissionsStore } from './permissions-store.service';
import { Request } from '../types/permission';

@Injectable()
export class CanItService implements OnDestroy {
  private permissionSubscription: Subscription;

  constructor(
    private permissionsStore: PermissionsStore
  ) {}

  can(request: Request) {
    return this.permissionsStore.get().pipe(
      switchMap(pp => of(this.allow(pp, request)))
    );
  }

  ngOnDestroy(): void {
    this.permissionSubscription.unsubscribe();
  }

  private allow(pp: ProvidedPermissions, [reqAction, reqRi]: Request) {
    // currently, it only checks if the exactly provided have the action and ri in provided permissions or not
    // We can support Regex check in the future.
    return !!pp.allow.find(([action, ri]) => reqAction === action && reqRi === ri)
  }
}
