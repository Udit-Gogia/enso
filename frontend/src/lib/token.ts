// src/lib/token.ts

const ACCESS_TOKEN_KEY = "enso_access_token";
const SETUP_TOKEN_KEY = "enso_setup_token";

// ── Access Token ──────────────────────────────────────────────
export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// ── Setup Token ───────────────────────────────────────────────
export function getSetupToken(): string | null {
  return localStorage.getItem(SETUP_TOKEN_KEY);
}

export function setSetupToken(token: string): void {
  localStorage.setItem(SETUP_TOKEN_KEY, token);
}

export function clearSetupToken(): void {
  localStorage.removeItem(SETUP_TOKEN_KEY);
}

// ── Clear All ─────────────────────────────────────────────────
export function clearAllTokens(): void {
  clearAccessToken();
  clearSetupToken();
}
