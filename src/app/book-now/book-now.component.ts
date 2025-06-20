import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/login/authservice';

declare var bootstrap: any;
@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent implements OnInit {
  bookingForm: FormGroup;
  otpForm: FormGroup;
  otpSent = false;
showPlane = true;
planeKey = 0;

bigPlane = {
  top: Math.random() * 60 + 10, // between 10% and 70%
  duration: Math.random() * 10 + 25 // 25s to 35s
};
  bookingDataForOtpConfirm: any;
  userId : any;  // example, replace with actual logged in user
  flightId : any; // example, replace with actual selected flight
  showmodal: boolean=false;
  currentModal: any;
  clouds = Array.from({ length: 16 }, () => ({
    top: Math.random() * 70 + 10,     // between 10% and 80%
    left: Math.random() * 100,        // start randomly
    duration: Math.random() * 40 + 40 // 40s to 80s
  }));

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.bookingForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  passengers: this.fb.array([this.createPassengerFormGroup()])
});

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    // localStorage.setItem('flight_id', flight.flightId.toString());
    this.flightId=localStorage.getItem("flight_id"); console.log("flight id is"+this.flightId);
    this.userId=localStorage.getItem("user_id"); console.log("user id is"+ this.userId)
  }
isLoggedIn = false;

  ngOnInit(): void {  this.setupPlaneAnimation();
     this.isLoggedIn = this.authService.isLoggedIn();
}
setupPlaneAnimation() {
  setTimeout(() => {
    // Hide plane to reset animation
    this.showPlane = false;
    setTimeout(() => {
      // Randomize top and duration for next run
      this.bigPlane.top = Math.random() * 60 + 10;
      this.bigPlane.duration = Math.random() * 10 + 25;
      this.planeKey++; // Change key to force re-render
      this.showPlane = true;
      this.setupPlaneAnimation();
    }, 100); // Small delay to allow DOM to remove the element
  }, this.bigPlane.duration * 1000);
}
  createPassengerFormGroup() {
  return this.fb.group({
    fullName: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(1)]],
    gender: ['', Validators.required],
    passportNumber: ['', Validators.required],
    seatNumber: ['', Validators.required]
  });
}

  get passengers() {
    return this.bookingForm.get('passengers') as FormArray;
  }

  submitBooking() {
    if (this.bookingForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }
const modalElement = document.getElementById('loading');
  const modal = new bootstrap.Modal(modalElement);
  modal.show(); 
    this.currentModal = modal;

    this.bookingDataForOtpConfirm = {
      email: this.bookingForm.value.email,
      passengers: this.passengers.value.map((p: any) => ({
        ...p,
        userId: this.userId,
        flightId: this.flightId
      })),
      flightId: this.flightId
    };

    this.http.post(
  `http://flight-api-4urq.onrender.com/api/flights/payment/generate-otp`,
  { email: this.bookingDataForOtpConfirm.email },
  { responseType: 'text' } // 👈 This tells Angular to expect plain text
).subscribe({
  next: () => {
    this.otpSent = true;
if (this.currentModal) {
    this.currentModal.hide();
  }
    // alert('OTP sent to your email. Please check and enter it below.');
  },
  error: err => {
    console.error('Error sending OTP:', err);
    alert('Failed to send OTP. Try again later.');
  }
});

  }

  confirmPayment() {

   
    if (this.otpForm.invalid) {
      alert('Please enter a valid 6-digit OTP.');
      return;
    }

    const otp = this.otpForm.value.otp;

    const payload = {
      email: this.bookingDataForOtpConfirm.email,
      otp: otp,
      bookingRequest: this.bookingDataForOtpConfirm
    };

    this.http.post('http://flight-api-4urq.onrender.com/api/flights/payment/confirm', payload,{responseType: 'text'})
      .subscribe({
        next: () => {
          const modalElement = document.getElementById('deleteModalforCommonId');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
          // alert('Payment confirmed! Booking successful.');
          this.router.navigate(['/success']); // change to your success route
        },
        error: err => {
          console.error('OTP confirmation failed:', err);
          alert('Invalid or expired OTP. Please try again.');
        }
      });
  }

  addPassenger() {
  this.passengers.push(this.createPassengerFormGroup());
}
removePassenger(index: number) {
  this.passengers.removeAt(index);
}
}
