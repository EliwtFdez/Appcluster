import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pago, PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent implements OnInit {
  pagos: Pago[] = [];
  casas: any[] = [];
  residentes: any[] = [];
  cuotas: any[] = [];
  descripcionCuota: string = '';

  nuevoPago: Pago = {
    idCasa: 0,
    idResidente: 0,
    idCuota: 0,
    montoPagado: 0,
    fechaPago: new Date().toISOString(),
    metodoPago: 'Efectivo',
    observaciones: ''
  };

  constructor(private pagoService: PagoService) {}

  ngOnInit() {
    this.obtenerPagos();
    this.cargarCasas();
    this.cargarResidentes();
    this.cargarCuotas();
  }

  obtenerPagos() {
    this.pagoService.getPagos().subscribe((data) => {
      this.pagos = data;
    });
  }

  cargarCasas() {
    this.pagoService.getCasas().subscribe((data) => this.casas = data);
  }

  cargarResidentes() {
    this.pagoService.getResidentes().subscribe((data) => this.residentes = data);
  }

  cargarCuotas() {
    this.pagoService.getCuotas().subscribe((data) => this.cuotas = data);
  }

  asignarIdCasa(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    this.nuevoPago.idCasa = id;
  }

  asignarIdResidente(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    this.nuevoPago.idResidente = id;
  }

  asignarIdCuota(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    this.nuevoPago.idCuota = id;
    this.actualizarDescripcionCuota();
  }

  actualizarDescripcionCuota() {
    const cuotaSeleccionada = this.cuotas.find(c => c.id === this.nuevoPago.idCuota);
    this.descripcionCuota = cuotaSeleccionada ? cuotaSeleccionada.descripcion : '';
  }

  registrarPago() {
    if (
      this.nuevoPago.idCasa === 0 ||
      this.nuevoPago.idResidente === 0 ||
      this.nuevoPago.idCuota === 0 ||
      this.nuevoPago.montoPagado <= 0
    ) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    this.pagoService.createPago(this.nuevoPago.idCasa, this.nuevoPago).subscribe(() => {
      this.obtenerPagos();
      this.limpiarFormulario();
    });
  }

  limpiarFormulario() {
    this.nuevoPago = {
      idCasa: 0,
      idResidente: 0,
      idCuota: 0,
      montoPagado: 0,
      fechaPago: new Date().toISOString(),
      metodoPago: 'Efectivo',
      observaciones: ''
    };
    this.descripcionCuota = '';
  }

  obtenerNumeroCasa(idCasa: number): string {
    const casa = this.casas.find(c => c.id === idCasa);
    return casa ? casa.numeroCasa : 'Desconocido';
  }

  obtenerNombreResidente(idResidente: number): string {
    const residente = this.residentes.find(r => r.id === idResidente);
    return residente ? residente.nombre : 'Desconocido';
  }

  obtenerNombreCuota(idCuota: number): string {
    const cuota = this.cuotas.find(c => c.id === idCuota);
    return cuota ? cuota.nombreCuota : 'Desconocido';
  }
}
