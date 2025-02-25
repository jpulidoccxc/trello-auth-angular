import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';

export const AuthGuard: CanActivateFn = () => {
  const isValidToken = inject(TokenService).isValidToken();
  const router = inject(Router);

  if (!isValidToken) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
