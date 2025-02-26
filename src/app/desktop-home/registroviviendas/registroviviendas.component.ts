import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';           
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registroviviendas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registroviviendas.component.html',
  styleUrls: ['./registroviviendas.component.scss']
})

export class RegistroviviendasComponent implements OnInit {
  viviendas: any[] = [];
  viviendaForm: FormGroup;
  // Variables para manejar la edición
  isEdit: boolean = false;
  editingCasaId: number | null = null;
  private baseApiUrl = 'http://localhost:5112/api/Casas';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.viviendaForm = this.fb.group({
      numeroCasa: ['', [Validators.required, Validators.maxLength(10)]],
      direccion: ['', [Validators.maxLength(200)]],
      residentes: this.fb.array([]),
      cuotas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cargarViviendas();
  }

  get residentes() { return this.viviendaForm.get('residentes') as FormArray; }
  get cuotas() { return this.viviendaForm.get('cuotas') as FormArray; }

  agregarResidente() {
    this.residentes.push(this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    }));
  }

  eliminarResidente(idCasa: number, IdResidente: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este residente?')) {
      this.http.delete(`${this.baseApiUrl}/${idCasa}/residentes/${IdResidente}`).subscribe({
        next: () => {
          console.log('Residente eliminado correctamente');
          this.cargarViviendas();
        },
        error: (error) => {
          console.error('Error al eliminar el residente:', error);
        }
      });
    }
  }

  eliminarVivienda(vivienda: any) {
    if (confirm('¿Estás seguro de que deseas eliminar esta vivienda?')) {
      const idCasa = vivienda.idCasa;
      if (idCasa) {
        this.http.delete(`${this.baseApiUrl}/${idCasa}`).subscribe({
          next: () => {
            console.log('Vivienda eliminada:', idCasa);
            this.cargarViviendas();
          },
          error: (error) => {
            console.error('Error al eliminar la vivienda:', error);
          }
        });
      } else {
        console.error('La vivienda no contiene un idCasa válido');
      }
    }
  }

  agregarCuota() {
    this.cuotas.push(this.fb.group({
      monto: ['', [Validators.required, Validators.min(0)]],
      fecha: ['', Validators.required]
    }));
  }

  eliminarCuota(index: number) {
    this.cuotas.removeAt(index);
  }

  cargarViviendas() {
    this.http.get<any[]>(this.baseApiUrl).subscribe({
      next: (data) => {
        this.viviendas = data;
        console.log('Casas cargadas:', this.viviendas);
      },
      error: (error) => {
        console.error('Error al cargar las viviendas:', error);
      }
    });
  }

  // Método para cargar los datos de la casa en el formulario y habilitar el modo edición
  editarVivienda(vivienda: any) {
    this.isEdit = true;
    this.editingCasaId = vivienda.idCasa;

    // Rellenar el formulario con los datos de la casa
    this.viviendaForm.patchValue({
      numeroCasa: vivienda.numeroCasa,
      direccion: vivienda.direccion
    });

    // Limpiar y llenar el FormArray de residentes
    this.residentes.clear();
    if (vivienda.residentes) {
      vivienda.residentes.forEach((residente: any) => {
        this.residentes.push(this.fb.group({
          nombre: [residente.nombre, Validators.required],
          apellido: [residente.apellido, Validators.required]
        }));
      });
    }

    // Limpiar y llenar el FormArray de cuotas
    this.cuotas.clear();
    if (vivienda.cuotas) {
      vivienda.cuotas.forEach((cuota: any) => {
        this.cuotas.push(this.fb.group({
          monto: [cuota.monto, [Validators.required, Validators.min(0)]],
          fecha: [cuota.fecha, Validators.required]
        }));
      });
    }
  }

  // Enviar el formulario: si está en modo edición, actualizar; de lo contrario, crear
  onSubmit() {
    if (this.viviendaForm.valid) {
      if (this.isEdit && this.editingCasaId) {
        this.http.put(`${this.baseApiUrl}/${this.editingCasaId}`, this.viviendaForm.value).subscribe({
          next: (response) => {
            console.log('Vivienda actualizada:', response);
            this.cargarViviendas();
            this.viviendaForm.reset();
            // Reiniciar modo edición
            this.isEdit = false;
            this.editingCasaId = null;
          },
          error: (error) => {
            console.error('Error al actualizar la vivienda:', error);
          }
        });
      } else {
        this.http.post(this.baseApiUrl, this.viviendaForm.value).subscribe({
          next: (response) => {
            console.log('Vivienda registrada:', response);
            this.cargarViviendas();
            this.viviendaForm.reset();
          },
          error: (error) => {
            console.error('Error al registrar la vivienda:', error);
          }
        });
      }
    }
  }
  
  // Puedes mantener este método para depuración o ampliarlo según tus necesidades
  // editarVivienda(vivienda: any) ya está implementado arriba
}
