import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, tap } from 'rxjs';
import { PermissionsStore } from 'src/app/shared/modules/authorizer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  // private loggedIn$ = new BehaviorSubject<boolean>(true);

  get authenticated() {
    return this.loggedIn$.asObservable();
  }

  constructor(
    private apiService: ApiService,
    private permissionsStore: PermissionsStore
  ) {}

  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap(user => {
        this.loggedIn$.next(true);
        this.apiService.getPermissions(user.id)
          .subscribe(permissions => this.permissionsStore.update({ allow: permissions }));
      })
    );
  }
}
