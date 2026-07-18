import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

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
  private router = inject(Router);

  currentUser = signal<UserResponse | null>(null);

  constructor() {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        this.currentUser.set(JSON.parse(raw));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }

  get isLoggedIn(): boolean {
    return this.currentUser() != null;
  }

  register(data: RegisterData) {
    return this.http.post<UserResponse>('http://localhost:8080/users', data);
  }

  login(data: LoginData) {
    return this.http.post<AuthResponse>('http://localhost:8080/users/login', data).pipe(
      tap((res) => {
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUser.set(res.user);
        }
      }),
    );
  }

  registerAndLogin(data: RegisterData) {
    return this.register(data).pipe(
      switchMap(() => this.login({ email: data.email, password: data.password })),
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
