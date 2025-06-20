import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string | null = null;
  message = '';
  isSubmitting = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.message = 'Invalid or missing reset token.';
    }
  }

  // Validator to check if newPassword and confirmPassword match
  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  };

 onSubmit(): void {
  this.message = '';
  if (!this.token) {
    this.message = 'Invalid or missing reset token.';
    return;
  }

  if (this.resetForm.invalid) {
    this.message = 'Please fix the errors before submitting.';
    return;
  }

  this.isSubmitting = true;

  const newPassword = this.resetForm.value.newPassword;

  this.http.post<{ success: boolean, message: string }>('http://flight-api-4urq.onrender.com/auth/reset-password', {
    token: this.token,
    newPassword
  }).subscribe({
    next: (res) => {
      this.message = res.success ? '✅ ' + res.message : '❌ ' + res.message;
      this.isSubmitting = false;
      if (res.success) {
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    },
    error: (err) => {
      this.message = '❌ ' + (err.error?.message || 'Reset failed');
      this.isSubmitting = false;
    }
  });
}
}
