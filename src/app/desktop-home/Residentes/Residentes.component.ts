import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-Residentes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './Residentes.component.html',
  styleUrls: ['./Residentes.component.scss']
})
export class ResidentesComponent implements OnInit {

  currentView: 'lista' | 'formulario' = 'lista';
  residentes: any[] = [];
  casas: any[] = []; // Array para almacenar las casas
  residenteForm: FormGroup;
  private baseApiUrl = 'http://localhost:5112/api/Residentes';
  private casasApiUrl = 'http://localhost:5112/api/Casas'; // URL para obtener las casas

  // Track the ID of the resident being edited
  editingResidenteId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.residenteForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Aquí se guarda el idCasa pero el usuario solo verá el nombre en el select
      idCasa: ['', Validators.required]
    });
  }

  toggleView(view: 'lista' | 'formulario') {
    this.currentView = view;
  }

  ngOnInit() {
    this.cargarResidentes();
    this.cargarCasas(); // Cargar la lista de casas para el select
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

  // Método para cargar las casas desde la API
  cargarCasas() {
    this.http.get<any[]>(this.casasApiUrl).subscribe({
      next: (data) => {
        this.casas = data;
        console.log('Casas cargadas:', this.casas);
      },
      error: (error) => {
        console.error('Error al cargar las casas:', error);
      }
    });
  }

  getNumeroCasaPorId(idCasa: number): string {
    const casaEncontrada = this.casas.find(c => c.idCasa === idCasa);
    return casaEncontrada ? casaEncontrada.numeroCasa : 'N/A';
  }


  // Enviar formulario para registrar o actualizar un residente
  onSubmit() {
    if (this.residenteForm.valid) {
      const formData = this.residenteForm.value;
      if (this.editingResidenteId !== null) {
        const payload = { idResidente: this.editingResidenteId, ...formData };
        this.http.put(`${this.baseApiUrl}/${this.editingResidenteId}`, payload).subscribe({
          next: (response) => {
            console.log('Residente actualizado:', response);
            this.cargarResidentes();
            this.residenteForm.reset();
            this.editingResidenteId = null;
            this.toggleView('lista');
          },
          error: (error) => {
            console.error('Error al actualizar el residente:', error);
          }
        });
      } else {
        this.http.post(this.baseApiUrl, formData).subscribe({
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
  }

  // Método para editar un residente: pobla el formulario y cambia a la vista de formulario
  editarResidente(residente: any) {
    console.log('Editing resident:', residente);
    this.residenteForm.patchValue({
      nombre: residente.nombre,
      telefono: residente.telefono,
      email: residente.email,
      idCasa: residente.idCasa // Se asigna el idCasa existente
    });
    this.editingResidenteId = residente.idResidente || residente.id;
    this.toggleView('formulario');
  }

  // Eliminar residente mediante la API
  eliminarResidente(residente: any) {
    const id = residente.idResidente || residente.id;
    if (confirm('¿Estás seguro de que deseas eliminar este residente?')) {
      this.http.delete(`${this.baseApiUrl}/${id}`).subscribe({
        next: () => {
          console.log('Residente eliminado:', id);
          this.cargarResidentes();
        },
        error: (error) => {
          console.error('Error al eliminar el residente:', error);
        }
      });
    }
  }
}
