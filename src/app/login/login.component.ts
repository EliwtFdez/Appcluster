import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true, // Indica que este es un componente standalone
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrección aquí
})
export class LoginComponent {

  showRegister: boolean = false;

  toggleForm() {
    this.showRegister = !this.showRegister;
  }

}
