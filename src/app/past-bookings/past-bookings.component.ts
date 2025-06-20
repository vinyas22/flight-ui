import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Define the BookingDetails model
interface BookingDetails {
  userId: number;
  flightId: number;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  passengerId: number;
  passengerName: string;
  age: number;
  gender: string;
  passportNumber: string;
  seatNumber: string;
  bookingDate: string;
}

@Component({
  selector: 'app-past-bookings',
  templateUrl: './past-bookings.component.html',
  styleUrls: ['./past-bookings.component.css']
})
export class PastBookingsComponent implements OnInit {
  bookings: BookingDetails[] = [];
  error: string = '';
  hovered: BookingDetails | null = null; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    console.log('User ID from localStorage:', userId);

    if (!userId) {
      this.error = 'User not logged in.';
      return;
    }

    this.http.get<BookingDetails[]>(`http://flight-api-4urq.onrender.com/api/flights/past/${userId}`).subscribe(
      data => this.bookings = data,
      err => {
        this.error = 'Failed to fetch bookings.';
        console.error('Booking fetch error:', err);
      }
    );
  }
}