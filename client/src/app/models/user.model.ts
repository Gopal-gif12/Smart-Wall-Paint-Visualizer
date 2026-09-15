export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  favoriteColors?: string[];
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
