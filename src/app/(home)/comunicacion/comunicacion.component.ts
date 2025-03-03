import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comunicacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './comunicacion.component.html',
  styleUrl: './comunicacion.component.scss'
})

export class ComunicacionComponent{

  casas: Casa[] = [
    { numero: 1, huesped: "Juan Pérez", mensajes: [] },
    { numero: 2, huesped: "María López", mensajes: [] },
    { numero: 3, huesped: "Carlos Ramírez", mensajes: [] }
  ]

  casaSeleccionada: Casa | null = null;
  nuevoMensaje: string = '';

  seleccionarCasa(casa: Casa) {
    this.casaSeleccionada = casa;
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim() === '' || !this.casaSeleccionada) return;

    const horaActual = new Date().toLocaleTimeString();

    this.casaSeleccionada.mensajes.push({
      texto: this.nuevoMensaje,
      propietario: true,
      hora: horaActual
    });

    // Simulación de respuesta automática
    setTimeout(() => {
      if (this.casaSeleccionada) {
        this.casaSeleccionada.mensajes.push({
          texto: "Mensaje recibido ✔️",
          propietario: false,
          hora: new Date().toLocaleTimeString()
        });
      }
    }, 1000);

    this.nuevoMensaje = ''; // Limpiar input
  }

  trackById(index: number, casa: Casa): number {
    return casa.numero;
  }
}


//QUITAR POR LO MIENTRAS:

interface Mensaje {
  texto: string;
  propietario: boolean;
  hora: string;
}

interface Casa {
  numero: number;
  huesped: string;
  mensajes: Mensaje[];
}