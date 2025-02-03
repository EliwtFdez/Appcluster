import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SlidebardComponent } from '../slidebard/slidebard.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistroviviendasComponent } from '../desktop-home/registroviviendas/registroviviendas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlidebardComponent, RouterModule, MatIconModule,
              RegistroviviendasComponent, 
           ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isSidebarCollapsed = false;

  onSidebarToggle(event: any): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


}
