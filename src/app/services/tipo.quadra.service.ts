import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TipoQuadraModel} from '../models/quadra/tipo.quadra.model';

@Injectable({providedIn: 'root'})
export class TipoQuadraService {
  private apiUrl = 'http://localhost:8080/api/tipoQuadra/';

  constructor(private http: HttpClient) {}

  loadTipos(){
    return this.http.get<TipoQuadraModel[]>(`${this.apiUrl}`);
  }

  create(tipo: Partial<TipoQuadraModel>) {
    return this.http.post(`${this.apiUrl}`, { ...tipo }, {responseType: 'text'});
  }
}
