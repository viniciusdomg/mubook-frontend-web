import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-cadastro-login',
  imports: [
    FormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './cadastro-login.component.html',
  styleUrl: './cadastro-login.component.css'
})
export class CadastroLoginComponent {

  senhaVisivel = false;

  toggleSenha(input: HTMLInputElement) {
    this.senhaVisivel = !this.senhaVisivel;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }
}
