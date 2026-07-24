import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface User {
  userId: number;
  username: string;
  birthDate: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users');
  }

  getUserById(userId: number) {
    return this.http.get<User>(`http://localhost:8080/users/${userId}`);
  }
}
