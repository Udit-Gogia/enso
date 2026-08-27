// src/lib/token.ts

const ACCESS_TOKEN_KEY = "enso_access_token";
const SETUP_TOKEN_KEY = "enso_setup_token";
const ROLE_KEY = "enso_role";

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

// ── Role ──────────────────────────────────────────────────────
// Client-side UI convenience only — never a security boundary.
// Real enforcement is always the backend's @PreAuthorize checks.
export function getRole(): string | null {
  return localStorage.getItem(ROLE_KEY);
}

export function setRole(role: string): void {
  localStorage.setItem(ROLE_KEY, role);
}

export function clearRole(): void {
  localStorage.removeItem(ROLE_KEY);
}

// ── Clear All ─────────────────────────────────────────────────
export function clearAllTokens(): void {
  clearAccessToken();
  clearSetupToken();
  clearRole();
}
