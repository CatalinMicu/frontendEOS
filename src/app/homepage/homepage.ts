import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  public authService = inject(AuthService);
}
