import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData, LoginService } from '../../services/login-service';
import {
  RegisterData,
  RegisterService,
} from '../../services/register-service';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  private loginService = inject(LoginService);
  private registerService = inject(RegisterService);
  private router = inject(Router);

  isRegisterMode = false;
  errorMessage = '';

  loginData: LoginData = { email: '', password: '' };
  registerData: RegisterData = { username: '', birthDate: '', email: '', password: '' };

  ngOnInit(): void {
    if (this.loginService.isLoggedIn) {
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

    this.registerService.register(this.registerData).subscribe({
      next: (response) => {
        this.loginService.saveToken(response);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Register failed.';
      },
    });
  }

  authenticate(): void {
    this.errorMessage = '';

    this.loginService.login(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Authentication failed.';
      },
    });
  }

}
