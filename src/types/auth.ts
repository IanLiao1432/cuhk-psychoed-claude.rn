export interface AuthToken {
  token: string;
  refreshToken: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  status: 'ACTIVE' | 'DISABLED';
  treatmentDate?: string;
  firstLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  isLoading: boolean;
  isSignedIn: boolean;
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}
