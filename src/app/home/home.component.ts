import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SlidebardComponent } from "../slidebard/slidebard.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatIconModule, SlidebardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isSidebarCollapsed = false;

  onSidebarToggle(event: any): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


}
