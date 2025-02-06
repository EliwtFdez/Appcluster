import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ViviendaService {
  [x: string]: any;
  private viviendaStatus = new BehaviorSubject<boolean>(false);
  viviendaStatus$ = this.viviendaStatus.asObservable();

  actualizarEstado(nuevoEstado: boolean) {
    this.viviendaStatus.next(nuevoEstado);
  }
}

