import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CanItService } from 'src/app/shared/modules/authorizer';

export const authorizerGuardFn = (action: string, ri: string) => () => {
  const router = inject(Router);

  return inject(CanItService).can([action, ri]).pipe(
    tap(can => {
      if (!can) {
        router.navigate(['/not-authorized']);
      }
    })
  );
};
