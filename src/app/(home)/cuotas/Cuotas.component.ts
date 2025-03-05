import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CuotaService } from '../../../services/Cuota.service';

@Component({
  selector: 'app-Cuotas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './Cuotas.component.html',
  styleUrls: ['./Cuotas.component.scss']
})
export class CuotasComponent implements OnInit {
  cuotaForm: FormGroup;
  cuotas: any[] = [];
  casas: any[] = [];
  residentes: any[] = [];
  residentesFiltrados: any[] = [];
  editMode: boolean = false;
  cuotaEditando: any = null;

  constructor(
    private fb: FormBuilder,
    private cuotaService: CuotaService
  ) {
    this.cuotaForm = this.fb.group({
    nombreCuota: ['', Validators.required],
    monto: ['', Validators.required],
    fechaVencimiento: ['', Validators.required],
    descripcion: [''],
    estado: ['pendiente', Validators.required],
    numeroCasa: ['', Validators.required],
    idResidente: [{ value: null, disabled: true }, Validators.required],
    });

  }

 ngOnInit(): void {
  this.cargarDatos();

  this.cuotaForm.get('numeroCasa')?.valueChanges.subscribe(numeroCasa => {
    if (numeroCasa) {
      this.onCasaSeleccionada(numeroCasa);
    } else {
      this.residentesFiltrados = [];
      this.cuotaForm.get('idResidente')?.reset();
      this.cuotaForm.get('idResidente')?.disable();
    }
  });
}

  cargarDatos(): void {
    this.cuotaService.getCuotas().subscribe(data => this.cuotas = data);
    this.cuotaService.getCasas().subscribe(data => this.casas = data);
    this.cuotaService.getResidentes().subscribe(data => {
      this.residentes = data;
      console.log('Residentes cargados:', this.residentes); // ✅ Verificar datos
    });
  }

  onCasaSeleccionada(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const numeroCasa = selectElement?.value;

  if (!numeroCasa) {
    this.residentesFiltrados = [];
    this.cuotaForm.get('idResidente')?.reset();
    this.cuotaForm.get('idResidente')?.disable();
    return;
  }

  const casaSeleccionada = this.casas.find(casa => casa.numeroCasa === numeroCasa);

  if (casaSeleccionada) {
    const idCasa = casaSeleccionada.idCasa;

    this.residentesFiltrados = this.residentes.filter(
      residente => residente.idCasa === idCasa
    );

    console.log('Número de Casa:', numeroCasa, '-> idCasa:', idCasa);
    console.log('Residentes filtrados:', this.residentesFiltrados);

    if (this.residentesFiltrados.length > 0) {
      this.cuotaForm.get('idResidente')?.enable();
      this.cuotaForm.get('idResidente')?.setValue(this.residentesFiltrados[0].idResidente);
    } else {
      this.cuotaForm.get('idResidente')?.reset();
      this.cuotaForm.get('idResidente')?.disable();
    }
  } else {
    this.residentesFiltrados = [];
    this.cuotaForm.get('idResidente')?.reset();
    this.cuotaForm.get('idResidente')?.disable();
  }
}


 guardarCuota(): void {
  if (this.cuotaForm.invalid) return;

  const cuota = this.cuotaForm.value;

  if (!cuota.idResidente) {
    alert('Debe seleccionar una casa con residente asignado.');
    return;
  }

  // Buscar la casa seleccionada por el número de casa
  const casaSeleccionada = this.casas.find(casa => casa.numeroCasa === cuota.numeroCasa);

  if (casaSeleccionada) {
    cuota.idCasa = casaSeleccionada.idCasa; // ✅ Aquí asignas el idCasa correcto
  } else {
    alert('No se encontró la casa seleccionada.');
    return;
  }

  const residenteSeleccionado = this.residentes.find(
    (residente) => residente.idResidente === cuota.idResidente
  );

  cuota.residentes = residenteSeleccionado ? [residenteSeleccionado] : [];

  console.log('Cuota a guardar:', cuota);

  if (this.editMode) {
    this.cuotaService.actualizarCuota(this.cuotaEditando.idCuota, cuota).subscribe(() => {
      this.cargarCuotas();
      this.resetFormulario();
    });
  } else {
    this.cuotaService.crearCuota(cuota).subscribe(() => {
      this.cargarCuotas();
      this.resetFormulario();
    });
  }
}

  cargarCuotas(): void {
    this.cuotaService.getCuotas().subscribe(data => this.cuotas = data);
  }

  editarCuota(cuota: any): void {
    this.editMode = true;
    this.cuotaEditando = cuota;

    this.onCasaSeleccionada(cuota.idCasa);

this.cuotaForm.patchValue({
  nombreCuota: cuota.nombreCuota,
  monto: cuota.monto,
  fechaVencimiento: cuota.fechaVencimiento,
  descripcion: cuota.descripcion,
  estado: cuota.estado,
  numeroCasa: this.getCasaPorId(cuota.idCasa),
  idResidente: cuota.idResidente,
});

  }

  eliminarCuota(cuota: any): void {
    if (confirm('¿Estás seguro de eliminar esta cuota?')) {
      this.cuotaService.eliminarCuota(cuota.idCuota).subscribe(() => this.cargarCuotas());
    }
  }

  resetFormulario(): void {
    this.cuotaForm.reset({ estado: 'pendiente' });
    this.editMode = false;
    this.cuotaEditando = null;
    this.residentesFiltrados = [];
  }

  imprimirCuota(cuota: any): void {
    window.print();
  }

  getCasaPorId(idCasa: number): string {
    const casa = this.casas.find(c => c.idCasa === idCasa);
    return casa ? casa.numeroCasa : 'Desconocida';
  }

  getResidentePorId(idResidente: number): string {
    const residente = this.residentes.find(r => r.idResidente === idResidente);
    return residente ? `${residente.nombre} ${residente.apellido}` : 'Desconocido';
  }

  trackById(index: number, item: any): number {
    return item.idCuota;
  }
}
