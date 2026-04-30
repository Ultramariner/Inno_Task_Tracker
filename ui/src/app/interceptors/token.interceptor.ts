import { HttpInterceptorFn } from '@angular/common/http';
import { getKeycloak } from '../auth/keycloak-init';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const kc = getKeycloak();
  const token = kc?.token;

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
