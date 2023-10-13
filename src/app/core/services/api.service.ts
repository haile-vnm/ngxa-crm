import { Injectable } from '@angular/core';
import USERS from '../../__mock-data/users';
import { of, throwError } from 'rxjs';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private users: User[] = USERS;

  constructor() { }

  login(email: string, _password: string) {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return throwError(() => ({ code: 401, message: 'Email/password is invalid' }));
    }

    return of(user);
  }

  getUsers() {
    return of([...this.users]);
  }

  updateUser(id: string, userData: Partial<User>) {
    let updatedUser: User | undefined;
    this.users.forEach(user => {
      if (id === user.id) {
        Object.assign(user, userData);
        updatedUser = { ...user };
      }
    });

    if (updatedUser) {
      return of(updatedUser);
    }
    
    return throwError(() => ({ code: 404, message: 'User not found' }))
  }
}
