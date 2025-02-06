import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RegistroviviendasComponent } from './desktop-home/registroviviendas/registroviviendas.component';
import { ViviendaService } from '../services/registrovivienda.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, RouterOutlet],
  providers: [ViviendaService], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-app-cluster';
}