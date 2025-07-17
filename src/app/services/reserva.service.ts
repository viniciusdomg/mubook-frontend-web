import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PageResponseModel} from '../models/page.response.model';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private apiUrl = 'http://localhost:8080/api/reserva/';

  pageReservas(offset: number, limit: number){}

  pageHistoricoReservas(offset: number, limit: number){}

  newReserva(reserva: any){}

  addConvidado(convidados: any){}

  deleteConvidado(id: number){}

  deleteConvidados(ids: number[]){}
}
