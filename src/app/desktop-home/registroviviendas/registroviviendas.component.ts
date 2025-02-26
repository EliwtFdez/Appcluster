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
  private baseApiUrl = 'http://localhost:5112/api/Casas';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.viviendaForm = this.fb.group({
      // idCasa: ['', Validators.required],
      numeroCasa: ['', [Validators.required, Validators.maxLength(10)]],
      direccion: ['', [Validators.maxLength(200)]],
      residentes: this.fb.array([]),
      cuotas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cargarViviendas();
  }

  get residentes() {
    return this.viviendaForm.get('residentes') as FormArray;
  }

  get cuotas() {
    return this.viviendaForm.get('cuotas') as FormArray;
  }

  agregarResidente() {
    this.residentes.push(this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    }));
  }

  eliminarResidente(index: number) {
    this.residentes.removeAt(index);
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
    this.http.get<any[]>(this.baseApiUrl).subscribe(
      (data) => {
        this.viviendas = data;
        console.log('Viviendas cargadas:', this.viviendas);
      },
      (error) => {
        console.error('Error al cargar las viviendas:', error);
      }
    );
  }

  onSubmit() {
    if (this.viviendaForm.valid) {
      this.http.post(this.baseApiUrl, this.viviendaForm.value).subscribe(
        (response) => {
          console.log('Vivienda registrada:', response);
          this.cargarViviendas();
        },
        (error) => {
          console.error('Error al registrar la vivienda:', error);
        }
      );
    }
  }
}
