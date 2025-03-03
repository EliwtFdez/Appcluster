import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Control',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlComponent implements OnInit {
  casas: any[] = [];
  casasFiltradas: any[] = [];
  numeroBusqueda: string = '';
  private baseApiUrl = 'http://localhost:5112/api/Casas';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarCasas();
  }

  cargarCasas() {
    this.http.get<any[]>(this.baseApiUrl).subscribe({
      next: (data) => {
        this.casas = data;
        this.casasFiltradas = data;
        console.log('Casas cargadas:', this.casas);
      },
      error: (error) => {
        console.error('Error al cargar las casas:', error);
      }
    });
  }

  buscarCasa() {
    if (this.numeroBusqueda.trim() === '') {
      this.casasFiltradas = this.casas;
      return;
    }

    this.casasFiltradas = this.casas.filter(
      casa => casa.numeroCasa.toLowerCase() === this.numeroBusqueda.toLowerCase()
    );

    if (this.casasFiltradas.length === 0) {
      console.warn('No se encontraron casas con ese número.');
    }
  }

  limpiarBusqueda() {
    this.numeroBusqueda = '';
    this.casasFiltradas = this.casas;
  }

  imprimir() {
    window.print();
  }
}
