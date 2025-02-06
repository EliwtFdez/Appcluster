import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent {
  casas = [
    { nombre: "Casa 1", mantenimiento: false },
    { nombre: "Casa 2", mantenimiento: true },
    { nombre: "Casa 3", mantenimiento: false }
  ];

  completarMantenimiento(casa: { nombre: string; mantenimiento: boolean }) {
    casa.mantenimiento = true;
  }

  // 🛠️ Corrección del trackById
  trackById(index: number, casa: { nombre: string; mantenimiento: boolean }): string {
    return casa.nombre; // Se usa el nombre como identificador único
  }
}
