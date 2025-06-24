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
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.css'
})
export class EsqueceuSenhaComponent {

  // @ts-ignore
  usuarioModel: UsuarioModel = {
    email: '',
  };

  senhaVisivel = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  enviarEmailRedefinicaoSenha() {
    if (!this.usuarioModel.email) {
      Swal.fire('Erro', 'Informe um e-mail válido.', 'error');
      return;
    }

    this.usuarioService.solicitarRedefinicaoSenha(this.usuarioModel.email).subscribe({
      next: () => {
        Swal.fire({
            title: 'Sucesso',
            text: 'Instruções de redefinição de senha enviadas para o e-mail.',
            icon: 'success',
            showConfirmButton: true
          }
        );
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Erro', 'Não foi possível enviar o e-mail. Verifique o e-mail informado.', 'error');
      }
    });
  }


}
