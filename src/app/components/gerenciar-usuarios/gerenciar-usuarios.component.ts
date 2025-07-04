import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioRequestModel, USER_ROLES} from '../../models/gerenciar-usuarios/usuario.request.model';
import {UsuarioService} from '../../services/usuario.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PageResponseModel} from '../../models/page.response.model';
import {UsuarioResponseModel} from '../../models/gerenciar-usuarios/usuario.response.model';


@Component({
  selector: 'app-gerenciar-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.css'
})
export class GerenciarUsuariosComponent {

  usuarioRequest: UsuarioRequestModel = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    tipo: ''
  };

  usuariosPage: PageResponseModel<UsuarioResponseModel> | null = null;

  selectedUserIds: number[] = [];

  filters = { nome: '', cpf: '', genero: '' };
  offset = 0;
  limit = 20;

  showModal = false;

  constructor(private service: UsuarioService, public router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.service.pageUsuarios(this.offset, this.limit, this.filters).subscribe(data => {
      this.usuariosPage = data;
    });
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
      this.service.deleteSelect(this.selectedUserIds).subscribe(() => {
        this.selectedUserIds = [];
        this.loadUsers();
      });
    }
  }

  createUser() {
    this.service.cadastrar(this.usuarioRequest).subscribe(() => {
      this.loadUsers();
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
  }

  protected readonly open = open;
  protected readonly USER_ROLES = USER_ROLES;
}
