import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-slidebard',
  standalone: true,
  providers: [],
  imports: [CommonModule, MatIconModule, RouterModule, MatDividerModule, MatListModule],
  templateUrl: './slidebard.component.html',
  styleUrl: './slidebard.component.scss',
})
export class SlidebardComponent {

  isCollapsed = false;
  @Output() toggle = new EventEmitter<boolean>();
  constructor() {}
  urlbase = '/home';


  // Función para alternar el estado del sidebar
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
    console.log('Sidebar toggled');
  }

  // Lista de ítems del menús
  menuItems = [
    { icon: 'home',      label: 'Casas',   route: `${this.urlbase}/registroviviendas` },
    { icon: 'people',    label: 'Residentes',   route: `${this.urlbase}/gestionrecidencia` },
    { icon: 'payment',   label: 'Facturas',     route: `${this.urlbase}/pagofactura` },
    { icon: 'attach_money',    label: 'Pagos', route: `${this.urlbase}/Pagos` },
    { icon: 'security',  label: 'Informacion',       route: `${this.urlbase}/informacion` },
    { icon: 'build',     label: 'Mantenimiento',           route: `${this.urlbase}/mantenimiento` },
    { icon: 'message',   label: 'Comunicación',            route: `${this.urlbase}/comunicacion` },
  ];

  lastMenuItems = [
    { icon: 'exit_to_app', label: 'Cerrar sesión', route: '/login' },
  ];


}
