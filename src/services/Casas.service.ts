import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasasService {
  private baseApiUrl = 'http://localhost:5112/api/Casas';

  constructor(private http: HttpClient) {}

  obtenerViviendas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl);
  }

  registrarVivienda(vivienda: any): Observable<any> {
    return this.http.post(this.baseApiUrl, vivienda);
  }

  actualizarVivienda(idCasa: number, vivienda: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/${idCasa}`, vivienda);
  }

  eliminarVivienda(idCasa: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/${idCasa}`);
  }

  eliminarResidente(idCasa: number, idResidente: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/${idCasa}/residentes/${idResidente}`);
  }
}
