import { Injectable } from '@angular/core';
import { getKeycloak } from './keycloak-init';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private kc = getKeycloak();

  getToken(): string | undefined {
    return this.kc?.token;
  }

  getUsername(): string | undefined {
    return this.kc?.tokenParsed?.['preferred_username'];
  }

  logout() {
    this.kc.logout();
  }

  isAuthenticated(): boolean {
    return !!this.kc?.token;
  }
}
