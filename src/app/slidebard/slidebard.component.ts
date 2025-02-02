import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-slidebard',
  imports: [HomeComponent],
  templateUrl: './slidebard.component.html',
  styleUrl: './slidebard.component.scss'
})
export class SlidebardComponent {
  
  menuItems = [
    { icon: 'home', label: 'Registro de Viviendas' },
    { icon: 'people', label: 'Gestión de Residentes' },
    { icon: 'security', label: 'Control de Acceso' },
    { icon: 'build', label: 'Mantenimiento' },
    { icon: 'payment', label: 'Pagos y Facturación' },
    { icon: 'message', label: 'Comunicación' }
  ];

}
