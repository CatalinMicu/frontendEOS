import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginData, RegisterData } from '../../services/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  isRegisterMode = false;
  errorMessage = '';

  loginData: LoginData = { email: '', password: '' };
  registerData: RegisterData = { username: '', birthDate: '', email: '', password: '' };

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/my-tasks']);
    }
  }

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
      next: (token) => {
        if (!token) {
          this.errorMessage = "Invalid credentials.";
          return;
        }
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
      next: (token) => {
        if (!token) {
          this.errorMessage = "Invalid credentials.";
          return;
        }
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Authentication failed.';
      },
    });
  }
}
