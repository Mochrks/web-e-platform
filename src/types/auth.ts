export interface User {
  name: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  role: 'employee' | 'admin' | null;
}
