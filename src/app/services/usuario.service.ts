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
    return this.http.post(`${this.apiUrl}`, { ...usuario }, {responseType: 'text'});
  }

  buscarPorId(id: number) {
    return this.http.get<UsuarioResponseModel>(`${this.apiUrl}${id}`);
  }

  // atualizar(usuario: UsuarioRequestModel): Observable<UsuarioRequestModel> {
  //   return this.http.put<UsuarioRequestModel>(`${this.apiUrl}/${usuario.id}`, { usuario });
  // }

  solicitarRedefinicaoSenha(email: string): Observable<string> {
    return this.http.patch<string>(`${this.apiUrl}/password`, { email });
  }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}${id}`, {responseType: 'text'});
  }

  deleteSelect(ids: number[]): Observable<string> {
    return this.http.request('delete', `${this.apiUrl}all`, { body: ids, responseType: 'text' });
  }
}
