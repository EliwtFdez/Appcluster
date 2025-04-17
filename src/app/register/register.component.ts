import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  rol: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  error: string = '';
  houseNumbers: number[] = Array.from({ length: 60 }, (_, i) => i + 1);
  houseNumber: any;

  constructor(
    private router: Router, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async handleRegister(): Promise<void> {
    try {
      this.error = '';

      if (!this.email || !this.username || !this.rol || !this.password || !this.confirmPassword) {
        this.error = 'Por favor completa todos los campos';
        return;
      }

      if (!this.isEmailValid(this.email)) {
        this.error = 'Por favor ingresa un email válido';
        return;
      }

      if (this.password.length < 6) {
        this.error = 'La contraseña debe tener al menos 6 caracteres';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.error = 'Las contraseñas no coinciden';
        return;
      }

      const confirm = window.confirm(`¿Estás seguro de que quieres registrarte como ${this.rol}?`);
      
      if (confirm) {
        this.isLoading = true;
        
        const userData = {
          email: this.email,
          username: this.username,
          role: this.rol,
          password: this.password
        };

        
        this.snackBar.open('¡Registro exitoso!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/login']);
      }
    } catch (err) {
      this.error = 'Ocurrió un error durante el registro';
      console.error('Registration error:', err);
    } finally {
      this.isLoading = false;
    }
  }

  navigateToLogin(): void {
    if (!this.isLoading) {
      this.router.navigate(['/login']);
    }
  }
}