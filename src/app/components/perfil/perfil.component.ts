import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PerfilService} from '../../services/perfil.service';
import Swal from 'sweetalert2';
import {PerfilRequestModel} from '../../models/perfil/perfil.request.model';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  standalone: true
})
export class PerfilComponent {
  perfil!: PerfilRequestModel;
  carregando = false;

  constructor(private service: PerfilService) {}

  ngOnInit(): void {
    this.perfil = {
      id: 0,
      nome: '',
      email: '',
      dataNascimento: '',
      genero: '',
      cpf: '',
      cep: '',
      endereco: '',
      complemento: '',
      telefone: ''
    };

    this.carregarDadosPerfil();
  }

  carregarDadosPerfil(): void {
    this.service.getDados().subscribe({
      next: (data) => this.perfil = data,
      error: (err) => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar perfil',
          text: 'Não foi possível carregar seus dados. Tente novamente mais tarde.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    });
  }

  salvar(): void {

    const dados: PerfilRequestModel = this.perfil;
    this.carregando = true;

    this.service.salvar(dados).subscribe({
      next: () => {
        void Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Informações salvas com sucesso!'
        });
        this.carregando = false;
      },
      error: (err) => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Ocorreu um erro ao atualizar seu perfil.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
        this.carregando = false;
      }
    });
  }

}
