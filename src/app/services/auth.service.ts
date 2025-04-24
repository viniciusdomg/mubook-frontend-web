import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios/sign_in';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<HttpResponse<{ usuario: UsuarioModel }>> {
    return this.http.post<{ usuario: UsuarioModel }>(this.apiUrl, {
      usuario: { email, password }
    }, { observe: 'response' }).pipe(
      tap(response => {
        const token = response.headers.get('Authorization')?.replace('Bearer ', '');
        if (token) {
          localStorage.setItem('token', token);
        }

        localStorage.setItem('usuario', JSON.stringify(response.body?.usuario));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getUsuario(): UsuarioModel | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }
}
