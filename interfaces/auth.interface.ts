import { User } from './user.interface';

export interface LoginResponse {
  token: string;
  user: User;
}
export interface LoginRequest {
  email: string;
  password: string;
}
