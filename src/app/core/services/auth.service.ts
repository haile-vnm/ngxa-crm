import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  get authenticated() {
    return this.loggedIn$.asObservable();
  }

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap(() => this.loggedIn$.next(true))
    );
  }

  canActivateGuard() {
    return this.loggedIn$.pipe(
      map(loggedIn => {
        if (loggedIn) {
          return true;
        }

        this.router.navigate(['auth', 'login']);
        return false;
      })
    );
  }
}
