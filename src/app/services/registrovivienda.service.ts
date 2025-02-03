import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto hace que Angular lo reconozca en toda la aplicación
})
export class ViviendaService {
  private viviendaStatus = new BehaviorSubject<boolean>(false);
  viviendaStatus$ = this.viviendaStatus.asObservable();

  actualizarEstado(nuevoEstado: boolean) {
    this.viviendaStatus.next(nuevoEstado);
  }
}

