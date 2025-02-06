import { Component } from '@angular/core';

@Component({
  selector: 'app-gestionrecidencia',
  imports: [],
  templateUrl: './gestionrecidencia.component.html',
  styleUrl: './gestionrecidencia.component.scss'
})

export class GestionrecidenciaComponent {
  residentes = [
    { nombre: 'Juan Pérez', edad: 35 },
    { nombre: 'María González', edad: 28 }
  ];
  
  futurosResidentes = [
    { nombre: 'Carlos López', edad: 30 },
    { nombre: 'Ana Torres', edad: 27 }
  ];

  agregarResidente() {
    const nuevoResidente = { nombre: 'Nuevo Residente', edad: 30 };
    this.residentes.push(nuevoResidente);
  }

  editarResidente(residente: any) {
    const nuevoNombre = prompt('Editar nombre:', residente.nombre);
    if (nuevoNombre !== null) {
      residente.nombre = nuevoNombre;
    }
  }

  eliminarResidente(residente: any) {
    this.residentes = this.residentes.filter(r => r !== residente);
  }
}