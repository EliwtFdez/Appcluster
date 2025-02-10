import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  error: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  // Helper function para validar emails
  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async handleLogin(): Promise<void> {
    try {
      this.error = '';

      // Validaciones básicas
      if (!this.email || !this.password) {
        this.error = 'Please fill in all fields';
        return;
      }

      if (!this.isEmailValid(this.email)) {
        this.error = 'Please enter a valid email address';
        return;
      }

      if (this.password.length < 6) {
        this.error = 'Password must be at least 6 characters long';
        return;
      }

      // Activar el estado de carga
      this.isLoading = true;

      // Simulación de "API call" con retraso de 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Email:', this.email);
      console.log('Password:', this.password);

      // Navegar a la pantalla Home después del login
      this.router.navigate(['/home']);
    } catch (err) {
      this.error = 'An error occurred during login';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  navigateToRegister(): void {
    if (!this.isLoading) {
      this.router.navigate(['/register']);
    }
  }
}