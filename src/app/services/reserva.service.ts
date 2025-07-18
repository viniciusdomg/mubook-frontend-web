import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/api/reserva';

  constructor(private http: HttpClient) {}

  getTotalReservasMes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/historico-reserva/mes`);
  }
}
