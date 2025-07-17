import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PageResponseModel} from '../models/page.response.model';
import {HorarioFuncionamentoModel} from '../models/horarios-funcionamento/horario.funcionamento.model';

@Injectable({ providedIn: 'root' })
export class HorariosFuncionamentoService {
  private apiUrl = 'http://localhost:8080/api/horario-funcionamento/';

  constructor(private http: HttpClient) { }

  create(horario: Partial<HorarioFuncionamentoModel>){
    return this.http.post(this.apiUrl, horario, {responseType: 'text'});
  }
}
