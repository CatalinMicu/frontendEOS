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
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<UserResponse | null>(null);

  constructor() {
    const raw = localStorage.getItem('token');
    if (raw) {
      try {
      const user = JSON.parse(atob(raw.split('.')[1])) as UserResponse;
      this.currentUser.set(user);
      } catch {
        localStorage.removeItem('token');
      }
    }
  }

  get isLoggedIn(): boolean {
    return this.currentUser() != null;
  }

  register(data: RegisterData) {
    const encoded = {
      username: data.username,
      birthdate: data.birthDate,
      email: btoa(data.email),
      password: btoa(data.password),
    };
    return this.http.post('http://localhost:8080/register', encoded, {responseType: 'text'});
  }
  

  login(data: LoginData) {
    const encoded = {
      email: btoa(data.email),
      password: btoa(data.password),
    };
    return this.http.post('http://localhost:8080/login', encoded, { responseType: 'text' }).pipe(
      tap((token) => {
        if (token) {
          localStorage.setItem('token', token);
          const user = JSON.parse(atob(token.split('.')[1])) as UserResponse;
          this.currentUser.set(user);
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
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
