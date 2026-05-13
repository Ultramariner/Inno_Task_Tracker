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

  async isAuthenticatedAsync(): Promise<boolean> {
    await this.kc.updateToken(5).catch(() => this.kc.login());
    return !!this.kc.token;
  }

  isAuthenticated(): boolean {
    return !!this.kc.token;
  }

  getKeycloak() {
    return this.kc;
  }
}
