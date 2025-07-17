import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PageResponseModel} from '../models/page.response.model';
import {ReservasDisponiveisResponse} from '../models/reservas/reservas.disponiveis.response';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private apiUrl = 'http://localhost:8080/api/reserva/';

  constructor(private http: HttpClient) { }

  getReservasDisponiveis(idTipoQuadra?:number, data?:string, hora?:string){
    const params: any = {};

    if (idTipoQuadra != null) params.id = idTipoQuadra;
    if (data) params.data = data;
    if (hora) params.hora = hora;

    return this.http.get<ReservasDisponiveisResponse[]>(`${this.apiUrl}`,{params});
  }

  pageReservas(offset: number, limit: number){}

  pageHistoricoReservas(offset: number, limit: number){}

  newReserva(reserva: any){}

  addConvidado(convidados: any){}

  deleteConvidado(id: number){}

  deleteConvidados(ids: number[]){}
}
