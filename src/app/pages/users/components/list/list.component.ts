import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import User from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

}
