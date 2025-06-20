import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent {
  resetRequestForm: FormGroup;
  message = '';
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.resetRequestForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

 onSubmit(): void {
  this.message = '';
  this.error = '';

  if (this.resetRequestForm.invalid) {
    this.error = 'Please enter your username or email.';
    return;
  }

  this.loading = true;
  const username = this.resetRequestForm.value.username;

  this.http.post<{ success: boolean, message: string }>(
    'http://flight-api-4urq.onrender.com/auth/request-password-reset',
    { username }
  ).subscribe({
    next: (res) => {
      this.message = res.success
        ? '✅ ' + res.message
        : '❌ ' + res.message;
      this.loading = false;
      if (res.success) {
        this.resetRequestForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500); // 1.5s delay for user feedback
      }
    },
    error: (err) => {
      this.error = '❌ ' + (err.error?.message || 'Error occurred while requesting password reset.');
      this.loading = false;
    }
  });
}

}
