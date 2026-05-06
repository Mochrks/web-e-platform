export interface User {
  userId: number;
  username: string;
  email: string;
  fullName?: string;
  employeeNumber?: string;
  phoneNumber?: string;
  role?: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    token: string;
    userId: number;
    username: string;
    email: string;
    role: string;
  };
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: User & {
    status: string;
    message: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
}
