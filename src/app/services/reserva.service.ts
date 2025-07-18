import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PageResponseModel} from '../models/page.response.model';
import {ReservasDisponiveisResponse} from '../models/reservas/reservas.disponiveis.response';
import {HistoricoReservaRequest} from '../models/reservas/historico.reserva.request';
import {HistoricoReservaResponse} from '../models/reservas/historico.reserva.response';
import {PerfilRequestModel} from '../models/perfil/perfil.request.model';

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

  agendarReserva(reserva: HistoricoReservaRequest){
    return this.http.post(`${this.apiUrl}`, { ...reserva });
  }

  pageHistoricoReservas(offset: number, limit: number, idTipoQuadra?:number, data?:string, hora?:string){
    const params: any = {
      offset: offset,
      limit: limit,
    }

    if (idTipoQuadra != null) params.id = idTipoQuadra;
    if (data) params.data = data;
    if (hora) params.hora = hora;

    return this.http.get<PageResponseModel<HistoricoReservaResponse>>(`${this.apiUrl}historico/admin`, {params});
  }

  cancelarReserva(id: number){
    return this.http.patch(`${this.apiUrl}${id}/cancelar`, null);
  }

  getHistoricoReservaId(id: number){
    return this.http.get<HistoricoReservaResponse>(`${this.apiUrl}${id}`);
  }

  getHistoricoReservas(idTipoQuadra?: number, data?: string, hora?: string) {
    const params: any = {};
    if (idTipoQuadra != null) params.idTipoQuadra = idTipoQuadra;
    if (data) params.data = data;
    if (hora) params.hora = hora;
    return this.http.get<HistoricoReservaResponse[]>(`${this.apiUrl}historico/associado`, { params });
  }

  addConvidado(convidados: Partial<PerfilRequestModel>[], id: number){
    return this.http.post(`${this.apiUrl}${id}/convidados`, convidados)
  }

  deleteConvidado(id: number){
    return this.http.delete(`${this.apiUrl}${id}/convidados`, {responseType: 'text'});
  }

  deleteConvidados(ids: number[]) {
    return this.http.request('delete', `${this.apiUrl}convidados/all`, {
      body: {convidadosIds: ids},
      responseType: 'text'
    });
  }

  getTotalReservasMes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}count/historico-reserva/mes`);
  }
}
