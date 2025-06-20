import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginservice';
import { AuthService } from 'src/app/auth/login/authservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string = '';
  showTakeoffPlane = false;

  clouds = Array.from({ length: 12 }, () => ({
    top: Math.random() * 70 + 10,     // between 10% and 80%
    left: Math.random() * 100,        // start randomly
    duration: Math.random() * 40 + 40 // 40s to 80s
  }));

  flyingPlanes = Array.from({ length: 1 }, () => ({
    top: Math.random() * 90,
    left: Math.random() * 90,
    duration: 20 + Math.random() * 20,
  }));

  isShowButtons: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const role = this.authService.getRole();
    if (role) {
      this.redirectToRole(role);
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.loginService.login(username, password).subscribe(
      (res: any) => {
        if (res.token) {
          // Save JWT token and user info
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('username', res.username);
          localStorage.setItem('user_id', res.user_id.toString());

          this.authService.login();

          this.showTakeoffPlane = true;

          setTimeout(() => {
            this.redirectToRole(res.role);
          }, 2500); // Wait for plane animation
        } else {
          this.message = 'Invalid login response.';
        }
      },
      (err) => {
        this.message = 'Login failed: ' + (err.error?.message || 'Incorrect username or password');
      }
    );
  }

  redirectToRole(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
    } else {
      this.router.navigate(['/flight-search'], { replaceUrl: true });
    }
  }
}
