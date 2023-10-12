import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  constructor(
    private router: Router,
    private fb: NonNullableFormBuilder,
    private notificationService: NzNotificationService,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  submitForm() {
    if (this.validateForm.valid) {
      const { email, password } = this.validateForm.value;
      this.login(email!, password!);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private login(email: string, password: string) {
    this.authService.login(email!, password!).subscribe(user => {
      this.userService.setCurrent(user);
      this.notificationService.create(
        'success',
        'Login',
        'You have successfully logged in.'
      );
      this.router.navigate(['/']);
    }, error => {
      this.notificationService.create(
        'error',
        'Login',
        error.message
      );
    })
  }
}
