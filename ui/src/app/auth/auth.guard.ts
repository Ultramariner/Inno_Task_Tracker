import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const kc = auth.getKeycloak();

  await kc.updateToken(5).catch(() => kc.login());

  if (kc.token) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

