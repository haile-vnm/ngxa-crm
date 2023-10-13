import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { filter, switchMap } from 'rxjs';
import User, { ROLES } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: User;
  userForm: FormGroup<{
    email: FormControl<string>;
    name: FormControl<string>;
    roles: FormControl<string[]>;
  }>;
  userRoles = ROLES;

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private nzNotiService: NzNotificationService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(params => this.userService.getUser(params['id'])),
      filter(Boolean)
    ).subscribe(user => {
      this.user = user;
      this.initialForm();
    })
  }

  submitForm() {
    if (this.userForm.valid) {
      this.update(this.userForm.value);
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  isRoleSelected(role: string) {
    return this.userForm.get('roles')?.value.includes(role)
  }

  private update(data: Partial<User>) {
    this.userService.update(this.user.id, data).subscribe({
      next: user => {
        this.user = user;
        this.nzNotiService.success('User', `Update "${this.user.name}" successfully`);
      },
      error: (error) => {
        this.nzNotiService.success('User', error.message);
      }
    })
  }

  private initialForm() {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      roles: [this.user.roles || []],
    });
  }
}
