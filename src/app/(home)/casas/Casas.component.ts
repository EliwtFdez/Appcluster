import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CasasService } from '../../../services/Casas.service';

@Component({
  selector: 'app-Casas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './Casas.component.html',
  styleUrls: ['./Casas.component.scss']
})
export class CasasComponent implements OnInit {
  viviendas: any[] = [];
  viviendaForm: FormGroup;
  isEdit: boolean = false;
  editingCasaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private casasService: CasasService
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

  eliminarResidente(idCasa: number, idResidente: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este residente?')) {
      this.casasService.eliminarResidente(idCasa, idResidente).subscribe({
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
        this.casasService.eliminarVivienda(idCasa).subscribe({
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
    this.casasService.obtenerViviendas().subscribe({
      next: (data) => {
        this.viviendas = data;
        console.log('Casas cargadas:', this.viviendas);
      },
      error: (error) => {
        console.error('Error al cargar las viviendas:', error);
      }
    });
  }

  editarVivienda(vivienda: any) {
    this.isEdit = true;
    this.editingCasaId = vivienda.idCasa;

    this.viviendaForm.patchValue({
      numeroCasa: vivienda.numeroCasa,
      direccion: vivienda.direccion
    });

    this.residentes.clear();
    if (vivienda.residentes) {
      vivienda.residentes.forEach((residente: any) => {
        this.residentes.push(this.fb.group({
          nombre: [residente.nombre, Validators.required],
          apellido: [residente.apellido, Validators.required]
        }));
      });
    }

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

  onSubmit() {
    if (this.viviendaForm.valid) {
      if (this.isEdit && this.editingCasaId) {
        this.casasService.actualizarVivienda(this.editingCasaId, this.viviendaForm.value).subscribe({
          next: () => {
            console.log('Vivienda actualizada');
            this.cargarViviendas();
            this.viviendaForm.reset();
            this.isEdit = false;
            this.editingCasaId = null;
          },
          error: (error) => {
            console.error('Error al actualizar la vivienda:', error);
          }
        });
      } else {
        this.casasService.registrarVivienda(this.viviendaForm.value).subscribe({
          next: () => {
            console.log('Vivienda registrada');
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
}
