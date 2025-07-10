import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageResponseModel} from '../models/page.response.model';
import {QuadraResponseModel} from '../models/quadra/quadra.response.model';
import {Observable} from 'rxjs';
import {QuadraRequest} from '../models/quadra/quadra.request.model';

@Injectable({providedIn: 'root'})
export class QuadraService {
  private apiUrl = 'http://localhost:8080/api/quadra/';

  constructor(private http: HttpClient) {}

  getQuadras(filter: string, offset: number, limit: number){
    const params = {
      filter: filter,
      offset: offset,
      limit: limit,
    }
    return this.http.get<PageResponseModel<QuadraResponseModel>>(`${this.apiUrl}`, {params});
  }

  getQuadraById(id: number){
    return this.http.get<QuadraResponseModel>(`${this.apiUrl}${id}`);
  }

  create(quadra: QuadraRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}`, { ...quadra }, {responseType: 'text'});
  }

  updateQuadra(quadra: QuadraRequest, id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, { ...quadra }, {responseType: 'text'});
  }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}${id}`, {responseType: 'text'});
  }
}
