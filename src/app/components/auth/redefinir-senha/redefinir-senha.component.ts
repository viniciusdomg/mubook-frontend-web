import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TrocarSenhaService } from '../../../services/trocar-senha.service';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TrocarSenhaRequestModel } from '../../../models/auth/trocar-senha.request.model';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    SweetAlert2Module
  ],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.css'
})
export class RedefinirSenhaComponent {
  redefinicao = {
    token: '',
    novaSenha: '',
    confirmarSenha: ''
  };

  constructor(
    private trocarSenhaService: TrocarSenhaService,
    private router: Router
  ) {}

  redefinirSenha() {
    const { token, novaSenha, confirmarSenha } = this.redefinicao;

    if (!token || !novaSenha || !confirmarSenha) {
      void Swal.fire('Erro', 'Todos os campos são obrigatórios.', 'error');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      void Swal.fire('Erro', 'As senhas não coincidem.', 'error');
      return;
    }

    const payload: TrocarSenhaRequestModel = {
      token: token.trim(),
      novaSenha: novaSenha.trim()
    };

    this.trocarSenhaService.trocarSenha(payload).subscribe({
      next: () => {
        void Swal.fire('Sucesso', 'Senha redefinida com sucesso!', 'success')
          .then(() => this.router.navigate(['/'])); // Redireciona ao login
      },
      error: (err) => {
        console.error(err);
        void Swal.fire('Erro', 'Não foi possível redefinir a senha. Verifique o token.', 'error');
      }
    });
  }
}
