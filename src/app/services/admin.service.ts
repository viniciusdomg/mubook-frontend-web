import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getTotalQuadras(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/quadra/count/quadras`);
  }

  getTotalAdministradores(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/usuario/count/administradores`);
  }

  getTotalSocios(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/usuario/count/socios`);
  }
}
