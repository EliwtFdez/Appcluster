import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comunicacion',
  imports: [CommonModule],
  templateUrl: './comunicacion.component.html',
  styleUrl: './comunicacion.component.scss'
})
export class ComunicacionComponent {
casas = [
    {
      nombre: "Casa 1",
      mantenimiento: false,
      pagos: [
        { descripcion: "Luz", monto: 50, fecha: new Date(), pagado: false },
        { descripcion: "Agua", monto: 30, fecha: new Date(), pagado: true }
      ]
    }
  ];

  completarMantenimiento(casa: any) {
    casa.mantenimiento = true;
  }

  marcarComoPagado(pago: any) {
    pago.pagado = true;
  }

  trackById(index: number, item: any) {
    return item.nombre;
  }
}
