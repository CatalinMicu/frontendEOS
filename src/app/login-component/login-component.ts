import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  LoginData,
  RegisterData,
} from '../../services/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isRegisterMode = false;
  errorMessage = '';

  loginData: LoginData = {
    email: '',
    password: '',
  };

  registerData: RegisterData = {
    username: '',
    birthDate: '',
    email: '',
    password: '',
  };

  showRegisterForm(): void {
    this.isRegisterMode = true;
    this.errorMessage = '';
  }

  showLoginForm(): void {
    this.isRegisterMode = false;
    this.errorMessage = '';
  }

  register(): void {
    this.errorMessage = '';

    this.authService.registerAndLogin(this.registerData).subscribe({
      next: (response) => {
        if (!response.user) {
          this.errorMessage = response.response;
          return;
        }

        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Register failed.';
      },
    });
  }

  authenticate(): void {
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        if (!response.user) {
          this.errorMessage = response.response;
          return;
        }

        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Authentication failed.';
      },
    });
  }
}
