import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }
}
