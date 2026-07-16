import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap } from 'rxjs';

export interface RegisterData {
  username: string;
  birthDate: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  userId: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: UserResponse | null;
  response: string;
}



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  register(data: RegisterData) {
    return this.http.post<UserResponse>(
      'http://localhost:8080/users',
      data,
    );
  }

  login(data: LoginData) {
    return this.http.post<AuthResponse>(
      'http://localhost:8080/users/login',
      data,
    );
  }

  registerAndLogin(data: RegisterData) {
    return this.register(data).pipe(
      switchMap(() =>
        this.login({
          email: data.email,
          password: data.password,
        }),
      ),
    );
  }
}