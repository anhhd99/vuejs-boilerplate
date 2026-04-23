import { httpClient } from '@/core';
import { IResponse } from '@/core/interfaces';

class AuthService {
  async login(username: string, password: string): Promise<IResponse> {
    return httpClient.post('/auth/login', {
      username,
      password,
    }) as Promise<IResponse>;
  }

  async refreshToken(): Promise<IResponse> {
    const res = await httpClient.post('auth/refresh-token');
    return res.data;
  }
}

export const authService = new AuthService();
