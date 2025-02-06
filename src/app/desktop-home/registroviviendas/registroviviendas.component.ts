import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';           // Needed for *ngIf
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViviendaService } from '../../../services/vivienda.service';
import { Vivienda } from '../../../models/vivienda.models'; // Ensure this path is correct

@Component({
  selector: 'app-registroviviendas',
  standalone: true,  // Mark as standalone if not declared in an NgModule
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registroviviendas.component.html',
  styleUrls: ['./registroviviendas.component.scss']
})
export class RegistroviviendasComponent implements OnInit {
ShowTablesRegisters() {
throw new Error('Method not implemented.');
}
  estadoVivienda: boolean = false;
  viviendaForm: FormGroup;
 
  constructor(private fb: FormBuilder, private viviendaService: ViviendaService) {
    this.viviendaForm = this.fb.group({
      clusterId: ['', Validators.required],
      numeroCasa: ['', Validators.required],
      direccion: ['', Validators.required],
      habitaciones: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });
  }

  onSubmit(): void {
    if (this.viviendaForm.valid) {
      const nuevaVivienda: Vivienda = this.viviendaForm.value;
      this.viviendaService.registrarVivienda(nuevaVivienda).subscribe(
        (response: Vivienda) => {
          console.log('Vivienda registrada:', response);
          alert('Vivienda registrada con éxito');
          this.viviendaForm.reset(); // Reset the form after successful submission
        },
        (error: any) => {
          console.error('Error al registrar la vivienda:', error);
          alert('Hubo un error al registrar la vivienda. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }

  ngOnInit() { 
    this.viviendaService.viviendaStatus$.subscribe((estado: boolean) => { 
      this.estadoVivienda = estado; 
    });
  }

  cambiarEstado() { 
    this.viviendaService.actualizarEstado(!this.estadoVivienda);
  }
}