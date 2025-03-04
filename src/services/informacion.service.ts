import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class InformacionService {

  private apiUrl = 'https://localhost:7047/api';

  constructor(private http: HttpClient) { }

  getTotalCasas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Casas/Total`);
  }

  getCasasSinDueno(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Casas/SinDueno`);
  }

  getSaldoTotalPagado(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Pago/TotalPagado`);
  }

  getSaldoAdeudo(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Cuotas/TotalDeuda`);
  }
}
