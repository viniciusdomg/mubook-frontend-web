import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrocarSenhaRequestModel } from '../models/auth/trocar-senha.request.model';

@Injectable({ providedIn: 'root' })
export class TrocarSenhaService {
  private apiUrl = 'http://localhost:8080/api/password/trocar-senha';

  constructor(private http: HttpClient) {}

  trocarSenha(data: TrocarSenhaRequestModel) {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
