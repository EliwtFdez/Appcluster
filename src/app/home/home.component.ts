import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SlidebardComponent } from '../slidebard/slidebard.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistroviviendasComponent } from '../desktop-home/registroviviendas/registroviviendas.component';
import { ViviendaService } from '../../services/registrovivienda.service';
import { ComunicacionComponent } from '../desktop-home/comunicacion/comunicacion.component';
import { GestionrecidenciaComponent } from '../desktop-home/gestionrecidencia/gestionrecidencia.component';
import { ControlaccesoComponent } from '../desktop-home/controlacceso/controlacceso.component';
import { MantenimientoComponent } from '../desktop-home/mantenimiento/mantenimiento.component';
import { PagofacturaComponent } from '../desktop-home/pagofactura/pagofactura.component';
import { ConfiguracionComponent } from '../desktop-home/configuracion/configuracion.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, 
            SlidebardComponent, 
            RouterModule,
            MatIconModule, 
            ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isSidebarCollapsed = false;

  onSidebarToggle(event: any): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


}
