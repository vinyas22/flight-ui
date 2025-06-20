import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/login/authservice';
import { ViewChild, ElementRef  } from '@angular/core';
import { DefaultRedirectComponent } from '../default-redirect/default-redirect.component';

interface Flight {
  flightId: number;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  availableSeats: number;
  price: number;
  arrivalTime: string;
  logoUrl?: string
}

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  origin = '';
  destination = '';
  date = '';
  flights: Flight[] = [];

  originSuggestions: string[] = [];
  destinationSuggestions: string[] = [];

   bigPlane = {
    top: 30, // percent from top, adjust as needed
    duration: 30 // seconds, adjust for speed
  };
  // flyingPlanes = Array.from({ length: 10 }, () => ({
  //   top: Math.random() * 100,
  //   left: -10,
  //   duration: Math.random() * 20 + 20
  // }));
// ...existing code...
clouds = Array.from({ length: 12 }, () => ({
  top: Math.random() * 70 + 10,     // between 10% and 80%
  left: Math.random() * 100,        // start randomly
  duration: Math.random() * 40 + 40 // 40s to 80s
}));
// ...existing code...
 // 40s to 80s 
  showTakeoffPlane = false;
  isShowButtons: boolean=false;
  @ViewChild(DefaultRedirectComponent) default: DefaultRedirectComponent | undefined;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.http.get<string[]>('https://flight-api-4urq.onrender.com/api/flights/origins')
      .subscribe(data => this.originSuggestions = data);
    this.http.get<string[]>('https://flight-api-4urq.onrender.com/api/flights/destinations')
      .subscribe(data => this.destinationSuggestions = data);
          this.isShowButtons=localStorage.getItem('isLoggedIn') === 'true';
this.test();
  }
  toEnableButton() {
    this.isShowButtons=localStorage.getItem('isLoggedIn') === 'true';
console.log('isShowButtons:', this.isShowButtons);


  }
test() {
  this.authService.triggerEnableButton(this.isShowButtons);
  console.log('Button enabled:', this.isShowButtons);

}
  searchFlights() {
    this.triggerTakeoff();

    const params = {
      origin: this.origin,
      destination: this.destination,
      date: this.date
    };

    this.http.get<any[]>('https://flight-api-4urq.onrender.com/api/flights/search', { params }).subscribe(
      (res: any[]) => {
        this.flights = res.map(flight => ({
          flightId: flight.id,
          airline: flight.airline,
          origin: flight.origin,
          destination: flight.destination,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          availableSeats: flight.availableSeats,
          price: flight.price
        }));
      },
      
      err => console.error('Flight search error:', err)
    );
  }

  bookFlight(flight: any) {
    if (!flight || !flight.flightId) {
      alert('Invalid flight selection.');
      return;
    }
    localStorage.setItem('flight_id', flight.flightId.toString());
    localStorage.setItem('flight_data', JSON.stringify(flight));
this.router.navigate(['/book-now']);  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  triggerTakeoff() {
    this.showTakeoffPlane = true;
    setTimeout(() => this.showTakeoffPlane = false, 2500);
  }


  calculateDuration(departure: string, arrival: string): string {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  const diffMs = arr.getTime() - dep.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m`;
}

}
