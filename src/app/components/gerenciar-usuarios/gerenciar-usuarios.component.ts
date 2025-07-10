import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioRequestModel, USER_ROLES } from '../../models/gerenciar-usuarios/usuario.request.model';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageResponseModel } from '../../models/page.response.model';
import { UsuarioResponseModel } from '../../models/gerenciar-usuarios/usuario.response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gerenciar-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.css'
})
export class GerenciarUsuariosComponent implements OnInit{

  usuarioRequest: UsuarioRequestModel = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    tipo: ''
  };

  usuariosPage: PageResponseModel<UsuarioResponseModel> | null = null;

  usuarioResponse: UsuarioResponseModel | null = null;

  selectedUserIds: number[] = [];

  filters = { nome: '', cpf: ''};
  offset = 0;
  limit = 20;

  showModal = false;
  showModalVisualizar = false;

  constructor(private service: UsuarioService, public router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.service.pageUsuarios(this.offset, this.limit, this.filters).subscribe({
      next: data => {
        this.usuariosPage = data;
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar usuários',
          text: 'Não foi possível carregar a lista de usuários.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    });
  }

  loadUserBydId(id: number){
    this.service.buscarPorId(id).subscribe({
      next: data => {
        this.usuarioResponse = data;
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar usuários',
          text: 'Não foi possível carregar a lista de usuários.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    })
  }

  applyFilters() {
    this.offset = 0;
    this.loadUsers();
  }

  nextPage() {
    this.offset += this.limit;
    this.loadUsers();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadUsers();
    }
  }

  toggleSelection(id: number) {
    if (this.selectedUserIds.includes(id)) {
      this.selectedUserIds = this.selectedUserIds.filter(i => i !== id);
    } else {
      this.selectedUserIds.push(id);
    }
  }

  selectAll(event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    if (checked && this.usuariosPage?.content) {
      this.selectedUserIds = this.usuariosPage.content.map(u => u.id);
    } else {
      this.selectedUserIds = [];
    }
  }

  deleteSelected() {
    if (this.selectedUserIds.length > 0) {
      void Swal.fire({
        title: 'Tem certeza?',
        text: 'Deseja mesmo deletar estes usuários? Esta ação não pode ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, deletar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.service.deleteSelect(this.selectedUserIds).subscribe({
            next: res => {
              void Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: res && true ? res : 'Usuários deletados com sucesso!',
                timer: 2000,
                timerProgressBar: true,
              });
              this.selectedUserIds = [];
              this.loadUsers();
            },
            error: err => {
              void Swal.fire({
                icon: 'error',
                title: 'Erro ao excluir usuários',
                text: 'Não foi possível excluir os usuários selecionados.',
                footer: err?.message ? `<small>${err.message}</small>` : ''
              });
            }
          });
        }
      })
    } else {
      void Swal.fire({
        icon: 'info',
        title: 'Nenhum usuário selecionado',
        text: 'Por favor, selecione ao menos um usuário para excluir.'
      });
    }
  }

  deleteOne(id: number) {
    void Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja mesmo deletar este usuário? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.deleteOne(id).subscribe({
          next: res => {
            void Swal.fire({
              icon: 'success',
              title: 'Deletado!',
              text: res || 'O usuário foi deletado com sucesso.',
              timer: 2000,
              timerProgressBar: true
            });
            this.selectedUserIds = this.selectedUserIds.filter(i => i !== id);
            this.loadUsers();
          },
          error: err => {
            void Swal.fire({
              icon: 'error',
              title: 'Erro ao excluir usuário',
              text: 'Não foi possível excluir o usuário.',
              footer: err?.message ? `<small>${err.message}</small>` : ''
            });
          }
        });
      }
    });
  }

  createUser() {
    this.service.cadastrar(this.usuarioRequest).subscribe({
      next: res => {
        void Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: res && true ? res : 'Usuário cadastrado com sucesso!',
          timer: 2000,
          timerProgressBar: true,
        });
        this.loadUsers();
        this.closeModal();
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar usuário',
          text: 'Não foi possível cadastrar o usuário.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    });
  }

  openModal() {
    this.usuarioRequest = {
      id: 0,
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      tipo: ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.showModalVisualizar = false;
  }

  openModalVisualizar(id: number) {
    this.loadUserBydId(id);
    this.showModalVisualizar = true;
  }

  protected readonly open = open;
  protected readonly USER_ROLES = USER_ROLES;
}
