import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LocalStorageUtils } from '../utils/local-storage-utils';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoggedInUser {
  userId: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<LoggedInUser | null>(null);

  constructor() {
    const token = LocalStorageUtils.getItem(LocalStorageUtils.tokenKey);

    if (token) {
      try {
        const payload = token.split('.')[1];
        const user = JSON.parse(atob(payload)) as LoggedInUser;

        this.currentUser.set(user);
      } catch {
        LocalStorageUtils.deleteItem(LocalStorageUtils.tokenKey);
      }
    }
  }

  get isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  login(data: LoginData) {
    return this.http
      .post(
        'http://localhost:8080/login',
        {
          email: btoa(data.email),
          password: btoa(data.password),
        },
        {
          responseType: 'text',
        },
      )
      .pipe(tap((response) => this.saveToken(response)));
  }

  saveToken(response: string): void {
    LocalStorageUtils.setItem(LocalStorageUtils.tokenKey, response);

    const payload = response.split('.')[1];
    const user = JSON.parse(atob(payload)) as LoggedInUser;

    this.currentUser.set(user);
  }

  logout(): void {
    LocalStorageUtils.deleteItem(LocalStorageUtils.tokenKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
