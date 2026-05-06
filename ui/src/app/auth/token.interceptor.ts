import { HttpInterceptorFn } from '@angular/common/http';
import { getKeycloak } from './keycloak-init';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = getKeycloak();
  const token = keycloak?.token;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
