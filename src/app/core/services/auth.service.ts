import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { UsersService } from './users.service';

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
    private userService: UsersService,
    private authorizationService: AuthorizationService
  ) {}

  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap(user => {
        this.userService.setCurrent(user);
        this.authorizationService.load().subscribe();
        this.loggedIn$.next(true);
      })
    );
  }
}
