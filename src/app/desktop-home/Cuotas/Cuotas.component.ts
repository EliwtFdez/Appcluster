import { Component, OnInit } from '@angular/core';
import { Cuota, CuotasService } from '../../../services/cuota.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-mantenimiento',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})

export class CuotaComponent implements OnInit {
  cuotas: Cuota[] = [];
  // Objeto para el formulario de agregar cuota
  nuevaCuota: Cuota = {
    nombreCuota: '',
    monto: 0,
    fechaVencimiento: new Date(),
    descripcion: '',
    estado: 'pendiente',
    idCasa: 0,
    idResidente: 0
  };

  constructor(private cuotasService: CuotasService) { }

  ngOnInit(): void {
    this.cargarCuotas();
  }

  // Método para cargar todas las cuotas
  cargarCuotas(): void {
    this.cuotasService.getCuotas().subscribe(
      data => this.cuotas = data,
      error => console.error('Error al cargar cuotas', error)
    );
  }

  // Agregar una nueva cuota
  agregarCuota(): void {
    this.cuotasService.addCuota(this.nuevaCuota).subscribe(
      () => {
        this.cargarCuotas();
        // Reiniciar el formulario (opcional)
        this.nuevaCuota = {
          nombreCuota: '',
          monto: 0,
          fechaVencimiento: new Date(),
          descripcion: '',
          estado: 'pendiente',
          idCasa: 0,
          idResidente: 0
        };
      },
      error => console.error('Error al agregar cuota', error)
    );
  }

  // Método para editar una cuota (puede abrir un modal o transformar la fila en modo edición)
  editarCuota(cuota: Cuota): void {
    // Implementa la lógica para editar. Por ejemplo, abrir un formulario prellenado.
    // Luego, llamar a updateCuota, asegurándote de pasar el identificador correspondiente.
    this.cuotasService.updateCuota(cuota.idResidente, cuota).subscribe(
      () => this.cargarCuotas(),
      error => console.error('Error al actualizar cuota', error)
    );
  }

  // Eliminar una cuota
  eliminarCuota(cuota: Cuota): void {
    // Asegúrate de identificar correctamente la cuota a eliminar.
    this.cuotasService.deleteCuota(cuota.idResidente).subscribe(
      () => this.cargarCuotas(),
      error => console.error('Error al eliminar cuota', error)
    );
  }

  // Función trackBy para optimizar la renderización
  trackById(index: number, cuota: Cuota): number {
    // Si la cuota tiene un campo id, se debería retornar ese valor.
    // En este ejemplo, usamos idResidente como identificador, pero ajusta según tu modelo.
    return cuota.idResidente;
  }
}
