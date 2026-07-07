import { getAccessToken, getSetupToken, clearAllTokens } from "./token";

export function isFirstTimeUser(): boolean {
  return !!getAccessToken() && !!getSetupToken();
}

export function isLoggedIn(): boolean {
  return !!getAccessToken();
}

export function hasSetupToken(): boolean {
  return !!getSetupToken();
}

export function logout(): void {
  clearAllTokens();
  window.location.href = "/login";
}
