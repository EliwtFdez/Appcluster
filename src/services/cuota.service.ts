import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class CuotaService {

  private apiUrl = 'http://localhost:5112/api'; 

  constructor(private http: HttpClient) { }

  getCuotas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Cuotas`);
  }

  crearCuota(cuota: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Cuotas`, cuota);
  }

  actualizarCuota(idCuota: number, cuota: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Cuotas/${idCuota}`, cuota);
  }

  eliminarCuota(idCuota: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Cuotas/${idCuota}`);
  }

  getCasas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Casas`);
  }

  getResidentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Residentes`);
  }

  // ✅ Método opcional para obtener residentes según la casa seleccionada
  getResidentesPorCasa(idCasa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Casas/${idCasa}/Residentes`);
  }
}
