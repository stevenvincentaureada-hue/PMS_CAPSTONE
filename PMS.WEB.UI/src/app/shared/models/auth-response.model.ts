export interface AuthUser {
  id: number;
  email: string;
  role: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}
