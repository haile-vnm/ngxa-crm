import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import User from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: User;
  validateForm: FormGroup<{
    email: FormControl<string>;
    role: FormControl<string>;
    name: FormControl<string>;
  }>;

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: NonNullableFormBuilder,
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
    if (this.validateForm.valid) {
      this.update(this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private update(user: Partial<User>) {

  }

  private initialForm() {
    this.validateForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      role: [this.user.role || '', [Validators.required]],
    })

  }
}
