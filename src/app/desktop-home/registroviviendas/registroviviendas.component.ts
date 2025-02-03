import { Component } from '@angular/core';
import { ViviendaService } from '../../services/registrovivienda.service';

@Component({
  selector: 'app-registroviviendas',
  imports: [],
  templateUrl: './registroviviendas.component.html',
  styleUrl: './registroviviendas.component.scss'
})
export class RegistroviviendasComponent {

  estadoVivienda: boolean = false;
  
  constructor(private viviendaService: ViviendaService) {}

  ngOnInit() {
    this.viviendaService.viviendaStatus$.subscribe((estado: boolean) => {
      this.estadoVivienda = estado;
    });
  }

  cambiarEstado() {
    this.viviendaService.actualizarEstado(!this.estadoVivienda);
  }

}
