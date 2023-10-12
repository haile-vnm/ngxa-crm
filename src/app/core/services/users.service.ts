import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import User from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private current = new BehaviorSubject<User | undefined>(undefined)
  constructor(
    private apiService: ApiService
  ) {}

  setCurrent(user: User) {
    this.current.next(user);
  }

  getCurrent() {
    return this.current;
  }

  getUsers() {
    return this.apiService.getUsers();
  }
}
