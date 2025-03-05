import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InformacionService } from '../../../services/informacion.service';

@Component({
  selector: 'app-Informacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './Informacion.component.html',
  styleUrls: ['./Informacion.component.css']
})

export class InformacionComponent implements OnInit {

  totalCasas: number = 0;
  totalDeuda: number = 0;
  totalPagado: number = 0;
  totalResidentes: number = 0;

  constructor(private informacionService: InformacionService) {}

  ngOnInit(): void {
    this.cargarInformacion();
  }

  async cargarInformacion(): Promise<void> {
    this.informacionService.getTotalCasas().subscribe(data => this.totalCasas = data);
    this.informacionService.getTotalDeuda().subscribe(data => this.totalDeuda = data);
    this.informacionService.getTotalPago().subscribe(data => this.totalPagado = data);
    this.informacionService.getTotalResidente().subscribe(data => this.totalResidentes = data);
  }
}
