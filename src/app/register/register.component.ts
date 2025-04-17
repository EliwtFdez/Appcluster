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
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  error: string = '';
  houseNumbers: number[] = Array.from({ length: 60 }, (_, i) => i + 1);
  houseNumber: any;

constructor(private router: Router, private snackBar: MatSnackBar) {}


  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async handleRegister(): Promise<void> {
    try {
      this.error = '';

      if (!this.email || !this.username || !this.password || !this.confirmPassword) {
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

      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }

      this.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    } catch (err) {
      this.error = 'An error occurred during registration';
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
