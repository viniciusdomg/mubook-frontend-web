import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  todosUsuarios(): Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(`${this.apiUrl}`);
  }

  cadastrar(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.apiUrl}`, { usuario });
  }

  buscarPorId(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUrl}/${id}`);
  }

  atualizar(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.apiUrl}/${usuario.id}`, { usuario });
  }

  solicitarRedefinicaoSenha(email: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/password`, { email });
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
