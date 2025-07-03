import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioRequestModel} from '../../models/gerenciar-usuarios/usuario.request.model';
import {UsuarioService} from '../../services/usuario.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-gerenciar-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.css'
})
export class GerenciarUsuariosComponent {

  // @ts-ignore
  usuarioRequest: UsuarioRequestModel;
  selectedUserIds: number[] = [];
  filters = { nome: '', cpf: '', genero: '' };
  offset = 0;
  limit = 20;

  constructor(private usuario: UsuarioService, public router: Router) {}

  // ngOnInit() {
  //   this.loadUsers();
  // }

  // loadUsers() {
  //   this.userService.getUsers(this.offset, this.limit, this.filters).subscribe(data => {
  //     this.users = data;
  //   });
  // }
  //
  // applyFilters() {
  //   this.offset = 0;
  //   this.loadUsers();
  // }
  //
  // nextPage() {
  //   this.offset += this.limit;
  //   this.loadUsers();
  // }
  //
  // prevPage() {
  //   if (this.offset >= this.limit) {
  //     this.offset -= this.limit;
  //     this.loadUsers();
  //   }
  // }
  //
  // toggleSelection(id: number) {
  //   if (this.selectedUserIds.includes(id)) {
  //     this.selectedUserIds = this.selectedUserIds.filter(i => i !== id);
  //   } else {
  //     this.selectedUserIds.push(id);
  //   }
  // }
  //
  // deleteSelected() {
  //   if (this.selectedUserIds.length > 0) {
  //     this.userService.deleteUsers(this.selectedUserIds).subscribe(() => {
  //       this.selectedUserIds = [];
  //       this.loadUsers();
  //     });
  //   }
  // }

  createUser() {
    this.usuario.cadastrar(this.usuarioRequest).subscribe(() => {
      // this.loadUsers();
    });
  }
}
