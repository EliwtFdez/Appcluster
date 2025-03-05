import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class InformacionService {
  getCasasSinDueno() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:5112/api';

  constructor(private http: HttpClient) { }

  getTotalCasas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Casas/Total`);
  }

  getTotalDeuda(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Cuotas/TotalDeuda`);
  }

  getTotalPago(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Pago/TotalDeuda`);
  }

  getTotalResidente(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Residentes/Total`);
  }
}
