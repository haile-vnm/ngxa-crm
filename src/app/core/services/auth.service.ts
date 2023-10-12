import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService
  ) { }

  login(email: string, password: string) {
    return this.apiService.login(email, password);
  }
}
