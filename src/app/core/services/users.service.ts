import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private current = new BehaviorSubject<User | undefined>(undefined)
  constructor() {}

  setCurrent(user: User) {
    this.current.next(user);
  }

  getCurrent() {
    return this.current;
  }
}
