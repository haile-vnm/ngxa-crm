import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { PermissionsStore } from 'src/app/shared/modules/authorizer/public-api';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  constructor(
    private storeService: PermissionsStore,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.storeService.update({ allow: [['delete', 'user']]})
    this.userService.loadUsers().subscribe()
  }
}
