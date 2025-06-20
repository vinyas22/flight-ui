import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module'; // ✅ Import this
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DefaultRedirectComponent } from './default-redirect/default-redirect.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PastBookingsComponent } from './past-bookings/past-bookings.component';
import { BookNowComponent } from './book-now/book-now.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DefaultRedirectComponent,
    FlightSearchComponent,
    PastBookingsComponent,
    BookNowComponent,
    ResetPasswordComponent,
    PasswordResetRequestComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
