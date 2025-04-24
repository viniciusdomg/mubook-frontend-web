import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { UsuarioModel } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgClass,
    SweetAlert2Module
  ],
  templateUrl: './cadastro-login.component.html',
  styleUrl: './cadastro-login.component.css'
})
export class CadastroLoginComponent {

  // @ts-ignore
  usuarioModel: UsuarioModel = {
    nome: '',
    email: '',
    senha: ''
  };

  senhaVisivel = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  toggleSenha(input: HTMLInputElement) {
    this.senhaVisivel = !this.senhaVisivel;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }

  cadastrarUsuario() {
    this.usuarioService.cadastrar(this.usuarioModel).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Você será redirecionado para o login.',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro no cadastro',
          text: err?.error?.message || 'Não foi possível realizar o cadastro. Tente novamente.'
        });
      }
    });
  }

}
