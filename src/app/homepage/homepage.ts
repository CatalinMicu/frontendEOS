import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  loginService = inject(LoginService);
}
