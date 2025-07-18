import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EsqueceuSenhaService {
  private apiUrl = 'http://localhost:8080/api/password/esqueci-senha';

  constructor(private http: HttpClient) {}

  solicitarRedefinicaoSenha(cpf: string) {
    const body = { cpf };
    return this.http.post(this.apiUrl, body, { responseType: 'text' });
  }
}
