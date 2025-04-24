import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  senhaVisivel = false;
  erroLogin: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  toggleSenha(input: HTMLInputElement) {
    this.senhaVisivel = !this.senhaVisivel;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.erroLogin = 'Email ou senha inválidos';
        console.error(err);
      }
    });
  }
}
