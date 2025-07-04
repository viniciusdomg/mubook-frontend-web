import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PerfilRequestModel} from '../models/perfil/perfil.request.model';

@Injectable({providedIn: 'root'})
export class PerfilService {
  private apiUrl = 'http://localhost:8080/api/perfil/';

  constructor(private http: HttpClient) {}

  getDados(){
    return this.http.get<PerfilRequestModel>(`${this.apiUrl}`);
  }

  salvar(pessoa: PerfilRequestModel) {
    return this.http.post<PerfilRequestModel>(`${this.apiUrl}`, { ...pessoa });
  }
}
