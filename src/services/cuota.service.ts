import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cuota {
  nombreCuota: string;
  monto: number;
  fechaVencimiento: Date;
  descripcion: string;
  estado: string;
  idCasa: number;
  idResidente: number;
}

@Injectable({
  providedIn: 'root'
})

export class CuotasService {
  private apiUrl = 'http://localhost:5112/api/Cuotas';

  constructor(private http: HttpClient) { }

  getCuotas(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(this.apiUrl);
  }

  addCuota(cuota: Cuota): Observable<Cuota> {
    return this.http.post<Cuota>(this.apiUrl, cuota);
  }

  updateCuota(id: number, cuota: Cuota): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cuota);
  }

  deleteCuota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
