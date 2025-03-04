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
  casasSinDueno: number = 0;
  saldoTotalPagado: number = 0;
  saldoAdeudo: number = 0;

  constructor(private informacionService: InformacionService) {}

  ngOnInit(): void {
    this.cargarInformacion();
  }

  async cargarInformacion(): Promise<void> {
    this.informacionService.getTotalCasas().subscribe(data => this.totalCasas = data);
    this.informacionService.getCasasSinDueno().subscribe(data => this.casasSinDueno = data);
    this.informacionService.getSaldoTotalPagado().subscribe(data => this.saldoTotalPagado = data);
    this.informacionService.getSaldoAdeudo().subscribe(data => this.saldoAdeudo = data);
  }
}
