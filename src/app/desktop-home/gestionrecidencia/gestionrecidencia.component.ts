import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gestionrecidencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './gestionrecidencia.component.html',
  styleUrls: ['./gestionrecidencia.component.scss']
})
export class RegistroResidentesComponent implements OnInit {

  currentView: 'lista' | 'formulario' = 'lista';
  // Arreglo para almacenar los residentes
  residentes: any[] = [];
  // Formulario para registrar un residente
  residenteForm: FormGroup;
  // URL base de la API para residentes
  private baseApiUrl = 'http://localhost:5112/api/Residentes';

  // Configuración del formulario, acorde a la estructura: Nombre, Teléfono, Email, IdCasa
  constructor( private fb: FormBuilder, private http: HttpClient  ) {
    this.residenteForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idCasa: ['', Validators.required]
    });
  }

  toggleView(view: 'lista' | 'formulario') {
    this.currentView = view;
  }

  ngOnInit() {
    this.cargarResidentes();
  }

  // Método para cargar los residentes desde la API
  cargarResidentes() {
    this.http.get<any[]>(this.baseApiUrl).subscribe({
      next: (data) => {
        this.residentes = data;
        console.log('Residentes cargados:', this.residentes);
      },
      error: (error) => {
        console.error('Error al cargar los residentes:', error);
      }
    });
  }

  // Enviar formulario para registrar un residente
  onSubmit() {
    if (this.residenteForm.valid) {
      this.http.post(this.baseApiUrl, this.residenteForm.value).subscribe({
        next: (response) => {
          console.log('Residente registrado:', response);
          this.cargarResidentes();
          this.residenteForm.reset();
        },
        error: (error) => {
          console.error('Error al registrar el residente:', error);
        }
      });
    }
  }

  // Método para editar un residente (implementación a tu criterio)
  editarResidente(residente: any) {
    console.log('Editing resident:', residente);
    // Ejemplo: Poblar el formulario con los datos del residente a editar
    this.residenteForm.patchValue({
      nombre: residente.nombre,
      telefono: residente.telefono,
      email: residente.email,
      idCasa: residente.idCasa
    });
  }

  // Eliminar residente mediante el API
  eliminarResidente(idResidente: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este residente?')) {
      this.http.delete(`${this.baseApiUrl}/${idResidente}`).subscribe({
        next: () => {
          console.log('Residente eliminado:', idResidente);
          this.cargarResidentes();
        },
        error: (error) => {
          console.error('Error al eliminar el residente:', error);
        }
      });
    }
  }
}
