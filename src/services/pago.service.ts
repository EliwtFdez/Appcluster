import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  idCasa: number;
  idResidente: number;
  idCuota: number;
  montoPagado: number;
  fechaPago: string;
  metodoPago: string;
  observaciones: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:5112/api/Pago';

  constructor(private http: HttpClient) {}

  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  getPagoById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  createPago(id: number, pago: Pago): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, pago);
  }

  updatePago(id: number, pago: Pago): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pago);
  }

  deleteTotalDeuda(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/TotalDeuda`);
  }

  getTotalDeuda(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/TotalDeuda`);
  }

getCasas(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:5112/api/Casas');
}

getResidentes(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:5112/api/Residentes');
}

getCuotas(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:5112/api/Cuotas');
}

}

