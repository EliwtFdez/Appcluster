import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagoService, Pago } from '../../../services/pago.service';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {
  pagoForm: FormGroup;
  pagos: any[] = [];
  casas: any[] = [];
  residentes: any[] = [];
  cuotas: any[] = [];
  residentesFiltrados: any[] = [];
  cuotasFiltradas: any[] = [];
  editMode: boolean = false;
  pagoEditando: any = null;

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService
  ) {
    // El formulario se crea con un control para 'numeroCasa' que se mostrará en pantalla,
    // pero internamente asignaremos a idCasa el número de casa (descriptivo).
    this.pagoForm = this.fb.group({
      numeroCasa: ['', Validators.required],
      idResidente: [{ value: null, disabled: true }, Validators.required],
      idCuota: ['', Validators.required],
      montoPagado: [0.01, [Validators.required, Validators.min(0.01)]],
      fechaPago: ['', Validators.required],
      metodoPago: ['Efectivo', Validators.required],
      observaciones: [""]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
    // Cuando cambia el número de casa, se filtran residentes y cuotas automáticamente.
    this.pagoForm.get('numeroCasa')?.valueChanges.subscribe(numeroCasa => {
      if (numeroCasa) {
        this.onCasaSeleccionada(numeroCasa);
      } else {
        this.residentesFiltrados = [];
        this.pagoForm.get('idResidente')?.reset();
        this.pagoForm.get('idResidente')?.disable();
        this.cuotasFiltradas = [];
        this.pagoForm.get('idCuota')?.reset();
      }
    });
  }

  cargarDatos(): void {
    this.pagoService.getPagos().subscribe(data => this.pagos = data);
    this.pagoService.getCasas().subscribe(data => this.casas = data);
    this.pagoService.getResidentes().subscribe(data => this.residentes = data);
    this.pagoService.getCuotas().subscribe(data => this.cuotas = data);
  }

  onCasaSeleccionada(numeroCasa: string): void {
    // Buscar la casa por número
    const casaSeleccionada = this.casas.find(casa => casa.numeroCasa === numeroCasa);
    if (casaSeleccionada) {
      // Filtra residentes asociados a la casa (usando el identificador interno)
      this.residentesFiltrados = this.residentes.filter(residente => residente.idCasa === casaSeleccionada.idCasa);
      if (this.residentesFiltrados.length > 0) {
        this.pagoForm.get('idResidente')?.enable();
        // Si solo hay un residente, lo asigna automáticamente; si hay varios, lo deja sin valor
        if (this.residentesFiltrados.length === 1) {
          this.pagoForm.get('idResidente')?.setValue(this.residentesFiltrados[0].nombre);
        } else {
          this.pagoForm.get('idResidente')?.setValue('');
        }
      } else {
        this.pagoForm.get('idResidente')?.reset();
        this.pagoForm.get('idResidente')?.disable();
      }
      // Filtra cuotas asociadas a la casa
      this.cuotasFiltradas = this.cuotas.filter(cuota => cuota.idCasa === casaSeleccionada.idCasa);
      if (this.cuotasFiltradas.length > 0) {
        // Si solo hay una cuota, la asigna automáticamente; de lo contrario, deja que el usuario la seleccione
        if (this.cuotasFiltradas.length === 1) {
          this.pagoForm.get('idCuota')?.setValue(this.cuotasFiltradas[0].nombreCuota);
        } else {
          this.pagoForm.get('idCuota')?.setValue('');
        }
      } else {
        this.pagoForm.get('idCuota')?.reset();
      }
    } else {
      this.residentesFiltrados = [];
      this.pagoForm.get('idResidente')?.reset();
      this.cuotasFiltradas = [];
      this.pagoForm.get('idCuota')?.reset();
    }
  }

  guardarPago(): void {
  if (this.pagoForm.invalid) return;

  // Obtener los valores del formulario
  const formValue = this.pagoForm.value;

  // Buscar el idCasa correspondiente al numeroCasa seleccionado
  const casaSeleccionada = this.casas.find(casa => casa.numeroCasa === formValue.numeroCasa);
  if (!casaSeleccionada) {
    alert('No se encontró la casa seleccionada.');
    return;
  }
  const idCasa = casaSeleccionada.idCasa;

  // Buscar el idResidente correspondiente al nombre seleccionado
  const residenteSeleccionado = this.residentesFiltrados.find(
    residente => residente.nombre === formValue.idResidente
  );
  if (!residenteSeleccionado) {
    alert('No se encontró el residente seleccionado.');
    return;
  }
  const idResidente = residenteSeleccionado.idResidente;


  // Buscar el idCuota correspondiente al nombre de la cuota seleccionada
  const cuotaSeleccionada = this.cuotas.find(cuota => cuota.nombreCuota === formValue.idCuota);
  if (!cuotaSeleccionada) {
    alert('No se encontró la cuota seleccionada.');
    return;
  }
  const idCuota = cuotaSeleccionada.idCuota;

  // Construir el objeto que la API espera
  const pagoParaAPI = {
    idCasa: idCasa,
    idResidente: idResidente,
    idCuota: idCuota,
    montoPagado: formValue.montoPagado,
    fechaPago: formValue.fechaPago,
    metodoPago: formValue.metodoPago,
    observaciones: formValue.observaciones
  };

  console.log('Pago a enviar a la API:', pagoParaAPI);

  // Enviar el pago a la API
  if (this.editMode) {
    this.pagoService.actualizarPago(this.pagoEditando.idPago, pagoParaAPI).subscribe(() => {
      this.cargarDatos();
      this.resetFormulario();
    });
  } else {
    this.pagoService.crearPago(pagoParaAPI).subscribe(() => {
      this.cargarDatos();
      this.resetFormulario();
    });
  }
}

  editarPago(pago: any): void {
    this.editMode = true;
    this.pagoEditando = pago;
    this.pagoForm.patchValue({
      numeroCasa: pago.idCasa, // aquí idCasa ya contiene el número de casa
      idResidente: pago.idResidente,
      idCuota: pago.idCuota,
      montoPagado: pago.montoPagado,
      fechaPago: pago.fechaPago,
      metodoPago: pago.metodoPago,
      observaciones: pago.observaciones
    });
    // Filtra residentes y cuotas según la casa seleccionada
    this.onCasaSeleccionada(pago.idCasa);
  }

  eliminarPago(pago: any): void {
    if (confirm('¿Estás seguro de eliminar este pago?')) {
      // Se asume que el service tiene deletePago() o similar.
      this.pagoService.deletePago(pago.id).subscribe(() => {
        this.cargarDatos();
      });
    }
  }

  resetFormulario(): void {
    this.pagoForm.reset({
      montoPagado: 0.01,
      metodoPago: 'Efectivo'
    });
    this.editMode = false;
    this.pagoEditando = null;
    this.residentesFiltrados = [];
    this.cuotasFiltradas = [];
  }

  trackById(index: number, item: any): number {
    return item.id; // Se asume que cada pago tiene un identificador 'id'
  }
}
