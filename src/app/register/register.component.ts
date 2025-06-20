import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 onSubmit() {
  if (this.registerForm.invalid) {
    return;
  }

  this.errorMessage = '';
  this.successMessage = '';

  this.http.post<{ success: boolean, message: string }>(
    'http://flight-api-4urq.onrender.com/auth/register',
    this.registerForm.value
  ).subscribe({
    next: (res) => {
      if (res.success) {
        this.successMessage = res.message;
        alert(this.successMessage); // Optional
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = res.message;
        alert(this.errorMessage); // Optional
      }
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Registration failed due to server error.';
      alert(this.errorMessage); // Optional
      console.error('Registration error:', err);
    }
  });
}

}