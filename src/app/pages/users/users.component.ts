import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import User from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: User;

  private sub = new Subscription();
  
  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.sub.add(
      this.userService.getCurrent().subscribe(user => {
        this.user = user!;
      })
    );
  }

}
