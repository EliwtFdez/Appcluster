import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-Cuotas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './Cuotas.component.html',
  styleUrls: ['./Cuotas.component.scss']
})
export class CuotasComponent implements OnInit {

  cuotas: any[] = [];
  casas: any[] = [];
  residentes: any[] = [];
  cuotaForm: FormGroup;
  private baseApiUrl = 'http://localhost:5112/api/Cuotas';
  private casasApiUrl = 'http://localhost:5112/api/Casas';
  private residentesApiUrl = 'http://localhost:5112/api/Residentes';

  editMode: boolean = false;
  cuotaEditandoId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.cuotaForm = this.fb.group({
      nombreCuota: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(1)]],
      fechaVencimiento: ['', Validators.required],
      descripcion: [''],
      estado: ['pendiente', Validators.required],
      idCasa: ['', Validators.required],
      idResidente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarCuotas();
    this.cargarCasas();
    this.cargarResidentes();
  }

  trackById(index: number, cuota: any): any {
    return cuota.idCuota || cuota.id;
  }

  cargarCuotas() {
    this.http.get<any[]>(this.baseApiUrl).subscribe({
      next: (data) => {
        this.cuotas = data;
      },
      error: (error) => {
        console.error('Error al cargar las cuotas:', error);
      }
    });
  }

  cargarCasas() {
    this.http.get<any[]>(this.casasApiUrl).subscribe({
      next: (data) => {
        this.casas = data;
      },
      error: (error) => {
        console.error('Error al cargar las casas:', error);
      }
    });
  }

  cargarResidentes() {
    this.http.get<any[]>(this.residentesApiUrl).subscribe({
      next: (data) => {
        this.residentes = data;
      },
      error: (error) => {
        console.error('Error al cargar los residentes:', error);
      }
    });
  }

  getCasaPorId(idCasa: number): string {
    const casa = this.casas.find(c => c.idCasa === idCasa);
    return casa ? casa.direccion : 'N/A';
  }

  getResidentePorId(idResidente: number): string {
    const residente = this.residentes.find(r => r.idResidente === idResidente);
    return residente ? `${residente.nombre} ${residente.apellido}` : 'N/A';
  }

  guardarCuota() {
    if (this.cuotaForm.invalid) return;
    const cuotaData = this.cuotaForm.value;

    if (this.editMode && this.cuotaEditandoId !== null) {
      this.http.put(`${this.baseApiUrl}/${this.cuotaEditandoId}`, cuotaData).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargarCuotas();
        },
        error: (error) => {
          console.error('Error al actualizar la cuota:', error);
        }
      });
    } else {
      this.http.post(this.baseApiUrl, cuotaData).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargarCuotas();
        },
        error: (error) => {
          console.error('Error al registrar la cuota:', error);
        }
      });
    }
  }

  editarCuota(cuota: any) {
    this.cuotaEditandoId = cuota.idCuota || cuota.id;
    this.cuotaForm.patchValue(cuota);
    this.editMode = true;
  }

  eliminarCuota(cuota: any) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cuota?')) {
      const id = cuota.idCuota || cuota.id;
      this.http.delete(`${this.baseApiUrl}/${id}`).subscribe({
        next: () => {
          this.cargarCuotas();
        },
        error: (error) => {
          console.error('Error al eliminar la cuota:', error);
        }
      });
    }
  }

  resetFormulario() {
    this.cuotaForm.reset();
    this.cuotaForm.patchValue({ estado: 'pendiente' });
    this.editMode = false;
    this.cuotaEditandoId = null;
  }

  // 🔹 Imprimir cuota
  imprimirCuota(cuota: any): void {
    const printContent = `
      <h2>Detalles de Cuota</h2>
      <p><strong>Nombre:</strong> ${cuota.nombreCuota}</p>
      <p><strong>Monto:</strong> $${cuota.monto}</p>
      <p><strong>Fecha de Vencimiento:</strong> ${cuota.fechaVencimiento}</p>
      <p><strong>Estado:</strong> ${cuota.estado}</p>
      <p><strong>ID Casa:</strong> ${cuota.idCasa}</p>
      <p><strong>ID Residente:</strong> ${cuota.idResidente}</p>
    `;

    const newWindow = window.open('', '', 'width=600,height=400');
    newWindow?.document.write(printContent);
    newWindow?.print();
    newWindow?.close();
  }
}
