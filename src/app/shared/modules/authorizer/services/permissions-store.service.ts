import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ProvidedPermissions from '../types/provided-permissions';

@Injectable()
export class PermissionsStore {
  private permissions$ = new BehaviorSubject<ProvidedPermissions>({ allow: [] });

  constructor() {
    console.log('contructor permission store service');
  }
  
  get() {
    return this.permissions$.asObservable();
  }

  update(permissions: ProvidedPermissions) {
    this.permissions$.next(permissions);
  }
}
