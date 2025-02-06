import { Component } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  imports: [],
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.scss'
})
export class MantenimientoComponent {
 casas = [
    { nombre: 'Casa 1', mantenimiento: false },
    { nombre: 'Casa 2', mantenimiento: false },
    { nombre: 'Casa 3', mantenimiento: true }
  ];

  completarMantenimiento(casa: any) {
    casa.mantenimiento = true;
  }
}
