import { Component, Input } from '@angular/core';
import User from 'src/app/core/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input({ required: true }) user: User;
}
