import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pagofactura',
  imports: [CommonModule],
  templateUrl: './pagofactura.component.html',
  styleUrl: './pagofactura.component.scss'
})
export class PagofacturaComponent {

facturas: Factura[] = [
    { id: 1, nombre: "Electricidad", casa: "Casa 1", total: 120.50 },
    { id: 2, nombre: "Agua", casa: "Casa 2", total: 75.30 },
    { id: 3, nombre: "Internet", casa: "Casa 3", total: 50.00 }
  ];

  trackById(index: number, factura: Factura): number {
    return factura.id;
  }
}
// QUITAR INTERFAZ AQUI PRO LO MIENTRAS
interface Factura {
  id: number;
  nombre: string;
  casa: string;
  total: number;
}
