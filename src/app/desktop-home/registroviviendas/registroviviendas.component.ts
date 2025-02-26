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
  // Arreglo para almacenar las viviendas
  viviendas: any[] = [];
  // Formulario para registrar viviendas
  viviendaForm: FormGroup;
  // URL base de la API
  private baseApiUrl = 'http://localhost:5112/api/Casas';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) 
  {
   // Configuración del formulario
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

  // Agregar residente al formulario
  agregarResidente() {
    this.residentes.push(this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    }));
  }

  // Eliminar residente mediante el API
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

  // Eliminar vivienda usando el idCasa que se conserva en el objeto (aunque solo se muestra el NumeroCasa)
  eliminarVivienda(vivienda: any) {
    if (confirm('¿Estás seguro de que deseas eliminar esta vivienda?')) {
      // Se utiliza la propiedad idCasa para construir la URL
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

  // Agregar cuota al formulario
  agregarCuota() {
    this.cuotas.push(this.fb.group({
      monto: ['', [Validators.required, Validators.min(0)]],
      fecha: ['', Validators.required]
    }));
  }

  // Eliminar cuota
  eliminarCuota(index: number) {
    this.cuotas.removeAt(index);
  }

  // Cargar viviendas desde la API
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

  // Enviar formulario para registrar vivienda
  onSubmit() {
    if (this.viviendaForm.valid) {
      this.http.post(this.baseApiUrl, this.viviendaForm.value).subscribe({
        next: (response) => {
          console.log('Vivienda registrada:', response);
          this.cargarViviendas();
          this.viviendaForm.reset();
console.log(this.viviendas)
        },
        error: (error) => {
          console.error('Error al registrar la vivienda:', error);
        }
      });
    }
  }

  // Método para editar una vivienda (implementación a tu criterio)
  editarVivienda(vivienda: any) {
    console.log('Editing house:', vivienda);
  }
}
