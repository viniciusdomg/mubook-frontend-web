import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioRequestModel } from '../models/gerenciar-usuarios/usuario.request.model';
import { Observable } from 'rxjs';
import {PageResponseModel} from '../models/page.response.model';
import {UsuarioResponseModel} from '../models/gerenciar-usuarios/usuario.response.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuario/';

  constructor(private http: HttpClient) {}

  pageUsuarios(offset: number, limit: number, filters: any) {
    const params : any ={
      offset: offset,
      limit: limit,
    }
    if (filters) {
      if (filters.nome) params.nome = filters.nome;
      if (filters.cpf) params.cpf = filters.cpf;
      if (filters.genero) params.genero = filters.genero;
    }

    return this.http.get<PageResponseModel<UsuarioResponseModel>>(`${this.apiUrl}`, {params});
  }

  cadastrar(usuario: UsuarioRequestModel){
    return this.http.post<UsuarioRequestModel>(`${this.apiUrl}`, { ...usuario });
  }

  buscarPorId(id: number) {
    return this.http.get<UsuarioRequestModel>(`${this.apiUrl}/${id}`);
  }

  // atualizar(usuario: UsuarioRequestModel): Observable<UsuarioRequestModel> {
  //   return this.http.put<UsuarioRequestModel>(`${this.apiUrl}/${usuario.id}`, { usuario });
  // }

  solicitarRedefinicaoSenha(email: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/password`, { email });
  }

  // deletar(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }

  deleteSelect(ids: number[]): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/all`, { body: ids });
  }
}
