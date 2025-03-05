import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentesService {
  private baseApiUrl = 'http://localhost:5112/api/Residentes';
  private casasApiUrl = 'http://localhost:5112/api/Casas';

  constructor(private http: HttpClient) {}

  obtenerResidentes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl);
  }

  obtenerCasas(): Observable<any[]> {
    return this.http.get<any[]>(this.casasApiUrl);
  }

  registrarResidente(residente: any): Observable<any> {
    return this.http.post(this.baseApiUrl, residente);
  }

  actualizarResidente(id: number, residente: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/${id}`, residente);
  }

  eliminarResidente(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/${id}`);
  }
}
