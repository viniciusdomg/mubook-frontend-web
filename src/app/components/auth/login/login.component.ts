import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router, ) {
  }

  toggleSenha(input: HTMLInputElement) {
    this.senhaVisivel = !this.senhaVisivel;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }

  login() {
    this.router.navigate(['']);
  }
}
