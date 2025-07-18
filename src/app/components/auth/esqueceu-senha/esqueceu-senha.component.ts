import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { EsqueceuSenhaService } from '../../../services/esqueceu.service';

@Component({
  selector: 'app-cadastro-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    SweetAlert2Module
  ],
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.css'
})
export class EsqueceuSenhaComponent {

  usuarioModel = {
    cpf: ''
  };

  constructor(
    private esqueceuSenhaService: EsqueceuSenhaService,
    private router: Router
  ) {}

  enviarEmailRedefinicaoSenha() {
    const cpf = this.usuarioModel.cpf?.trim();

    if (!cpf || cpf.length < 11) {
      void Swal.fire('Erro', 'Informe um CPF válido com 11 dígitos.', 'error');
      return;
    }

    this.esqueceuSenhaService.solicitarRedefinicaoSenha(cpf).subscribe({
      next: () => {
        void Swal.fire({
          title: 'Sucesso',
          text: 'Instruções de redefinição de senha enviadas para o CPF informado.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
    this.router.navigate(['/redefinir-senha']);
  });
      },
      error: (error) => {
        console.error(error);
        void Swal.fire('Erro', 'Não foi possível enviar a solicitação. Verifique o CPF informado.', 'error');
      }
    });
  }
}
