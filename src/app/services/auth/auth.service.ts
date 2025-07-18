import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { UsuarioRequestModel } from '../../models/gerenciar-usuarios/usuario.request.model';
import { Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {AuthRequestModel} from '../../models/auth/auth.request.model';
import {AuthResponseModel} from '../../models/auth/auth.response.model';
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  login(auth: AuthRequestModel): Observable<HttpResponse<AuthResponseModel>> {
    return this.http.post<AuthResponseModel>(this.apiUrl + 'login', {
      ...auth
    }, { observe: 'response' }).pipe(
      tap(response => {
        const token = response.body?.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    void this.router.navigate(['/login']);
  }

  getUsuario(): UsuarioRequestModel | null {
    const data = localStorage.getItem('usuario');
    console.log('Dados do usuário:', data);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000); // tempo atual em segundos
      return decoded.exp && decoded.exp > now;
    } catch (e) {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): Observable<string> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get('http://localhost:8080/api/auth/role', { headers, responseType: 'text' });
  }
}
