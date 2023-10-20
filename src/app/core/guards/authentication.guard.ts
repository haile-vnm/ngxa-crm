import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authenticationGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(AuthService).authenticated.pipe(
    tap(authenticated => {
      if (!authenticated) {
        router.navigate(['auth', 'login']);
      }
    }),
    
  )
}
