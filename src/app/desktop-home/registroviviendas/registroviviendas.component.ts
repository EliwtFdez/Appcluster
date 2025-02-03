import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SlidebardComponent } from '../../slidebard/slidebard.component';

@Component({
  selector: 'app-registroviviendas',
  imports: [CommonModule, SlidebardComponent, RouterModule, MatIconModule,],
  templateUrl: './registroviviendas.component.html',
  styleUrl: './registroviviendas.component.scss'
})
export class RegistroviviendasComponent {

}
