import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-controlacceso',
  imports: [CommonModule],
  templateUrl: './controlacceso.component.html',
  styleUrl: './controlacceso.component.scss'
})
export class ControlaccesoComponent {
 accesos = [
    { nombre: 'Juan Pérez', fecha: '2025-02-05 08:30 AM' },
    { nombre: 'María González', fecha: '2025-02-05 09:15 AM' }
  ];
  
  historialAccesos = [
    { nombre: 'Carlos López', fecha: '2025-02-04 06:00 PM' },
    { nombre: 'Ana Torres', fecha: '2025-02-04 07:30 PM' }
  ];

  registrarAcceso() {
    const nuevoAcceso = { nombre: 'Nuevo Usuario', fecha: new Date().toLocaleString() };
    this.accesos.push(nuevoAcceso);
  }

  verDetalles(acceso: any) {
    alert(`Acceso de: ${acceso.nombre} - Fecha: ${acceso.fecha}`);
  }

  eliminarAcceso(acceso: any) {
    this.accesos = this.accesos.filter(a => a !== acceso);
  }
}
