// flight.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private apiUrl = 'https://flight-api-4urq.onrender.com/api/flights/search'; // adjust if needed

  constructor(private http: HttpClient) {}

  searchFlights(origin: string, destination: string, date: string): Observable<any> {
    let params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('date', date);

    return this.http.get<any>(this.apiUrl, { params });
  }
}
