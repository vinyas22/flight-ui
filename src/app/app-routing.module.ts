import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './register/register.component';  // import RegisterComponent
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/login/auth.guard';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PastBookingsComponent } from './past-bookings/past-bookings.component';
import { BookNowComponent } from './book-now/book-now.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'flight-search', component: FlightSearchComponent, canActivate: [AuthGuard] },
  { path: 'book-now', component: BookNowComponent, canActivate: [AuthGuard] },
  { path: 'past-bookings', component: PastBookingsComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'password-reset-request', component: PasswordResetRequestComponent },
    { path: 'register', component: RegisterComponent },  // <-- Register route added

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
