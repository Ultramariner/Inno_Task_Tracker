import Keycloak from 'keycloak-js';

let keycloak: Keycloak;

export function initializeKeycloak() {
  keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'task-tracker-realm',
    clientId: 'task-tracker-ui',
  });

  return () =>
    keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256'
    });
}

export function getKeycloak() {
  return keycloak;
}
