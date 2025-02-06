import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Vivienda } from '../models/vivienda.models'; 

@Injectable({
  providedIn: 'root' 
})
export class ViviendaService {
  private viviendas: Vivienda[] = []; // Simula una base de datos en memoria
  private viviendaStatusSubject = new BehaviorSubject<boolean>(false); // Estado de la vivienda

  constructor() {}

  // Registrar una nueva vivienda
  registrarVivienda(vivienda: Vivienda): Observable<Vivienda> {
    vivienda.id = this.viviendas.length + 1; // Asigna un ID único
    this.viviendas.push(vivienda);
    return of(vivienda); // Simula una respuesta HTTP
  }

  // Obtener el estado de la vivienda
  get viviendaStatus$(): Observable<boolean> {
    return this.viviendaStatusSubject.asObservable();
  }

  // Actualizar el estado de la vivienda
  actualizarEstado(estado: boolean): void {
    this.viviendaStatusSubject.next(estado);
  }
}