import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  idPago?: number; // Agregado como opcional, en caso de que no se tenga en la creación
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

crearPago(pago: Pago): Observable<any> {
  // lógica para crear pago
  return this.http.post<any>(`${this.apiUrl}`, pago);
}
  // Métodos CRUD para pagos
  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }


  getPagoById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  cargarPagos(pago: Pago): Observable<any> {
    return this.http.post(this.apiUrl, pago);
  }

  actualizarPago(id: number, pago: Pago): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pago);
  }

  deletePago(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Endpoints adicionales
  getTotalDeuda(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/TotalDeuda`);
  }

  deleteTotalDeuda(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/TotalDeuda`);
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
