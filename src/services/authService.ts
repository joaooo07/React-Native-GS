// src/services/authService.ts
import { api } from './api';
import { LoginResponse } from '@/types/auth';

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export async function loginRequest(data: LoginPayload): Promise<LoginResponse> {
  const response = await api.post('/auth/login', data);
  return response.data;
}

export async function signupRequest(data: SignupPayload): Promise<LoginResponse> {
  const response = await api.post('/auth/register', data);
  return response.data;
}
