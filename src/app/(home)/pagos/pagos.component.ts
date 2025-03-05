import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent {

 modoOscuro: boolean = false;
  notificaciones: boolean = true;
  idiomaSeleccionado: string = 'Español';
  idiomas: string[] = ['Español', 'Inglés', 'Francés', 'Alemán'];
  
  // Datos de usuario
  nombreUsuario: string = '';
  correo: string = '';
  password: string = '';
  fotoPerfil: string | null = null;

  constructor() {
    this.cargarConfiguracion();
  }

  //  Cargar configuración desde memoria local
  cargarConfiguracion() {
    const config = JSON.parse(localStorage.getItem('configuracion') || '{}');
    this.modoOscuro = config.modoOscuro ?? false;
    this.notificaciones = config.notificaciones ?? true;
    this.idiomaSeleccionado = config.idiomaSeleccionado ?? 'Español';
    this.nombreUsuario = config.nombreUsuario ?? '';
    this.correo = config.correo ?? '';
    this.password = config.password ?? '';
    this.fotoPerfil = config.fotoPerfil ?? null;
  }

  guardarConfiguracion() {
    const configuracion = {
      modoOscuro: this.modoOscuro,
      notificaciones: this.notificaciones,
      idiomaSeleccionado: this.idiomaSeleccionado,
      nombreUsuario: this.nombreUsuario,
      correo: this.correo,
      password: this.password,
      fotoPerfil: this.fotoPerfil
    };
    localStorage.setItem('configuracion', JSON.stringify(configuracion));
  }

  //  Cambiar foto de perfil
  cambiarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPerfil = reader.result as string;
        this.guardarConfiguracion();
      };
      reader.readAsDataURL(file);
    }
  }

  resetearConfiguracion() {
    localStorage.removeItem('configuracion');
    window.location.reload();
  }
}
