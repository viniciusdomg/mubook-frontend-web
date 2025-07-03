import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import {AuthRequestModel} from '../../../models/auth/auth.request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth: AuthRequestModel = {
    user: '',
    password: ''
  };

  senhaVisivel = false;
  erroLogin: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  toggleSenha(input: HTMLInputElement) {
    this.senhaVisivel = !this.senhaVisivel;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }

  login() {
      this.authService.login(this.auth).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => {
        this.erroLogin = 'Email ou senha inválidos';
        console.error(err);
      }
    });
  }
}
