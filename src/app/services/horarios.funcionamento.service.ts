import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PageResponseModel} from '../models/page.response.model';
import {HorarioFuncionamentoModel} from '../models/horarios-funcionamento/horario.funcionamento.model';
import {HorariosFuncionamentoResponse} from '../models/horarios-funcionamento/horario.funcionamento.response.model';

@Injectable({ providedIn: 'root' })
export class HorariosFuncionamentoService {
  private apiUrl = 'http://localhost:8080/api/horario-funcionamento/';

  constructor(private http: HttpClient) { }

  getPageHorarios(offset: number, limit: number){
    const params = {
      offset: offset,
      limit: limit,
    }
    return this.http.get<PageResponseModel<HorariosFuncionamentoResponse>>(`${this.apiUrl}`, {params});
  }

  create(horario: Partial<HorarioFuncionamentoModel>){
    return this.http.post(this.apiUrl, horario, {responseType: 'text'});
  }

  deleteOne(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}${id}`, {responseType: 'text'});
  }
}
