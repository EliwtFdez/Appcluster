import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slidebard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
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