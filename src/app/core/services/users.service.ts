import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, of, switchMap, tap } from 'rxjs';
import User from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private current$ = new BehaviorSubject<User | undefined>(undefined)
  private users$ = new BehaviorSubject<User[] | undefined>(undefined);

  constructor(
    private apiService: ApiService
  ) {}

  setCurrent(user: User) {
    this.current$.next(user);
  }

  getCurrent() {
    return this.current$;
  }

  loadUsers() {
    return this.apiService.getUsers().pipe(
      tap(users => this.users$.next(users))
    );
  }

  getUsers() {
    return this.users$.asObservable();
  }

  getUser(id: string) {
    return this.users$.pipe(
      filter(Boolean),
      switchMap(users => of(users.find(user => user.id === id))))
  }
}
