import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, filter, first, map, of, switchMap, tap } from 'rxjs';
import User, { ROLES } from 'src/app/core/models/user';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
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
    private authorizationService: AuthorizationService,
    private router: Router,
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
    this.userService.update(this.user.id, data).pipe(
      tap(user => {
        this.user = user;
        this.nzNotiService.success('User', `Update "${this.user.name}" successfully`);
        this.userService.getCurrent().pipe(
          filter(Boolean),
          map(user => this.user.id === user.id),
          first()
        ).subscribe(updatingCurrentUser => {
          const loadPermission = updatingCurrentUser ? this.authorizationService.load() : of(undefined);
          loadPermission.subscribe(() => this.router.navigate(['..'], { relativeTo: this.activateRoute }))
        })
      }),
      catchError(error => {
        this.nzNotiService.success('User', error.message);
        return error
      })
    ).subscribe();
  }

  private initialForm() {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      roles: [this.user.roles || []],
    });
  }
}
